import Layout from '../components/Layout';
import shopImage from '../assets/images/shop.jpeg';

export default function Info() {
  return (
    <Layout>
      <div className="w-full max-w-6xl px-4 md:px-0 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Mobile Image (top) */}
        <div className="md:hidden w-full flex justify-center mb-4">
          <img
            src={shopImage}
            alt="Gallery Shop"
            className="object-cover"
            style={{ width: '100%', maxWidth: '502px', height: 'auto' }}
          />
        </div>

        {/* Text Content */}
        <div className="text-left space-y-6">
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

        {/* Desktop Image (right side) */}
        <div className="hidden md:flex justify-end">
          <img
            src={shopImage}
            alt="Gallery Shop"
            className="object-cover"
            style={{ width: '500px', height: '556px' }}
          />
        </div>
      </div>
    </Layout>
  );
}
