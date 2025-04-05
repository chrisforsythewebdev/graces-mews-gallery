import { useParams } from 'react-router-dom';
import { newsItems } from '../data/newsData';
import Layout from '../components/Layout';
import { useRef } from 'react';

export default function NewsDetail() {
  const { id } = useParams();
  const item = newsItems.find((n) => n.id === id);
  const carouselRef = useRef(null);

  if (!item) return <p>News item not found.</p>;

  return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-2 pb-[120px]">
        {/* Main Image */}
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-auto max-h-[500px] object-cover mb-2 md:mb-6"
        />

        {/* Mobile: Title, Date, and First Text Block */}
        <div className="md:hidden mb-4 w-full">
          <div className='w-3/4'>
            <h2 className="font-bold text-lg uppercase">{item.title}</h2>
            <p className="text-lg text-gray-500">{item.fullDate}</p>
          </div>
          <p className="text-md pt-2">
            The triptychs that appear in the book were originally displayed as enlarged 35mm
            black and white contact sheets in the window of the Soho shop.
          </p>
          <br />
          <p>
            Replaced only when the next roll was developed, and then they were forgotten. ‘CUTS’ is
            therefore a valuable record of the institution and its Soho clientele from a significant
            era in London’s cultural history.
          </p>
        </div>

        {/* Desktop: Title and First Text Block */}
        <div className="hidden md:grid grid-cols-12 gap-8 mb-8">
          {/* Title + Date */}
          <div className="col-span-4">
            <h2 className="font-bold text-lg uppercase mb-2">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.fullDate}</p>
          </div>
          <div className="col-span-1" />
          {/* First Text Block aligned with second carousel image */}
          <div className="col-span-7 text-sm md:text-base font-semibold w-full pr-14">
            <p>
              The triptychs that appear in the book were originally displayed as enlarged 35mm black
              and white contact sheets in the window of the Soho shop, replaced only when the next
              roll was developed, and then they were forgotten. ‘CUTS’ is therefore a valuable record
              of the institution and its Soho clientele from a significant era in London’s cultural
              history.
            </p>
            <br />
            <p>
              The triptychs that appear in the book were originally displayed as enlarged 35mm black
              and white contact sheets in the window of the Soho shop, replaced only when the next
              roll was developed, and then they were forgotten. ‘CUTS’ is therefore a valuable record
              of the institution and its Soho clientele from a significant era in London’s cultural
              history.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative pb-8">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4"
          >
            {item.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                className="w-full md:min-w-[41.5%] md:max-w-[40%] h-[200px] md:h-[260px] object-cover snap-center"
              />
            ))}
          </div>

          {/* Arrow controls */}
          <div className="absolute bottom-0 left-0 flex gap-2">
            <button
              onClick={() =>
                carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
              }
              className="text-2xl"
            >
              ←
            </button>
            <button
              onClick={() =>
                carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
              }
              className="text-2xl"
            >
              →
            </button>
          </div>
        </div>

        {/* Desktop: Second Text Block */}
        <div className="hidden md:grid grid-cols-12 gap-8 mt-6">
          <div className="col-span-4" />
          <div className="col-span-1" />
          <div className="col-span-7 text-sm md:text-base font-semibold w-full pr-14">
            <p>
              The book launch for this second edition was held at Reference Point with a Q&A with
              Sarah Lewis chaired by Jonah Freud. Since this event, the documentary was screened at
              the Locarno Film Festival 2023 where it was awarded the Jannuzzi Smith Award and Le
              Film Français Award by the festival’s First Look jury.
            </p>
            <br />
            <p>
              Since this event, the documentary was screened at the Locarno Film Festival 2023 where
              it was awarded the Jannuzzi Smith Award and Le Film Français Award by the festival’s
              First Look jury.
            </p>
          </div>
        </div>

        {/* Desktop: Video and Credit */}
        {(item.video || item.credit) && (
          <div className="hidden md:grid grid-cols-12 gap-8 mt-10">
            <div className="col-span-7 col-start-6 w-full">
              {item.video && (
                <div className="aspect-video mb-4">
                  <iframe
                    src={item.video}
                    title="Video"
                    allowFullScreen
                    className="w-full h-[350px]"
                  />
                </div>
              )}
              {item.credit && (
                <p className="text-sm opacity-60">{item.credit}</p>
              )}
              {item.buyText && (
            <p className="text-lg mt-6">{item.buyText}</p>
          )}
            </div>
          </div>
        )}

        {/* Mobile: Second Text Block + Video */}
        <div className="md:hidden space-y-2 mt-6">
          <div className="text-md mb-6">
            <p>
              The book launch for this second edition was held at Reference Point with a Q&A with
              Sarah Lewis chaired by Jonah Freud. Since this event, the documentary was screened at
              the Locarno Film Festival 2023 where it was awarded the Jannuzzi Smith Award and Le Film
              Français Award by the festival’s First Look jury.
            </p>
            <br />
            <p>
              Since this event, the documentary was screened at the Locarno Film Festival 2023 where
              it was awarded the Jannuzzi Smith Award and Le Film Français Award by the festival’s
              First Look jury.
            </p>
          </div>

          {item.video && (
            <div className="aspect-video">
              <iframe
                src={item.video}
                title="Video"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {item.credit && (
            <p className="text-md opacity-60 pb-12">{item.credit}</p>
          )}

          {item.buyText && (
            <p className="text-lg mt-">{item.buyText}</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
