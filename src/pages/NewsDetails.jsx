import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { client } from '../lib/client';
import { getNewsItemBySlug } from '../lib/queries';
import { PortableText } from '@portabletext/react';

export default function NewsDetail() {
  const { id } = useParams();
  const carouselRef = useRef(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = getNewsItemBySlug(id);
      const result = await client.fetch(query);
      setItem(result);
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

        {/* ===== Mobile Title + Top Description ===== */}
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
        </div>

        {/* ===== Desktop: Title/Date row ===== */}
        <div className="hidden md:block mb-4">
          <h2 className="font-bold text-lg uppercase mb-2">{item.title}</h2>
          <p className="text-sm font-gracesmews text-gray-500">{formattedDate}</p>
        </div>

        {/* ===== Desktop Grid: Poster + Top Description + optional single image ===== */}
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
              <div className="pt-0 text-sm md:text-base">
                <PortableText value={item.descriptionTop} />
              </div>
            )}

            {/* Single image remains unchanged */}
            {galleryCount === 1 && (
              <div className="mt-4">
                <img
                  src={item.gallery[0]}
                  alt={`${item.title} — 1`}
                  className="w-full h-[320px] object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* ===== Desktop: multi-image gallery row (only when >1) ===== */}
        {galleryCount > 1 && (
          <div className="hidden md:grid grid-cols-12 gap-8 mb-6">
            <div className="col-span-4" />
            <div className="col-span-1" />
            <div className="col-span-7 pr-14">
              <div className="relative">
                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6"
                >
                  {item.gallery?.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Gallery ${i + 1} — ${item.title}`}
                      className="snap-center h-auto w-auto max-h-[420px] min-w-[60%] object-contain rounded-sm"
                    />
                  ))}
                </div>

                {/* Arrows if 3+ images */}
                {galleryCount >= 3 && (
                  <div className="hidden md:flex absolute right-4 bottom-4 gap-2">
                    <button
                      onClick={() =>
                        carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
                      }
                      aria-label="Scroll gallery left"
                      className="text-2xl hover:text-[#AAAAAA] hover:scale-110"
                    >
                      ←
                    </button>
                    <button
                      onClick={() =>
                        carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
                      }
                      aria-label="Scroll gallery right"
                      className="text-2xl hover:text-[#AAAAAA] hover:scale-110"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== Desktop Bottom Description / Video / Buy ===== */}
        {(item.descriptionBottom || item.video || item.videoDescription || item.buyText) && (
          <div className="hidden md:grid grid-cols-12 gap-8 mt-4">
            <div className="col-span-4" />
            <div className="col-span-1" />
            <div className="col-span-7 text-sm md:text-base w-full pr-14">
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

        {/* ===== Mobile Bottom (unchanged) ===== */}
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
