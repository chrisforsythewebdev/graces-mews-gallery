import Nav from '../components/Navbar';
import jas from '../assets/images/jas-knight.jpeg';
import dick from '../assets/images/dick-homepage.jpeg';
import harley from '../assets/images/harley.jpeg';

// Dummy data
const exhibitions = {
  current: [
    {
      date: '30 Jan - 6 Apr 2025',
      artist: 'Dick Jewell',
      title: 'SELECTED WORKS',
      location: 'LDN',
      image: dick,
    },
  ],
  upcoming: [
    {
      date: '30 Jan - 6 Apr 2025',
      artist: 'Jas Knight',
      title: 'TERRAIN',
      location: 'NYC',
      image: jas,
    },
    {
      date: '30 Jan - 6 Apr 2025',
      artist: 'Harley Weir',
      title: 'SINS OF A DAUGHTER',
      location: 'LDN',
      image: harley,
    },
  ],
  past: [
    { date: '30 Jan - 6 Apr 2025', artist: 'Sholto Blissett', title: 'THE PARTY' },
    { date: '30 Jan - 6 Apr 2025', artist: 'Natalia González Martín', title: 'RUPTURE' },
    { date: '30 Jan - 6 Apr 2025', artist: 'Shaun McDowell', title: 'INTERVALS' },
    { date: '30 Jan - 6 Apr 2025', artist: 'Norman Hyams', title: "DON'T YOU WORRY HONEY" },
    { date: '30 Jan - 6 Apr 2025', artist: 'George Rouy', title: "LOOKS LIKE YOU'VE REACHED THE END" },
    { date: '30 Jan - 6 Apr 2025', artist: 'Stevie Dix, Danny Fox', title: 'BLUE FEAR' },
  ],
};

export default function Exhibitions() {
  return (
    <div className="min-h-screen w-full p-8 flex flex-col items-center">
      
      {/* Header + Mobile Nav */}
      <div className="flex flex-col items-center w-full mb-12">
        <h1 className="text-5xl md:text-6xl font-bold">GRACES MEWS</h1>

        {/* Mobile Nav */}
        <div className="md:hidden mt-4">
          <Nav />
        </div>
      </div>

      {/* Current Exhibitions */}
      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-xl font-bold mb-4">CURRENT</h2>
        {exhibitions.current.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between items-center border-b py-4">
            <p className="w-full md:w-1/4 font-semibold">{item.date}</p>
            <p className="w-full md:w-1/4 font-semibold">{item.artist}</p>
            <p className="w-full md:w-1/4 font-semibold uppercase">{item.title}</p>
            <p className="w-full md:w-1/12">{item.location}</p>
            <img src={item.image} alt={item.title} className="w-full md:w-32 h-20 object-cover mt-2 md:mt-0" />
          </div>
        ))}
      </section>

      {/* Upcoming Exhibitions */}
      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-xl font-bold mb-4">UPCOMING</h2>
        {exhibitions.upcoming.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between items-center border-b py-4">
            <p className="w-full md:w-1/4 font-semibold">{item.date}</p>
            <p className="w-full md:w-1/4 font-semibold">{item.artist}</p>
            <p className="w-full md:w-1/4 font-semibold uppercase">{item.title}</p>
            <p className="w-full md:w-1/12">{item.location}</p>
            <img src={item.image} alt={item.title} className="w-full md:w-32 h-20 object-cover mt-2 md:mt-0" />
          </div>
        ))}
      </section>

      {/* Past Exhibitions */}
      <section className="w-full max-w-5xl opacity-50">
        <h2 className="text-xl font-bold mb-4">PAST</h2>
        {exhibitions.past.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <p className="w-1/4 text-sm">{item.date}</p>
            <p className="w-1/4 text-sm">{item.artist}</p>
            <p className="w-1/2 text-sm uppercase">{item.title}</p>
          </div>
        ))}
      </section>

      {/* Navigation (mobile bottom) */}
      <div className="hidden md:flex justify-center mt-12">
        <Nav />
      </div>
    </div>
  );
}