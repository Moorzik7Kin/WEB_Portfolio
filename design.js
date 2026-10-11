// Вікно "Дизайн": малює презентації зі списку WORKS.design
const designList = WORKS.design;
const SLIDE_EXT = 'webp';

let workIndex = 0;                // яка презентація зараз (вгору/вниз)
let slideIndex = 0;               // який слайд зараз (вліво/вправо), з нуля

const dz = {
  title:   document.getElementById('dz-title'),
  main:    document.getElementById('dz-main-img'),
  prevImage: document.getElementById('dz-prev-img'),
  prevBox: document.querySelector('.dz-slide--prev'),
  next:    document.getElementById('dz-next-img'),
  nextBox: document.querySelector('.dz-slide--next'),
  desc:    document.getElementById('dz-desc'),
  date:    document.getElementById('dz-date'),
  links:   document.getElementById('dz-links'),
  map:     document.getElementById('dz-map'),
  prevButton: document.querySelector('.dz-arrow--prev'),
  forward: document.querySelector('.dz-arrow--next')
};

// Текст поточною мовою (запасний варіант: українська)
function t(field) {
  return field[document.documentElement.lang] || field.uk;
}

function slideSrc(work, n) {      // n починається з 1
  return 'works/Design/' + work.id + '/' + n + '.' + SLIDE_EXT;
}

function renderDesign() {
  const work = designList[workIndex];
  const total = work.slides;

  dz.title.textContent = t(work.title);
  dz.desc.textContent = t(work.desc);
  dz.date.textContent = work.date;

  // Картинки: попередній і наступний слайди виглядають збоку від головного
  dz.main.src = slideSrc(work, slideIndex + 1);
  dz.main.alt = t(work.title) + ' ' + (slideIndex + 1) + '/' + total;
  dz.prevBox.hidden = (slideIndex === 0);
  if (slideIndex > 0) {
    dz.prevImage.src = slideSrc(work, slideIndex);
    dz.prevImage.alt = t(work.title) + ' ' + slideIndex + '/' + total;
  }
  dz.nextBox.hidden = (slideIndex === total - 1);
  if (slideIndex < total - 1) {
    dz.next.src = slideSrc(work, slideIndex + 2);
    dz.next.alt = t(work.title) + ' ' + (slideIndex + 2) + '/' + total;
  }

  // Стрілки вимикаються на краях
  dz.prevButton.disabled = (slideIndex === 0);
  dz.forward.disabled = (slideIndex === total - 1);

  // Кнопки-посилання (без адреси кнопки не буде)
  dz.links.innerHTML = '';
  work.links.forEach(function (link) {
    if (!link.url) return;
    const a = document.createElement('a');
    a.className = 'dz-link dz-link--' + link.type;
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = (link.type === 'pdf') ? 'PDF' : 'C';
    dz.links.appendChild(a);
  });

  // Мапа: активний кружечок і підказка з назвою
  Array.from(dz.map.children).forEach(function (dot, i) {
    dot.classList.toggle('active', i === workIndex);
    dot.title = t(designList[i].title);
  });
}

function goSlide(step) {
  const total = designList[workIndex].slides;
  slideIndex = Math.min(Math.max(slideIndex + step, 0), total - 1);
  renderDesign();
}

function goWork(i) {
  // ТВОЄ: обмежити i межами від 0 до (кількість презентацій - 1), як у goSlide
  workIndex = i;
  slideIndex = 0;                 // нова презентація завжди з першого слайда
  renderDesign();
}

// Кружечків рівно стільки, скільки презентацій у списку
designList.forEach(function (work, i) {
  const dot = document.createElement('button');
  dot.className = 'dz-dot';
  dot.addEventListener('click', function () { goWork(i); });
  dz.map.appendChild(dot);
});

dz.prevButton.addEventListener('click', function () { goSlide(-1); });
dz.forward.addEventListener('click', function () { goSlide(1); });

// Колесо миші листає презентації, із паузою, щоб тачпад не пролітав усі за раз
let wheelLock = false;
document.getElementById('design').addEventListener('wheel', function (e) {
  if (wheelLock) return;
  wheelLock = true;
  setTimeout(function () { wheelLock = false; }, 500);
  goWork(workIndex + (e.deltaY > 0 ? 1 : -1));
});

renderDesign();
