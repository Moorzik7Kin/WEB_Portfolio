const app = document.querySelector('.app');
const items = document.querySelectorAll('.menu li');
const screens = document.querySelectorAll('.screen');
const homeBtn = document.getElementById('home-btn');
const themeBtn = document.getElementById('theme-btn');
const root = document.documentElement;
const drawer = document.getElementById('drawer');
const drawerBtn = document.getElementById('drawer-btn');
const settings = document.querySelector('.settings');
const lang = document.querySelector('.lang');
const langCurrent = document.getElementById('lang-current');
const langCurrentImg = document.getElementById('lang-current-img');
const langOptions = document.querySelectorAll('.lang-menu .lang-btn');

const LANG_NAMES = { uk: 'Українська', en: 'English', ru: 'русский' };


// Як словник у Python: код мови -> файл прапора
const FLAGS = {
  uk: 'icons/lang_Ukraine.svg',
  en: 'icons/lang_English.svg',
  ru: 'icons/lang_rus.svg'
};

function applyTexts(code) {
  const dict = TEXTS[code];

  // Звичайні тексти
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.dataset.i18n;
    el.innerHTML = dict[key] || TEXTS.uk[key];
  });

  // Підказки при наведенні
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
    const key = el.dataset.i18nTitle;
    const text = dict[key] || TEXTS.uk[key];
    el.title = text;
    el.setAttribute('aria-label', text);
  });

  // Назва вкладки браузера
  document.title = dict.pageTitle || TEXTS.uk.pageTitle;
}

function setLang(code) {
  langCurrentImg.src = FLAGS[code];
  langCurrentImg.title = LANG_NAMES[code];
  document.documentElement.lang = code;
  localStorage.setItem('lang', code);
  applyTexts(code);  

  // У меню ховаємо ту мову, яка вже вибрана
  langOptions.forEach(function (btn) {
    btn.hidden = (btn.dataset.lang === code);
  });
}

langCurrent.addEventListener('click', function () {
  lang.classList.toggle('open');
});

langOptions.forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.dataset.lang === 'ru') {
      // ТВОЄ: прикол для російської (мову не перемикаємо)
      return;
    }
    setLang(btn.dataset.lang);
    lang.classList.remove('open');
  });
});

settings.addEventListener('mouseleave', function () {
  // ТВОЄ: закрити меню (прибрати клас "open" з lang)
  lang.classList.remove('open');
});

// При вході: збережена мова або українська
setLang(localStorage.getItem('lang') || 'uk');


function showScreen(id) {
  // Показати потрібний екран, сховати решту
  screens.forEach(function (screen) {
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');

  // Підсвітити відповідний пункт меню
  items.forEach(function (item) {
    item.classList.toggle('active', item.dataset.screen === id);
  });

  // Режим розділу: усе, крім "home"
  app.classList.toggle('in-section', id !== 'home');

  // Позначає який розділ зараз відкритий (для його палітри)
  root.dataset.section = id;

  // Згорнути шторку
  drawer.classList.remove('open');
}

items.forEach(function (item) {
  item.addEventListener('click', function () {
    showScreen(item.dataset.screen);
  });
});

homeBtn.addEventListener('click', function () {
  showScreen('home');
});

themeBtn.addEventListener('click', function () {
  if (root.dataset.theme === 'light') {
    root.dataset.theme = 'dark';
  } else {
    root.dataset.theme = 'light';
  }
  localStorage.setItem('theme', root.dataset.theme);
});

drawerBtn.addEventListener('click', function () {
  drawer.classList.toggle('open');
});
