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

// Як словник у Python: код мови -> файл прапора
const FLAGS = {
  uk: 'icons/lang_Ukraine.svg',
  en: 'icons/lang_English.svg',
  ru: 'icons/lang_rus.svg'
};

function setLang(code) {
  langCurrentImg.src = FLAGS[code];
  document.documentElement.lang = code;
  localStorage.setItem('lang', code);

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
