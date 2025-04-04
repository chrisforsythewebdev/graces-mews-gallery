import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jas from '../assets/images/jas-knight.jpeg';
import dick from '../assets/images/dick-homepage.jpeg';
import harley from '../assets/images/harley.jpeg';
import dick2 from '../assets/images/dick2.jpeg';
import dick3 from '../assets/images/dick3.jpeg';
import Layout from '../components/Layout';

const exhibitions = {
  current: [
    {
      date: '30 Jan – 6 Apr 2025',
      artist: 'Dick Jewell',
      title: 'SELECTED WORKS',
      location: 'London',
      images: [dick, dick2, dick3],
      description: `Mixed-media artist Dick Jewell has traversed art, fashion and music for five decades. His subject matter has spanned the infamous London nightclub Kinky Gerlinky’s fanatic clientele, to the Trans-Kalahari Desert Corridor between Namibia and Botswana, where he studied the trance music and dance of the last nomadic Khoisan tribe. His diverse body of work excavates popular culture and subcultures to question our personalities and human behaviours. Jewell’s process is enduring and solitary, he works through the night and into the early morning, searching for overlapping ideas amongst collections of found images.`,
    },
  ],
  upcoming: [
    {
      date: '30 Jan – 6 Apr 2025',
      artist: 'Jas Knight',
      title: 'TERRAIN',
      location: 'New York City',
      images: [jas],
    },
    {
      date: '30 Jan – 6 Apr 2025',
      artist: 'Harley Weir',
      title: 'SINS OF A DAUGHTER',
      location: 'London',
      images: [harley],
    },
  ],
  past: [
    { date: '30 Jan – 6 Apr 2025', artist: 'Sholto Blissett', title: 'THE PARTY' },
    { date: '30 Jan – 6 Apr 2025', artist: 'Natalia González Martín', title: 'RUPTURE' },
    { date: '30 Jan – 6 Apr 2025', artist: 'Shaun McDowell', title: 'INTERVALS' },
    { date: '30 Jan – 6 Apr 2025', artist: 'Norman Hyams', title: "DON'T YOU WORRY HONEY" },
    { date: '30 Jan – 6 Apr 2025', artist: 'George Rouy', title: "LOOKS LIKE YOU'VE REACHED THE END" },
    { date: '30 Jan – 6 Apr 2025', artist: 'Stevie Dix, Danny Fox', title: 'BLUE FEAR' },
  ],
};

export default function Exhibitions() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const ExhibitionRow = ({ item, index, section }) => {
    const isExpanded = expandedIndex === `${section}-${index}`;
    const carouselRef = useRef(null);
    const contentRef = useRef(null);
    const slug = item.artist.toLowerCase().replace(/\s+/g, '-');

    const [height, setHeight] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const contentEl = contentRef.current;
      if (!contentEl) return;

      const handleTransitionEnd = () => {
        if (!isExpanded) {
          setIsVisible(false);
        }
      };

      if (isExpanded) {
        setIsVisible(true);
        requestAnimationFrame(() => {
          setHeight(contentEl.scrollHeight);
        });
      } else if (!isExpanded && contentEl) {
        setHeight(contentEl.scrollHeight);
        requestAnimationFrame(() => {
          setHeight(0);
        });

        contentEl.addEventListener('transitionend', handleTransitionEnd, { once: true });
      }

      return () => {
        contentEl?.removeEventListener('transitionend', handleTransitionEnd);
      };
    }, [isExpanded]);

    return (
      <div
        key={index}
        className="border-b border-black cursor-pointer py-4"
        onClick={() => handleToggle(`${section}-${index}`)}
      >
        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_144px] gap-4 text-lg items-start">
          <p className="font-semibold">{item.date}</p>
          <p className="font-semibold">
            <Link to={`/artist/${slug}`} className="hover:underline">
              {item.artist}
            </Link>
          </p>
          <p className="font-semibold uppercase">{item.title}</p>
          <p className='mb-4'>{item.location}</p>
          {!isExpanded && item.images?.[0] ? (
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-36 h-24 object-cover"
            />
          ) : (
            <div className="w-36 h-0" />
          )}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col space-y-1">
          <p className="text-md font-semibold">{item.date}</p>
          {item.images?.[0] && (
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-[220px] object-cover my-2"
            />
          )}
          <div className="flex justify-between text-md font-bold uppercase">
            <p>{item.title}</p>
            <p>{item.location}</p>
          </div>
          <p className="text-md font-semibold">
            <Link to={`/artist/${slug}`} className="hover:underline">
              {item.artist}
            </Link>
          </p>
        </div>

        {/* Expandable section */}
        <div
          className="transition-all duration-500 ease-in-out overflow-hidden"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className={`pt-2 space-y-2 w-full ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          >
            {/* Desktop carousel */}
            <div className="hidden md:flex flex-col items-center w-full space-y-2">
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 w-full"
              >
                {item.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="min-w-2/3 h-[300px] snap-center"
                  />
                ))}
              </div>
              <div className="w-full mt-2">
                <div className="flex justify-start space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      carouselRef.current?.scrollBy({ left: -600, behavior: 'smooth' });
                    }}
                    className="text-xl hover:underline"
                  >
                    ←
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      carouselRef.current?.scrollBy({ left: 600, behavior: 'smooth' });
                    }}
                    className="text-xl hover:underline"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-sm md:text-base leading-tight max-w-3xl mt-4">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen w-full p-4 md:p-8 flex flex-col items-center">
        {/* CURRENT */}
        <section className="w-full max-w-6xl mb-12">
          <h2 className="text-[32px] font-bold leading-none mb-4">CURRENT</h2>
          <div className="border-b border-black" />
          {exhibitions.current.map((item, i) => (
            <ExhibitionRow key={i} item={item} index={i} section="current" />
          ))}
        </section>

        {/* UPCOMING */}
        <section className="w-full max-w-6xl mb-12">
          <h2 className="text-[32px] font-bold leading-none mb-4">UPCOMING</h2>
          <div className="border-b border-black" />
          {exhibitions.upcoming.map((item, i) => (
            <ExhibitionRow key={i} item={item} index={i} section="upcoming" />
          ))}
        </section>

        {/* PAST */}
        <section className="w-full max-w-6xl mb-24">
          <h2 className="text-[32px] font-bold leading-none mb-4">PAST</h2>
          <div className="border-b border-black opacity-50 mb-2" />
          {exhibitions.past.map((item, i) => (
            <div
              key={i}
              className="opacity-30 py-2 text-lg md:text-lg flex flex-col md:flex-row md:justify-between md:items-start"
            >
              <p className="font-semibold mb-0 md:w-1/4">{item.date}</p>
              <p className="font-semibold mb-0 md:w-1/4">{item.artist}</p>
              <p className="uppercase md:w-1/2">{item.title}</p>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}
