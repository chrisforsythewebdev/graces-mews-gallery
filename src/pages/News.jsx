import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { newsItems } from '../data/newsData';
import Header from '../components/Header';
import Nav from '../components/Navbar';

export default function News() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const grouped = newsItems.reduce((acc, item) => {
    acc[item.year] = acc[item.year] || [];
    acc[item.year].push(item);
    return acc;
  }, {});

  const isActiveHover = hoveredItem !== null;

  return (
    <div className="min-h-screen w-full p-8 flex flex-col items-center">
      <Header />

      <div className="relative w-full text-2xl max-w-6xl mt-12 px-8">
        {/* Hover Preview Image (behind content) */}
        {hoveredItem && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-0 pointer-events-none">
            <img
              src={hoveredItem.thumbnail}
              alt={hoveredItem.title}
              className="w-[900px] h-auto shadow-lg opacity-100"
            />
          </div>
        )}

        {/* Text Rows */}
        <div className="relative z-10">
          {Object.keys(grouped)
            .sort((a, b) => b - a)
            .map((year) => (
              <div key={year} className="mb-6">
                {/* Year Title */}
                <h2 className={`font-bold ${isActiveHover ? 'opacity-30' : 'opacity-100'}`}>
                  {year}
                </h2>

                {/* Divider */}
                <hr
                  className={`my-2 border-black transition-opacity duration-200 ${
                    isActiveHover ? 'opacity-30' : 'opacity-100'
                  }`}
                />

                {/* News Items */}
                {grouped[year].map((item) => {
                  const isHovered = hoveredItem?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center py-1 cursor-pointer transition-opacity duration-200 ${
                        isActiveHover
                          ? isHovered
                            ? 'text-black font-bold opacity-100'
                            : 'text-black opacity-30'
                          : 'text-black opacity-100'
                      }`}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => navigate(`/news/${item.id}`)}
                    >
                      <span>{item.number}</span>
                      <span className="flex-1 px-4">{item.title}</span>
                      <span>{item.date}</span>
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
      </div>

      <div className="mt-16">
        <Nav />
      </div>
    </div>
  );
}
