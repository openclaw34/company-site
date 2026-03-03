import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Experience', href: '/#experience' },
  { label: 'Highlights', href: '/#highlights' },
  { label: 'Itinerary', href: '/#itinerary' },
  { label: 'Location', href: '/#location' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Access', href: '/#access' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // On non-home pages, always show solid navbar
  const solid = isScrolled || !isHome;
  const textColor = solid ? 'text-forest-800' : 'text-white';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className={`font-serif text-2xl font-bold tracking-wide ${textColor}`}
        >
          KANPAI
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm tracking-wide hover:opacity-70 transition-opacity ${textColor}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-2 ${textColor}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-sm ${
          isMenuOpen ? 'max-h-96 shadow-lg' : 'max-h-0'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block px-6 py-3 text-forest-800 hover:bg-forest-50 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
