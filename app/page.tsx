import FadeIn from '@/components/FadeIn';

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
          A half-day sake journey to a 300-year-old brewery in Okutama
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
    { label: 'Duration', value: 'Half day (~5 hours)' },
    { label: 'Language', value: 'English' },
    { label: 'Group Size', value: '2–8 guests' },
  ];

  const includes = [
    'Brewery tour with English-speaking guide',
    'Guided sake tasting',
    'Riverside lunch',
    'Digital photo collection',
  ];

  const excludes = ["Round-trip transport (participants' own expense)"];

  return (
    <section id="experience" className="py-24 md:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm uppercase tracking-[0.2em] text-forest-500 mb-3">The Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl text-forest-900 mb-8">
            A day like no other
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <FadeIn>
            <p className="text-lg text-gray-600 leading-relaxed">
              Step into the world of traditional sake brewing with a full-day guided journey from
              Tokyo to Ozawa Brewery in Okutama. Founded over 300 years ago during the Edo period,
              this historic brewery sits nestled in a lush mountain valley fed by pristine spring
              water drawn from deep within the bedrock caves beneath the brewery.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Your day includes an exclusive tour of the brewing facilities, a guided tasting of
              their finest sakes, and a leisurely riverside lunch overlooking the Tama River gorge.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="grid grid-cols-2 gap-4">
              {details.map((d) => (
                <div key={d.label} className="bg-cream rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-wider text-forest-600 mb-1">{d.label}</p>
                  <p className="text-lg font-semibold text-forest-900">{d.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Includes / Excludes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <FadeIn>
            <h3 className="text-sm uppercase tracking-wider text-forest-600 mb-4 font-semibold">
              What&apos;s Included
            </h3>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-forest-500 flex-shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
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
                  <svg
                    className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
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
      image:
        'https://images.pexels.com/photos/3800108/pexels-photo-3800108.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Sake barrels at a Japanese shrine',
    },
    {
      title: 'Guided Tasting',
      description:
        "Sample a curated selection of Ozawa Brewery's finest sakes with expert English-speaking guidance. Learn to identify flavor profiles, understand the nuances of different brewing styles, and discover your personal preferences.",
      image:
        'https://images.pexels.com/photos/30980927/pexels-photo-30980927.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Traditional sake barrels in Japan',
    },
    {
      title: 'Riverside Lunch in the Gorge',
      description:
        'Enjoy a relaxing meal beside the crystal-clear waters of the Tama River. The gorge setting, surrounded by towering trees and natural rock formations, provides an unforgettable dining backdrop.',
      image:
        'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=800',
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
                  <h3 className="font-serif text-2xl text-forest-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
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
        'Your guide will meet you at Chuo Line Platform 12 in Shinjuku Station. Detailed directions will be shared upon booking confirmation.',
    },
    {
      num: '02',
      title: 'Travel by Green Car',
      description:
        "Enjoy a comfortable ride aboard JR's Green Car (first class) through the scenic western Tokyo countryside. Transportation costs are not included in the tour price.",
    },
    {
      num: '03',
      title: 'Brewery Tour',
      description:
        "Explore Ozawa Brewery's historic facilities with an English-speaking guide. You'll receive an English-language tour script to follow along as you discover centuries of brewing tradition.",
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
        'Settle in for a leisurely meal at a restaurant in the Okutama area, overlooking the Tama River gorge. In case of rain, dining may take place at an indoor venue nearby.',
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
        'After the tour, travel back to Shinjuku Station where the tour concludes. Your guide will accompany you for the return journey.',
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
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-forest-200" />
          <div className="space-y-10">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 80}>
                <div className="flex gap-6">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-forest-600 text-white flex items-center justify-center text-sm font-semibold">
                    {step.num}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold text-forest-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
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

/* ─── Map ─── */
function MapSection() {
  return (
    <section id="location" className="py-24 md:py-32 bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="aspect-video rounded-2xl overflow-hidden border border-forest-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.123!2d139.0986!3d35.8097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6019390800000001%3A0x1!2sOzawa+Brewery!5e0!3m2!1sen!2sjp!4v1709000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ozawa Brewery, Okutama"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Highlights />
      <Itinerary />
      <MapSection />
    </>
  );
}
