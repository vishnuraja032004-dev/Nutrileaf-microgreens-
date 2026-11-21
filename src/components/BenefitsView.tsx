import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  BENEFIT_PILLARS,
  BenefitGoal,
  MICROGREEN_PRODUCTS,
  MicrogreenProduct,
  PackOption,
} from '../data/microgreens';
import { filterProductsByGoal } from '../utils/catalog';
import { SafeImage } from './SafeImage';

interface BenefitsViewProps {
  onAddToBasket: (product: MicrogreenProduct, pack: PackOption) => void;
  onInspectProduct: (product: MicrogreenProduct) => void;
}

const GOAL_OPTIONS: { id: BenefitGoal; label: string }[] = [
  { id: 'immunity', label: 'Immunity & Antioxidants' },
  { id: 'fitness', label: 'Fitness & Protein' },
  { id: 'culinary', label: 'Gourmet Plating' },
  { id: 'family', label: 'Everyday Family' },
];

export function BenefitsView({
  onAddToBasket,
  onInspectProduct,
}: BenefitsViewProps) {
  const [selectedGoal, setSelectedGoal] = useState<BenefitGoal>('immunity');
  const matchingProducts = filterProductsByGoal(
    MICROGREEN_PRODUCTS,
    selectedGoal
  );

  return (
    <div>
      <section className="bg-forest-900 text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-wider text-leaf-300">
            Nutrition & Kitchen Benefits
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-3">
            Why microgreens belong on every plate
          </h1>
          <p className="mt-4 text-cream-100/85 text-base sm:text-lg max-w-2xl mx-auto">
            Harvested at peak young leaf stage for concentrated vitamins, bright
            flavor, and zero kitchen waste.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFIT_PILLARS.map((item) => (
            <div
              key={item.index}
              className="bg-white rounded-xl border border-forest-800/10 p-6"
            >
              <span className="text-xs font-semibold text-leaf-700 tabular-nums">
                {item.index}.
              </span>
              <h2 className="font-heading text-xl font-bold text-forest-800 mt-2">
                {item.title}
              </h2>
              <p className="mt-2.5 text-sm text-forest-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-100 border-y border-forest-800/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-forest-800/10">
            <div>
              <p className="text-xs font-semibold tracking-wider text-leaf-700">
                Pairing Guide
              </p>
              <h2 className="font-heading text-3xl font-bold text-forest-800 mt-2">
                Match varieties to your goal
              </h2>
            </div>
            <div
              role="tablist"
              aria-label="Select nutrition or culinary goal"
              className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-forest-800/10"
            >
              {GOAL_OPTIONS.map((goal) => {
                const active = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-forest-800 text-white'
                        : 'text-forest-700 hover:bg-cream-100'
                    }`}
                  >
                    {goal.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingProducts.map((product) => {
              const familyPack = product.packs[1];
              return (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl border border-forest-800/10 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/3] bg-cream-100 overflow-hidden">
                    <SafeImage
                      src={product.image}
                      alt={product.imageDescription}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-forest-600">
                      {product.categoryLabel} · {product.harvestDays}
                    </p>
                    <h3 className="font-heading text-xl font-bold text-forest-800 mt-1">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-forest-700 font-medium">
                      {product.nutritionHighlight}
                    </p>
                    <p className="mt-2 text-xs text-forest-600 flex-1">
                      Best with: {product.culinaryUses.join(', ')}
                    </p>
                    <div className="mt-5 pt-4 border-t border-forest-800/10 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onAddToBasket(product, familyPack)}
                        className="inline-flex items-center gap-1.5 bg-leaf-500 hover:bg-leaf-400 text-forest-900 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Add {familyPack.id} (₹{familyPack.priceInr})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onInspectProduct(product)}
                        className="text-xs font-semibold text-forest-700 hover:text-forest-900 whitespace-nowrap"
                      >
                        Full Notes
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
