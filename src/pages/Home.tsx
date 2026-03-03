import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5407567/pexels-photo-5407567.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Misty green forest mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-900/50" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/70 mb-6">
          Sake Brewery Tour — Okutama, Tokyo
        </p>
        <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl font-bold text-white tracking-wide leading-none">
          KANPAI
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          A full-day sake journey to a 300-year-old brewery in Okutama
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-50"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

/* ─── Experience ─── */
function Experience() {
  const details = [
    { label: 'Price', value: '¥15,000 / person' },
    { label: 'Duration', value: 'Full day (~7–8 hours)' },
    { label: 'Language', value: 'English' },
    { label: 'Group Size', value: '2–8 guests' },
  ];

  const includes = [
    'Brewery tour with English-speaking guide',
    'Guided sake tasting',
    'Riverside lunch',
    'Digital photo collection',
  ];

  const excludes = [
    'Round-trip transport (participants\' own expense)',
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.2em] text-forest-500 mb-3">
            The Experience
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest-900 mb-8">
            A day like no other
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <FadeIn>
            <p className="text-lg text-gray-600 leading-relaxed">
              Step into the world of traditional sake brewing with a full-day
              guided journey from Tokyo to Ozawa Brewery in Okutama. Founded
              over 300 years ago during the Edo period, this historic brewery
              sits nestled in a lush mountain valley fed by pristine spring
              water from the Tama River.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Your day includes an exclusive tour of the brewing facilities,
              a guided tasting of their finest sakes, and a leisurely riverside
              lunch overlooking the Tama River gorge.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="bg-cream rounded-2xl p-5"
                >
                  <p className="text-xs uppercase tracking-wider text-forest-600 mb-1">
                    {d.label}
                  </p>
                  <p className="text-lg font-semibold text-forest-900">
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Includes / Excludes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <FadeIn>
            <h3 className="text-sm uppercase tracking-wider text-forest-600 mb-4 font-semibold">
              What's Included
            </h3>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-forest-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={100}>
            <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 font-semibold">
              Not Included
            </h3>
            <ul className="space-y-3">
              {excludes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-500">
                  <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Highlights ─── */
function Highlights() {
  const items = [
    {
      title: 'A 300-Year-Old Brewery',
      description:
        'Walk through the historic Ozawa Brewery, where sake has been crafted using traditional methods since the Edo period. Learn about the brewing process from rice polishing to fermentation, all guided in English.',
      image: 'https://images.pexels.com/photos/3800108/pexels-photo-3800108.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Sake barrels at a Japanese shrine',
    },
    {
      title: 'Guided Tasting',
      description:
        'Sample a curated selection of Ozawa Brewery\'s finest sakes with expert English-speaking guidance. Learn to identify flavor profiles, understand the nuances of different brewing styles, and discover your personal preferences.',
      image: 'https://images.pexels.com/photos/30980927/pexels-photo-30980927.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Traditional sake barrels in Japan',
    },
    {
      title: 'Riverside Lunch in the Gorge',
      description:
        'Enjoy a relaxing meal beside the crystal-clear waters of the Tama River. The gorge setting, surrounded by towering trees and natural rock formations, provides an unforgettable dining backdrop.',
      image: 'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'River flowing through a lush green gorge',
    },
  ];

  return (
    <section id="highlights" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.2em] text-forest-500 mb-3 text-center">
            Highlights
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest-900 text-center mb-16">
            Three unforgettable moments
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 150}>
              <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-forest-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Itinerary ─── */
function Itinerary() {
  const steps = [
    {
      num: '01',
      title: 'Meet at Shinjuku Station',
      description:
        'Your guide will meet you at a designated spot in Shinjuku Station. Exact meeting point details will be shared upon booking confirmation.',
    },
    {
      num: '02',
      title: 'Travel by Green Car',
      description:
        'Enjoy a comfortable ride aboard JR\'s Green Car (first class) through the scenic western Tokyo countryside. Transportation costs are not included in the tour price.',
    },
    {
      num: '03',
      title: 'Brewery Tour',
      description:
        'Explore Ozawa Brewery\'s historic facilities with an English-speaking guide. You\'ll receive an English-language tour script to follow along as you discover centuries of brewing tradition.',
    },
    {
      num: '04',
      title: 'Sake Tasting',
      description:
        'Sample multiple varieties of freshly brewed sake directly from the source. Your guide will walk you through each pour, explaining the unique characteristics and brewing methods.',
    },
    {
      num: '05',
      title: 'Riverside Lunch',
      description:
        'Settle in for a leisurely meal at a riverside restaurant overlooking the Tama River gorge, surrounded by the natural beauty of Okutama.',
    },
    {
      num: '06',
      title: 'Your Photos, Delivered',
      description:
        'Throughout the day, your guide captures candid moments and scenic shots. A curated digital photo collection will be shared with you after the tour.',
    },
    {
      num: '07',
      title: 'Return to Shinjuku',
      description:
        'After a full day of exploration, travel back to Shinjuku Station where the tour concludes. Your guide will accompany you for the return journey.',
    },
  ];

  return (
    <section id="itinerary" className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.2em] text-forest-500 mb-3 text-center">
            Itinerary
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest-900 text-center mb-16">
            Your day
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-forest-200" />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div className="flex gap-6">
                  {/* Step number circle */}
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-forest-600 text-white flex items-center justify-center text-sm font-semibold">
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold text-forest-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Location ─── */
function Location() {
  return (
    <section id="location" className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="aspect-4/3 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2591408/pexels-photo-2591408.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Aerial view of a river winding through green mountains"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <p className="text-sm uppercase tracking-[0.2em] text-forest-500 mb-3">
              Location
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-900 mb-6">
              Okutama, Tokyo
            </h2>
            <p className="text-2xl font-serif text-forest-700 italic mb-6">
              Tokyo's hidden valley
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Just 90 minutes from Shinjuku, Okutama feels like another world
              entirely. This mountainous region at Tokyo's western edge has been
              home to sake brewing for over three centuries, thanks to its
              pristine spring water and cool mountain climate — ideal conditions
              for crafting exceptional sake.
            </p>

            <div className="flex gap-8">
              <div>
                <p className="font-serif text-3xl text-forest-800 font-bold">90</p>
                <p className="text-sm text-gray-500">min from Shinjuku</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-forest-800 font-bold">300+</p>
                <p className="text-sm text-gray-500">years of brewing</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/*
── Reviews (commented out until real reviews are available) ──

function Reviews() {
  const reviews = [
    {
      text: 'An incredible day exploring a part of Tokyo most visitors never see. The brewery tour was fascinating and the riverside lunch was the highlight of our trip.',
      author: 'Coming Soon',
    },
    {
      text: 'Perfect blend of culture, nature, and great sake. Our guide was knowledgeable and made the whole experience feel personal and special.',
      author: 'Coming Soon',
    },
    {
      text: "The train ride through the mountains was beautiful, and the sake tasting exceeded all expectations. Can't recommend this enough!",
      author: 'Coming Soon',
    },
  ];

  return (
    <section id="reviews" className="py-24 md:py-32 bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.2em] text-forest-300 mb-3 text-center">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white text-center mb-16">
            Guest Reviews
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <svg
                  className="w-8 h-8 text-forest-400 mb-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-white/80 leading-relaxed mb-6 text-sm">
                  {review.text}
                </p>
                <p className="text-sm text-white/40">— {review.author}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
*/

/* ─── Access ─── */
function Access() {
  return (
    <section id="access" className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.2em] text-forest-500 mb-3 text-center">
            Getting There
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest-900 text-center mb-16">
            Access
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeIn>
            <div className="space-y-8">
              {/* Meeting Point */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-forest-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Meeting Point</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Shinjuku Station, Tokyo. Exact meeting location details will be
                    shared upon booking confirmation.
                  </p>
                </div>
              </div>

              {/* Transport */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-forest-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Transport</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    JR Green Car (first class) from Shinjuku to Okutama.
                    Transportation costs are not included in the tour price.
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-forest-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-forest-900 mb-1">Duration</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Approximately 7–8 hours, departing in the morning and returning
                    in the late afternoon.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Map placeholder */}
          <FadeIn delay={150}>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-forest-100 via-forest-50 to-cream overflow-hidden relative border border-forest-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-forest-300 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-forest-400 text-sm font-medium">Map Placeholder</p>
                  <p className="text-forest-300 text-xs mt-1">Okutama, Tokyo</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Highlights />
      <Itinerary />
      <Location />
      {/* <Reviews /> */}
      <Access />
      <Footer />
    </>
  );
}
