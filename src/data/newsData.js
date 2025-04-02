const thumbnails = [
  require('../assets/images/news.png'),
  require('../assets/images/dick-homepage.jpeg'),
  require('../assets/images/harley.jpeg'),
  require('../assets/images/dick2.jpeg'),
  require('../assets/images/dick3.jpeg'),
  require('../assets/images/news.png'),
];

export const newsItems = Array.from({ length: 20 }, (_, index) => {
  const year = index < 5 ? 2025 : index < 12 ? 2024 : 2023;
  const thumb = thumbnails[Math.floor(Math.random() * thumbnails.length)];

  return {
    id: `news-${index + 1}`,
    number: String(index + 1).padStart(3, '0'),
    title: index === 0
      ? `'CUTS': New Updated 2nd Edition Book And Documentary Screening`
      : `Event Title ${index + 1} Event Title ${index + 1} Event Title`,
    date: `${Math.ceil(Math.random() * 28)} Jan`,
    fullDate: `${Math.ceil(Math.random() * 28)} January ${year}`,
    year: year,
    thumbnail: thumb,
    gallery: [thumb, ...thumbnails.slice(1, 3)],
    video: index === 0 ? 'https://www.youtube.com/embed/ktpmzRj4w30' : '',
    description:
      index === 0
        ? `Following the success of the first edition, which sold out within one month of its release, this second edition contains additional unseen images. It also coincides with the upcoming release of 'CUTS' — a documentary film by Sarah Lewis. All profits from sales of this edition will fund the film's completion.`
        : `Description for event ${index + 1}.`,
    credit: index === 0 ? 'Q&A with Documentary Director Sarah Lewis' : "",
    buyText: index === 0 ? `Buy 'CUTS' by Steve Brooks here.` : '© Photo Credit Here',

  };
});
