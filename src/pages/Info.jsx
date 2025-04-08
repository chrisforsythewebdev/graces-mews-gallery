import Layout from '../components/Layout';
import shopImage from '../assets/images/shop.jpeg';

export default function Info() {
  return (
    <Layout>
      <div className="w-full max-w-6xl px-4 md:px-0 mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Text Column */}
        <div className="flex flex-col space-y-6">
          <p className="text-lg font-semibold">
            Graces Mews Gallery is home to an international roster of photographers, filmmakers and multidisciplinary artists.
            Established in 2008 as a gallery and independent publishing company based in London, DoBeDo has grown to include
            the artist representation agency and worldwide production company with offices in London and New York.
          </p>
          <p className="text-lg font-semibold">
            Our purpose-built space will host an exciting array of workshops, film screenings, talks, and photography exhibitions.
            A curated selection of photography books and products published and commissioned by DoBeDo Projects will be available
            to purchase in our ground-floor shop.
          </p>

          {/* Rotating SHOP ONLINE Button - Desktop */}
          <div className="hidden md:flex mt-4">
            <a
              href="https://www.dobedo.com/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-black font-bold rounded-full w-32 h-32 flex items-center justify-center text-center rotate-[-20deg] shadow-md animate-slowspin"
            >
              SHOP<br />ONLINE
            </a>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-2 text-gray-500 font-semibold text-md">
            {/* London */}
            <div>
              <p className="text-black">London</p>
              <p>7 Atlas Mews</p>
              <p>Off Ramsgate Street</p>
              <p>London, E8 2NE</p>
              <p>UK</p>
              <p className="mt-2">+44 0203 740 6555</p>
              <p>hello@dobedo.agency</p>
            </div>

            {/* New York */}
            <div>
              <p className="text-black">New York</p>
              <p>103 E Broadway</p>
              <p>2nd Floor</p>
              <p>NY, NY 10002</p>
              <p>USA</p>
              <p className="mt-2">+1 (646) 649 2522</p>
              <p>hello@dobedo.agency</p>
            </div>
          </div>
        </div>

        {/* Desktop Image Column */}
        <div className="hidden md:block w-full">
          <img
            src={shopImage}
            alt="Gallery Shop"
            className="w-full h-auto object-cover"
            style={{ maxHeight: '656px' }}
          />
        </div>

        {/* Mobile Image (top) */}
        <div className="md:hidden w-full flex justify-center mb-4">
          <img
            src={shopImage}
            alt="Gallery Shop"
            className="object-cover"
            style={{ width: '100%', maxWidth: '502px', height: '6' }}
          />
        </div>
      </div>
    </Layout>
  );
}
