import { useState } from 'react';
import Nav from '../components/Navbar';
import dickImg from '../assets/images/dick-homepage.jpeg';

const images = [
  { id: 1, src: dickImg, title: 'Dick Jewell', link: '/exhibitions/dick-jewell' },
];

export default function Homepage() {

  // State for current index in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle navigating to previous item in carousel
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Function to handle navigating to next item in carousel
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src={images[currentIndex].src}
        className="h-full w-full object-cover"
        alt={images[currentIndex].title}
      />

      {/* Overlay Container */}
      <div className="absolute inset-0 flex flex-col justify-between">

        {/* Header + Mobile Nav */}
        <div className="flex flex-col items-center pt-8">
          <h1 className="text-5xl md:text-6xl font-bold">GRACES MEWS</h1>
          
          {/* Mobile Nav visible only on mobile */}
          <div className="md:hidden mt-4">
            <Nav />
          </div>
        </div>

        {/* Exhibition Link Box */}
        <a href={images[currentIndex].link}>
          <h2
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black flex items-center justify-center text-center"
            style={{
              width: '385px',
              height: '96px',
              fontSize: '32px',
              lineHeight: '48px',
              letterSpacing: '0.03em',
              fontWeight: 811,
              textTransform: 'capitalize',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}
          >
            Opening Exhibition:<br />{images[currentIndex].title}
          </h2>
        </a>

        {/* Desktop Nav at bottom visible only on desktop */}
        <div className="hidden md:flex justify-center pb-8">
          <Nav />
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl"
      >
        &larr;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl"
      >
        &rarr;
      </button>
    </div>
  );
}
