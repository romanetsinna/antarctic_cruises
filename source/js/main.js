import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

// Map

const myOwnScriptElement = document.createElement('script');

if (myOwnScriptElement) {
  myOwnScriptElement.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU';
}

const mapElement = document.querySelector('#map');

if (mapElement) {
  mapElement.style.display = 'block';
}

let switcher = false;

window.addEventListener('scroll', activateMapOnScroll);

function initYandexMap() {
  let myMap = new ymaps.Map('map', {
    center: [59.938631, 30.323037],
    zoom: 16,
  });
  let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: 'Метка',
    balloonContent: 'г. Санкт Петербург, ул. Большая Конюшенная, 19/8',
  }, {
    iconLayout: 'default#image',
    iconImageHref: './img/svg/map-marker.svg',
    iconImageSize: [18, 22],
    iconImageOffset: [-9, -22],
  });
  myMap.geoObjects.add(myPlacemark);
}

const insertApiToHead = () => {
  document.head.appendChild(myOwnScriptElement);
};

const initMap = () => {
  ymaps.ready(initYandexMap);
};

function activateMapOnScroll() {
  if (mapElement && myOwnScriptElement) {
    if (mapElement.getBoundingClientRect().top - window.innerHeight < 2000 && !switcher) {
      switcher = true;
      insertApiToHead();
      myOwnScriptElement.addEventListener('load', () => {
        if (typeof ymaps !== 'undefined') {
          initMap();
        }
      });
      window.removeEventListener('scroll', activateMapOnScroll);
    }
  }
}

activateMapOnScroll();

// Бургерное меню

const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const mainLogo = document.querySelector('.logo__svg');
const bodyElement = document.body;
const menuItem = document.querySelectorAll('.main-nav__item');
const overlayMobileMenu = document.querySelector('.main-header__mobile-overlay');

if (navMain) {
  navMain.classList.remove('main-nav--nojs');
  navMain.classList.add('main-nav--closed');
  navMain.classList.add('main-nav--with-js');
}

const openMenu = () => {
  if (mainLogo && navMain && bodyElement) {
    mainLogo.style.fill = 'transparent';
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    bodyElement.style.overflow = 'hidden';
  }
};

const closeMenu = () => {
  if (mainLogo && navMain && bodyElement) {
    mainLogo.style.fill = '#f9fbfd';
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    bodyElement.style.overflow = 'unset';
  }
};

if (navToggle) {
  navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('main-nav--closed')) {
      openMenu();
    } else {
      closeMenu();
    }
  });
}

if (overlayMobileMenu) {
  overlayMobileMenu.addEventListener('click', () => {
    closeMenu();
  });
}

if (menuItem) {
  menuItem.forEach((el) => {
    el.addEventListener('click', () => {
      closeMenu();
    });
  });
}
