import { ArrowRight } from 'lucide-react';
import {
  CUSTOMER_SEGMENTS,
  HERO_IMAGE,
  MICROGREEN_PRODUCTS,
  MicrogreenProduct,
  ViewId,
  WHATSAPP_NUMBER,
  WHY_CHOOSE_PILLARS,
} from '../data/microgreens';
import { buildWhatsAppUrl } from '../utils/catalog';
import { SafeImage } from './SafeImage';

interface HomeViewProps {
  onNavigate: (view: ViewId) => void;
  onInspectProduct: (product: MicrogreenProduct) => void;
}

const FEATURED_IDS = ['radish', 'sunflower', 'red-amaranthus'];

export function HomeView({ onNavigate, onInspectProduct }: HomeViewProps) {
  const featuredProducts = MICROGREEN_PRODUCTS.filter((p) =>
    FEATURED_IDS.includes(p.id)
  );
  const directWhatsAppUrl = buildWhatsAppUrl(
    'Hello Nutrileaf Microgreens (Dindigul), I would like to place a fresh microgreens order.',
    WHATSAPP_NUMBER
  );

  return (
    <div>
      <section
        aria-label="Hero"
        className="relative overflow-hidden bg-forest-900 text-white"
      >
        <div className="absolute inset-0 leaf-mesh pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium tracking-wide text-leaf-300 mb-4">
                Dindigul, Tamil Nadu · Direct from Grower
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                Fresh Nutrition.{' '}
                <span className="text-leaf-400">Naturally Grown.</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-cream-100/85 max-w-xl leading-relaxed">
                Nutrileaf Microgreens grows, packs, and delivers crisp, pesticide-free
                microgreens straight from our protected farm in Dindigul to homes,
                gyms, restaurants, cafes, and organic retail counters.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="inline-flex items-center gap-2 bg-leaf-500 hover:bg-leaf-400 text-forest-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-300"
                >
                  <span>Browse 12 Varieties</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-300"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] lg:min-h-[380px] rounded-2xl overflow-hidden border border-white/15 bg-forest-800">
                <SafeImage
                  src={HERO_IMAGE}
                  alt="Fresh green microgreens growing in trays at Nutrileaf farm in Dindigul"
                  fallbackTitle="Nutrileaf Farm Harvest"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <dl className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <dt className="text-xs text-leaf-300 font-medium">Varieties Grown</dt>
              <dd className="font-heading text-2xl sm:text-3xl font-bold text-white tabular-nums mt-1">
                12 Microgreens
              </dd>
            </div>
            <div>
              <dt className="text-xs text-leaf-300 font-medium">Harvest Cycle</dt>
              <dd className="font-heading text-2xl sm:text-3xl font-bold text-white tabular-nums mt-1">
                7–16 Days
              </dd>
            </div>
            <div>
              <dt className="text-xs text-leaf-300 font-medium">Origin</dt>
              <dd className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                Dindigul, TN
              </dd>
            </div>
            <div>
              <dt className="text-xs text-leaf-300 font-medium">Dispatch</dt>
              <dd className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                Same-Day Cut
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-forest-800/10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-leaf-700">
              Harvested Fresh Daily
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-forest-800 mt-2">
              Signature Nutrileaf varieties
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 hover:text-leaf-700 transition-colors self-start md:self-auto whitespace-nowrap shrink-0"
          >
            <span>View all 12 microgreens</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-2xl border border-forest-800/10 overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-cream-100">
                <SafeImage
                  src={product.image}
                  alt={product.imageDescription}
                  fallbackTitle={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs text-forest-600">
                  {product.categoryLabel} · {product.harvestDays}
                </p>
                <h3 className="font-heading text-xl font-bold text-forest-800 mt-1.5">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-forest-600 leading-relaxed flex-1">
                  {product.shortDesc}
                </p>
                <div className="mt-5 pt-4 border-t border-forest-800/10 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-forest-800 tabular-nums">
                    From ₹{product.packs[0].priceInr} / {product.packs[0].id}
                  </span>
                  <button
                    type="button"
                    onClick={() => onInspectProduct(product)}
                    className="text-sm font-semibold text-leaf-700 hover:text-forest-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    Inspect & Order
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream-100 border-y border-forest-800/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-leaf-700">
              Why Nutrileaf
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-forest-800 mt-2">
              Freshness you can see, quality you can trust
            </h2>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="pt-5 border-t border-forest-800/15"
              >
                <span className="text-xs font-semibold text-leaf-700 tabular-nums">
                  {pillar.index}.
                </span>
                <h3 className="font-heading text-xl font-bold text-forest-800 mt-2">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm text-forest-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-leaf-700">
            Who We Serve
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-forest-800 mt-2">
            Microgreens for every kitchen and counter
          </h2>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CUSTOMER_SEGMENTS.map((segment) => (
            <div
              key={segment.title}
              className="bg-white rounded-xl border border-forest-800/10 p-6"
            >
              <h3 className="font-heading text-xl font-bold text-forest-800">
                {segment.title}
              </h3>
              <p className="mt-2 text-sm text-forest-600 leading-relaxed">
                {segment.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-forest-800 text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold">
              Ready to add fresh greens to your daily menu?
            </h2>
            <p className="mt-2 text-cream-100/85 text-sm sm:text-base">
              Build an itemized basket online or send a bulk enquiry for your
              home, gym, restaurant, or retail store in Dindigul.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="bg-leaf-500 hover:bg-leaf-400 text-forest-900 font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Build Your Order
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="border border-white/25 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Send Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
