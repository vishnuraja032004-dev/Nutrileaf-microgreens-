import { ABOUT_IMAGE, FARM_STATS, ViewId } from '../data/microgreens';
import { SafeImage } from './SafeImage';

interface AboutViewProps {
  onNavigate: (view: ViewId) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div>
      <section className="bg-forest-900 text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-wider text-leaf-300">
            About Nutrileaf
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-3">
            Small leaves. Big freshness.
          </h1>
          <p className="mt-4 text-cream-100/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Nutrileaf Microgreens is a Dindigul-based grower dedicated to
            cultivating, packing, and delivering crisp living microgreens straight
            to local kitchens.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] rounded-2xl overflow-hidden border border-forest-800/10 bg-cream-100">
              <SafeImage
                src={ABOUT_IMAGE}
                alt="Freshly harvested microgreen trays being packed cleanly at Nutrileaf"
                fallbackTitle="Harvest & Packing Table"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-heading text-3xl font-bold text-forest-800">
              Growing, packing, and selling under one roof
            </h2>
            <p className="mt-4 text-forest-600 leading-relaxed">
              Based in Dindigul, Tamil Nadu, Nutrileaf manages every stage of our
              microgreens in-house—from untreated seed selection and coco-coir
              hydration to clean indoor harvest and direct local delivery. Keeping
              all four steps together eliminates long cold-chain storage.
            </p>
            <p className="mt-4 text-forest-600 leading-relaxed">
              We cultivate twelve core varieties—radish, sunflower, pea shoots,
              mustard, red amaranthus, broccoli, cabbage, coriander, fenugreek,
              beetroot, wheatgrass, and basil—for families, gyms, restaurants,
              hotels, cafes, supermarkets, and organic stores.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm font-medium text-forest-800 border-t border-forest-800/10 pt-5">
              <li>01. Grown locally in Dindigul with food-grade coco-coir</li>
              <li>02. Sanitized harvest shears and breathable food-safe punnets</li>
              <li>03. Direct grower communication on WhatsApp for custom schedules</li>
            </ul>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="bg-forest-800 hover:bg-forest-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Explore All 12 Varieties
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-100 border-y border-forest-800/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-forest-800 text-center">
            Nutrileaf at a glance
          </h2>
          <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FARM_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-forest-800/10 p-6 text-center"
              >
                <dd className="font-heading text-3xl font-bold text-forest-800 tabular-nums">
                  {stat.value}
                </dd>
                <dt className="text-xs font-medium text-forest-600 mt-2">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
