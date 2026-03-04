import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & tagline */}
          <div>
            <Link href="/" className="font-serif text-2xl font-bold tracking-wide">
              KANPAI
            </Link>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Curated sake experiences<br />in Okutama, Tokyo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal" className="text-white/70 hover:text-white transition-colors">
                  Specified Commercial Transactions Act
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="text-white/70 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          &copy; 2026 KANPAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
