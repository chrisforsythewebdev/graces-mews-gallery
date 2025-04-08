import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Navbar';
import dickImg from '../assets/images/dick-homepage.jpeg';
import dickImg2 from '../assets/images/dick2.jpeg';
import dickImg3 from '../assets/images/dick3.jpeg';

const images = [
  { id: 1, src: dickImg, title: 'Dick Jewell' },
  { id: 2, src: dickImg2, title: 'Shop Launch' },
  { id: 3, src: dickImg3, title: 'Harley Weir' },
];

export default function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const hoverOffset =
    hovered === 'next' ? -0.05 :
    hovered === 'prev' ? 0.05 : 0;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Image container */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${hoverOffset * 100}%))`,
          }}
        >
          {images.map((img, i) => (
            <div
              key={img.id}
              className="w-screen h-screen flex-shrink-0"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col justify-between z-10">
        {/* Header + Mobile Nav */}
        <div className="flex flex-col items-center pt-8">
          <Header />
          <div className="md:hidden mt-4">
            <Nav />
          </div>
        </div>

        {/* Center Title */}
        <a href="/exhibitions">
          <h2
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-center"
            style={{
              width: '385px',
              height: '96px',
              fontSize: '32px',
              lineHeight: '48px',
              letterSpacing: '0.03em',
              fontWeight: 811,
              textTransform: 'capitalize',
            }}
          >
            Opening Exhibition:<br />
            {images[currentIndex].title}
          </h2>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center pb-8">
          <Nav />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        onMouseEnter={() => setHovered('prev')}
        onMouseLeave={() => setHovered(null)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-black z-20"
        aria-label="Previous"
      >
        &larr;
      </button>
      <button
        onClick={handleNext}
        onMouseEnter={() => setHovered('next')}
        onMouseLeave={() => setHovered(null)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-black z-20"
        aria-label="Next"
      >
        &rarr;
      </button>
    </div>
  );
}
