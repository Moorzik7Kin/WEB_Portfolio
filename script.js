const app = document.querySelector('.app');
const items = document.querySelectorAll('.menu li');
const screens = document.querySelectorAll('.screen');
const homeBtn = document.getElementById('home-btn');
const themeBtn = document.getElementById('theme-btn');
const root = document.documentElement;
const drawer = document.getElementById('drawer');
const drawerBtn = document.getElementById('drawer-btn');


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

