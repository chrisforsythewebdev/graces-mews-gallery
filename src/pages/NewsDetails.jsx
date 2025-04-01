import { useParams } from 'react-router-dom';
import { newsItems } from '../data/newsData';
import Layout from '../components/Layout';

export default function NewsDetail() {
  const { id } = useParams();
  const item = newsItems.find((n) => n.id === id);

  if (!item) return <p>News item not found.</p>;

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto mt-12 px-4 md:px-8">
        <img src={item.thumbnail} alt="" className="w-full mb-8" />

        <div className="mb-8">
          <h2 className="font-bold uppercase text-sm">{item.title}</h2>
          <p className="text-sm opacity-60">{item.fullDate}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {item.gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full md:w-1/3 h-auto object-cover"
              alt={`Gallery ${i}`}
            />
          ))}
        </div>

        <div className="text-sm leading-relaxed space-y-4">
          <p>{item.description}</p>
          {item.credit && <p className="text-xs mt-4">{item.credit}</p>}
        </div>

        {item.video && (
          <div className="mt-8 aspect-video">
            <iframe
              src={item.video}
              title="Video"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
