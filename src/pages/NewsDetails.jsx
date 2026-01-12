import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { client } from '../lib/client';
import { getNewsItemBySlug } from '../lib/queries';
import { PortableText } from '@portabletext/react';

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const query = getNewsItemBySlug(id);
      const result = await client.fetch(query);
      setItem(result);
      setCurrentIndex(0); // reset when navigating to a new item
    };
    fetchData();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  const galleryCount = item.gallery?.length || 0;

  const formattedDate = item.fullDate
    ? new Date(item.fullDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < galleryCount - 1;

  const handlePrev = () => {
    if (canGoPrev) setCurrentIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (canGoNext) setCurrentIndex((i) => i + 1);
  };

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mt-2 pt-[20px] pb-[20px]">

        {/* ===== Mobile Hero ===== */}
        <div className="md:hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-auto max-h-[500px] object-cover mb-2 md:mb-6"
          />
        </div>

        {/* ===== Mobile Title + Top Description + Main Image/Carousel ===== */}
        <div className="md:hidden mb-4 w-full">
          <div className="w-3/4">
            <h2 className="font-bold font-gracesmews text-lg uppercase">{item.title}</h2>
            <p className="text-sm font-gracesmews text-gray-500">{formattedDate}</p>
          </div>

          {item.descriptionTop && (
            <div className="pt-2 text-md">
              <PortableText value={item.descriptionTop} />
            </div>
          )}

          {galleryCount > 0 && (
            <div className="mt-4">
              <img
                src={item.gallery[currentIndex]}
                alt={`${item.title} — ${currentIndex + 1}`}
                className="w-full h-auto max-h-[420px] object-contain"
              />

              {galleryCount > 1 && (
                <div className="flex justify-end gap-4 mt-2">
                  <button
                    onClick={handlePrev}
                    disabled={!canGoPrev}
                    aria-label="Previous image"
                    className="text-2xl text-black hover:text-[#AAAAAA] hover:scale-110 disabled:text-gray-300 disabled:cursor-default disabled:hover:scale-100 disabled:hover:text-gray-300 transition-transform"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    aria-label="Next image"
                    className="text-2xl text-black hover:text-[#AAAAAA] hover:scale-110 disabled:text-gray-300 disabled:cursor-default disabled:hover:scale-100 disabled:hover:text-gray-300 transition-transform"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== Desktop: Title/Date row ===== */}
        <div className="hidden md:block mb-4">
          <h2 className="font-bold text-md uppercase mb-1">{item.title}</h2>
          <p className="text-sm font-gracesmews text-gray-500">{formattedDate}</p>
        </div>

        {/* ===== Desktop Grid: Poster + Top Description + Image/Carousel ===== */}
        <div className="hidden md:grid grid-cols-12 gap-8 mb-4 items-start">
          <div className="col-span-4">
            <img
              src={item.thumbnail}
              alt={item.title || 'News poster'}
              className="w-auto max-w-[360px] max-h-[640px] h-auto object-contain shadow-sm"
            />
          </div>

          <div className="col-span-1" />

          <div className="col-span-7 pr-14">
            {item.descriptionTop && (
              <div className="pt-0 text-sm">
                <PortableText value={item.descriptionTop} />
              </div>
            )}

            {/* Same layout whether 1 or many images: one main image + arrows */}
            {galleryCount > 0 && (
              <div className="mt-4">
                <img
                  src={item.gallery[currentIndex]}
                  alt={`${item.title} — ${currentIndex + 1}`}
                  className="w-full h-auto max-h-[420px] object-contain"
                />

                {galleryCount > 1 && (
                  <div className="flex justify-end gap-4 mt-2">
                    <button
                      onClick={handlePrev}
                      disabled={!canGoPrev}
                      aria-label="Previous image"
                      className="text-2xl text-black hover:text-[#AAAAAA] hover:scale-110 disabled:text-gray-300 disabled:cursor-default disabled:hover:scale-100 disabled:hover:text-gray-300 transition-transform"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!canGoNext}
                      aria-label="Next image"
                      className="text-2xl text-black hover:text-[#AAAAAA] hover:scale-110 disabled:text-gray-300 disabled:cursor-default disabled:hover:scale-100 disabled:hover:text-gray-300 transition-transform"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== Desktop Bottom Description / Video / Buy ===== */}
        {(item.descriptionBottom || item.video || item.videoDescription || item.buyText) && (
          <div className="hidden md:grid grid-cols-12 gap-8 mt-4">
            <div className="col-span-4" />
            <div className="col-span-1" />
            <div className="col-span-7 text-sm w-full pr-14">
              {item.descriptionBottom && <PortableText value={item.descriptionBottom} />}

              {item.video && (
                <>
                  {/* ensure iframe uses same column width as images */}
                  <div className="my-4">
                    <iframe
                      src={item.video}
                      title={item.videoDescription ? item.videoDescription : `Video – ${item.title}`}
                      allowFullScreen
                      className="w-full h-[420px]"
                    />
                  </div>
                </>
              )}

              {item.videoDescription && (
                <p className="text-sm opacity-60 font-gracesmews">{item.videoDescription}</p>
              )}

              {item.buyText && (
                <p className="text-lg mt-6 font-gracesmews">
                  {item.buyLink ? (
                    <a
                      href={item.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:no-underline"
                    >
                      {item.buyText}
                    </a>
                  ) : (
                    item.buyText
                  )}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ===== Mobile Bottom ===== */}
        <div className="md:hidden space-y-4 mt-6">
          {item.descriptionBottom && <PortableText value={item.descriptionBottom} />}

          {item.video && (
            <div className="aspect-video">
              <iframe
                src={item.video}
                title={item.videoDescription || `Video – ${item.title}`}
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {item.videoDescription && <p className="text-md opacity-60">{item.videoDescription}</p>}

          {item.buyText && (
            <p className="text-lg mt-4">
              {item.buyLink ? (
                <a
                  href={item.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  {item.buyText}
                </a>
              ) : (
                item.buyText
              )}
            </p>
          )}
        </div>

      </div>
    </Layout>
  );
}
