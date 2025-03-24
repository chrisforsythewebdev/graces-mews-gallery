// data/newsData.js

const thumbnails = [
    require('../assets/images/news.png'),
    require('../assets/images/dick-homepage.jpeg'),
    require('../assets/images/harley.jpeg'),
  ];
  
  export const newsItems = Array.from({ length: 20 }, (_, index) => {
    const year = index < 5 ? 2025 : index < 12 ? 2024 : 2023;
  
    const randomThumb = thumbnails[Math.floor(Math.random() * thumbnails.length)];
  
    return {
      id: `news-${index + 1}`,
      number: String(index + 1).padStart(3, '0'),
      title: `Event Title ${index + 1} Event Title ${index + 1} Event Title ${index + 1} Event Title ${index + 1} Event Title ${index + 1}`,
      date: `${Math.ceil(Math.random() * 28)} Jan`,
      fullDate: `${Math.ceil(Math.random() * 28)} January ${year}`,
      year: year,
      thumbnail: randomThumb,
      gallery: thumbnails,
      video: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      description: `Description for event ${index + 1}.`,
      credit: '© Photo Credit Here',
    };
  });
  