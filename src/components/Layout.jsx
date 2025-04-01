import Header from './Header';
import Nav from './Navbar';

// Look at adding a snap in mobile navbar

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white pt-6 flex flex-col items-center">
        <Header />

        {/* Mobile Nav just below header */}
        <div className="md:hidden mt-4">
          <Nav />
        </div>
      </header>

      {/* Scrollable Main Content (padding accounts for fixed header + nav) */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 mt-[150px] md:mt-[100px] mb-[70px]">
        {children}
      </main>

      {/* Fixed Nav at Bottom (Desktop only) */}
      <footer className="hidden md:flex fixed bottom-0 left-0 w-full justify-center bg-white py-4 z-50">
        <Nav />
      </footer>
    </div>
  );
}
