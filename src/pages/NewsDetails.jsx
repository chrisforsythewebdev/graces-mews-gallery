import { useParams } from 'react-router-dom';
import { newsItems } from '../data/newsData';
import Header from '../components/Header';
import Nav from '../components/Navbar';

export default function NewsDetail() {
  const { id } = useParams();
  const item = newsItems.find((n) => n.id === id);

  if (!item) return <p>News item not found.</p>;

  return (
    <div className="min-h-screen w-full p-8 flex flex-col items-center">

      <Header />
    
      <img src={item.thumbnail} alt="" className="w-full max-w-4xl mb-8" />

      <div className="w-full max-w-4xl mb-8">
        <h2 className="font-bold uppercase text-sm">{item.title}</h2>
        <p className="text-sm opacity-60">{item.fullDate}</p>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 mb-8">
        {item.gallery.map((img, i) => (
          <img key={i} src={img} className="w-full md:w-1/3 h-auto object-cover" />
        ))}
      </div>

      <div className="w-full max-w-4xl text-sm leading-relaxed space-y-4">
        <p>{item.description}</p>
        {item.credit && <p className="text-xs mt-4">{item.credit}</p>}
      </div>

      {item.video && (
        <div className="mt-8 w-full max-w-4xl aspect-video">
          <iframe
            src={item.video}
            title="Video"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      <div className="mt-16">
        <Nav />
      </div>
    </div>
  );
}
