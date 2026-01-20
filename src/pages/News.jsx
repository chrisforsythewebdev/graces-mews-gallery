import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { client } from '../lib/client';
import { getNews } from '../lib/queries';

export default function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const data = await client.fetch(getNews);
      setNewsItems(data);
    };
    fetchNews();
  }, []);

  const grouped = newsItems.reduce((acc, item) => {
    const year = item.year || new Date(item.fullDate).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(item);
    return acc;
  }, {});

  const isActiveHover = hoveredItem !== null;

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <Layout>
      {/* Match Exhibitions outer layout */}
      <div className="min-h-screen w-full p-4 md:p-8 flex flex-col items-center">
        <div className="relative w-full max-w-6xl font-gracesmews">
          {/* Hover preview image on desktop */}
          {isDesktop && hoveredItem && (
            <div className="fixed inset-0 flex items-center justify-end pr-[280px] z-50 pointer-events-none">
              <div className="w-[520px] h-[360px] flex items-center justify-center">
                <img
                  src={hoveredItem.thumbnail}
                  alt={hoveredItem.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          )}

          <div className="relative z-10">
            {Object.keys(grouped)
              .sort((a, b) => b - a)
              .map((year) => (
                <section key={year} className="mb-12">
                  {/* Match Exhibitions section heading */}
                  <h2
                    className={`text-[32px] font-gracesmews font-bold leading-none mb-4 ${
                      isActiveHover ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    {year}
                  </h2>

                  {/* Match Exhibitions border line (like PAST section) */}
                  <div
                    className={`border-b border-black opacity-50 mb-2 transition-opacity duration-200 ${
                      isActiveHover ? 'opacity-30' : 'opacity-50'
                    }`}
                  />

                  {grouped[year]
                    .sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate))
                    .map((item) => {
                      const isHovered = hoveredItem?._id === item._id;

                      return (
                        <div
                          key={item._id}
                          className={`cursor-pointer transition-all duration-300 ease-in-out transform ${
                            isActiveHover && isDesktop
                              ? isHovered
                                ? 'text-black font-bold opacity-100 scale-[1.005]'
                                : 'text-black opacity-30 scale-100'
                              : 'text-black opacity-100 scale-100'
                          }`}
                          onMouseEnter={() => isDesktop && setHoveredItem(item)}
                          onMouseLeave={() => isDesktop && setHoveredItem(null)}
                          onClick={() => navigate(`/news/${item.slug}`)}
                        >
                          {/* MOBILE ROW */}
                          <div className="block md:hidden flex flex-row gap-x-14 leading-tight mb-[2px] text-lg">
                            <span className="w-[40px] font-bold flex-shrink-0">{item.number}</span>
                            <span className="flex-1">{item.title}</span>
                          </div>

                          {/* DESKTOP ROW – align feel with Exhibitions (text-lg) */}
                          <div className="hidden md:flex justify-between items-center py-1 text-lg">
                            <div className="flex gap-6">
                              <span className="w-12 font-bold">{item.number}</span>
                              <span>{item.title}</span>
                            </div>
                            <span>{item.shortDate}</span>
                          </div>
                        </div>
                      );
                    })}
                </section>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
