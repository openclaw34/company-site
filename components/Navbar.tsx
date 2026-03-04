'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Experience', href: '/#experience' },
  { label: 'Highlights', href: '/#highlights' },
  { label: 'Itinerary', href: '/#itinerary' },
  { label: 'Location', href: '/#location' },
  { label: 'Access', href: '/#access' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
          href="/"
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
          <Link
            href="/booking"
            className={`ml-2 px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 ${
              solid
                ? 'bg-forest-600 text-white hover:bg-forest-700'
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            Book Now
          </Link>
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
        <Link
          href="/booking"
          className="block mx-4 my-3 py-3 text-center text-white bg-forest-600 font-medium rounded-xl hover:bg-forest-700 transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
}
