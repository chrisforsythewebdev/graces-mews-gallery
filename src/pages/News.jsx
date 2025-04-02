import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { newsItems } from '../data/newsData';
import Layout from '../components/Layout';

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
    <Layout>
      <div className="relative w-full text-2xl max-w-6xl mx-auto mt-12 px-4 md:px-8">
        {/* Hover Preview Image (behind content) */}
        {hoveredItem && (
          <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
            <img
              src={hoveredItem.thumbnail}
              alt={hoveredItem.title}
              className="w-[640px] h-[400px] object-cover shadow-xl transition-opacity duration-300 ease-in-out"
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
    </Layout>
  );
}
