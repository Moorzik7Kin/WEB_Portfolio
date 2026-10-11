// Дані робіт. Порядок у списку = порядок кружечків на мапі.
// Картинки лежать у works/Design/<id>/1.webp, 2.webp ... (slides = скільки їх усього).
const WORKS = {

// ----|||( Дизайн: Презентації )|||----
  tema: {
    design: {
      uk: 'Дизайн: Презентації',
      en: 'Design: Presentations'
            }
  },
  design: [
    {
      id: 'superconductivity',
      slides: 9,
      date: '27 вep. 2026',
      title: {
        uk: 'Використання та властивості надпровідності',
        en: 'Applications and Properties of Superconductivity'   // чернетка, перевір
      },
      desc: { uk: 'Тут колись буде текст', en: 'Text will go here' },                   // ТВОЄ: короткий переказ стилізації
      info: { uk: 'А тут колись буде детальна інформація', en: 'Detailed information will go here' },                   // ТВОЄ: для кнопки (i), підключимо пізніше
      links: [
        { type: 'canva', url: 'https://canva.link/eqwdbxaxz2yz3qf' },
        { type: 'pdf',   url: 'https://canva.link/oosyqgy5ubr12lu' }
      ]
    },

    {
      id: 'triboelectricity',
      slides: 8,
      date: '18 трав. 2026',
      title: { uk: 'Трибоелектрика', en: 'Triboelectricity' },
      desc: { uk: 'Тут колись буде текст', en: 'Text will go here' },
      info: { uk: 'А тут колись буде детальна інформація', en: 'Detailed information will go here' },
      links: [
        { type: 'canva', url: 'https://canva.link/25oq19bexbu88dv' },
        { type: 'pdf',   url: '' }
      ]
    },

    {
      id: 'networks',
      slides: 8,
      date: '20 вер. 2025',
      title: { uk: 'Мережа та Інтернет', en: 'Networks and the Internet' },
      desc: { uk: 'Тут колись буде текст', en: 'Text will go here' },
      info: { uk: 'А тут колись буде детальна інформація', en: 'Detailed information will go here' },
      links: [
        { type: 'canva', url: 'https://canva.link/6bhyttynoi440gy' },
        { type: 'pdf',   url: 'https://canva.link/ibr78zczxxdim5y' }
      ]
    }
  ]

};
