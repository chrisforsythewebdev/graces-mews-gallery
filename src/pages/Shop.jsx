import Layout from "../components/Layout";
import shop1 from '../assets/images/shop.jpeg';
import shop2 from '../assets/images/shop2.jpeg';

export default function Shop() {
  return (
    <Layout>
      <div className="flex-1 w-full px-4 md:px-8 flex flex-col items-center pb-[120px]">
        {/* Main Content (Images) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full max-w-8xl gap-8 my-8">
          {/* Left Image */}
          <div className="hidden md:block relative">
            <img
              src={shop1}
              alt="Gallery Shop"
              className="w-[300px] h-[420px] object-cover"
            />
            {/* Shop Online Button aligned left (Desktop) */}
            <a
              href="#"
              className="absolute -bottom-[150px] left-0 bg-yellow-400 text-black font-bold rounded-full w-32 h-32 flex items-center justify-center text-center rotate-[-20deg] shadow-md"
            >
              SHOP<br />ONLINE
            </a>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src={shop2}
              alt="Bookstore"
              className="w-[400px] h-[500px] md:w-[700px] md:h-[420px] object-cover"
            />

            {/* Info aligned under right image (Desktop) */}
            <div className="hidden md:flex absolute -bottom-[100px] left-0 right-0 w-full font-semibold text-xl justify-between">
              <div className="text-left">
                <p className="leading-tight">
                  Opening hours<br />
                  12.00–18.00<br />
                  Tuesday – Sunday
                </p>
              </div>
              <div className="text-left absolute left-1/2 transform -translate-x-1/2">
                <p className="leading-tight">
                  8 Grace's Mews<br />
                  Camberwell<br />
                  London, SE5 8JF
                </p>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden relative w-full font-semibold">
            {/* Button top-right */}
            <a
              href="#"
              className="bg-yellow-400 text-black font-bold rounded-full w-28 h-28 flex items-center justify-center text-center rotate-[-20deg] shadow-md absolute top-0 right-0"
            >
              OR SHOP<br />ONLINE
            </a>

            {/* Text aligned with top of button */}
            <div className="pt-2 pr-32 pl-0 space-y-4">
              <div className="text-left">
                <p className="leading-tight">
                  8 Grace's Mews<br />
                  Camberwell<br />
                  London, SE5 8JF
                </p>
              </div>
              <div className="text-left">
                <p className="leading-tight">
                  Opening hours<br />
                  12.00 – 18.00<br />
                  Tuesday – Sunday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
