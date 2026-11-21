import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import {
  FlavorCategory,
  MICROGREEN_PRODUCTS,
  MicrogreenProduct,
  PackOption,
} from '../data/microgreens';
import { filterProducts } from '../utils/catalog';
import { SafeImage } from './SafeImage';

interface ProductsViewProps {
  onAddToBasket: (product: MicrogreenProduct, pack: PackOption) => void;
  onInspectProduct: (product: MicrogreenProduct) => void;
}

const FILTER_TABS: { id: FlavorCategory; label: string }[] = [
  { id: 'all', label: 'All Varieties' },
  { id: 'mild', label: 'Mild & Sweet' },
  { id: 'crisp', label: 'Crisp & Nutty' },
  { id: 'spicy', label: 'Bold & Spicy' },
  { id: 'herbal', label: 'Aromatic Herbs' },
];

export function ProductsView({
  onAddToBasket,
  onInspectProduct,
}: ProductsViewProps) {
  const [category, setCategory] = useState<FlavorCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPacks, setSelectedPacks] = useState<
    Record<string, PackOption['id']>
  >({});

  const visibleProducts = filterProducts(
    MICROGREEN_PRODUCTS,
    category,
    searchQuery
  );

  const getActivePack = (product: MicrogreenProduct): PackOption => {
    const chosenId = selectedPacks[product.id] ?? '100g';
    return (
      product.packs.find((p) => p.id === chosenId) ?? product.packs[1]
    );
  };

  return (
    <div>
      <section className="bg-forest-900 text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold tracking-wider text-leaf-300">
            Fresh Harvest Catalog
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-3">
            Twelve microgreens grown fresh in Dindigul
          </h1>
          <p className="mt-4 text-cream-100/85 text-base sm:text-lg max-w-2xl mx-auto">
            Select a pack weight and add varieties to your order basket for direct
            WhatsApp checkout.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-forest-800/10">
          <div
            role="tablist"
            aria-label="Filter microgreens by flavor"
            className="grid grid-cols-2 sm:inline-flex items-center gap-1.5 bg-cream-100 p-1 rounded-xl border border-forest-800/10 w-full sm:w-auto"
          >
            {FILTER_TABS.map((tab, idx) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap text-center ${
                    idx === 0 ? 'col-span-2 sm:col-span-1' : ''
                  } ${
                    active
                      ? 'bg-forest-800 text-white'
                      : 'text-forest-700 hover:text-forest-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 sm:w-72">
              <label htmlFor="product-search" className="sr-only">
                Search microgreens by name, flavor, or dish
              </label>
              <Search
                className="w-4 h-4 text-forest-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search variety, flavor, or dish..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-forest-800/15 rounded-lg text-forest-800 placeholder:text-forest-600/60 focus:outline-none focus:border-leaf-600 focus:ring-2 focus:ring-leaf-500/20"
              />
            </div>
            <span
              data-testid="product-count"
              className="text-xs font-semibold text-forest-600 tabular-nums whitespace-nowrap shrink-0"
            >
              {visibleProducts.length} of {MICROGREEN_PRODUCTS.length} shown
            </span>
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="mt-12 bg-white rounded-2xl border border-forest-800/10 p-12 text-center">
            <h2 className="font-heading text-2xl font-bold text-forest-800">
              No matching microgreens found
            </h2>
            <p className="mt-2 text-sm text-forest-600">
              Try clearing your search term or switching back to all varieties.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('all');
                setSearchQuery('');
              }}
              className="mt-5 bg-forest-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-forest-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            data-testid="products-grid"
            className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {visibleProducts.map((product) => {
              const activePack = getActivePack(product);
              return (
                <article
                  key={product.id}
                  data-testid={`product-card-${product.id}`}
                  className="group bg-white rounded-2xl border border-forest-800/10 overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => onInspectProduct(product)}
                    aria-label={`View full details for ${product.name}`}
                    className="aspect-[4/3] overflow-hidden bg-cream-100 block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-600"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.imageDescription}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-forest-600">
                      {product.categoryLabel} · {product.harvestDays}
                    </p>
                    <div className="mt-1.5 flex items-baseline justify-between gap-3">
                      <h2 className="font-heading text-xl font-bold text-forest-800">
                        {product.name}
                      </h2>
                      <span className="text-base font-bold text-forest-800 tabular-nums shrink-0">
                        ₹{activePack.priceInr}
                      </span>
                    </div>
                    <p className="text-xs italic text-forest-600 mt-0.5">
                      {product.botanicalName}
                    </p>
                    <p className="mt-3 text-sm text-forest-600 leading-relaxed flex-1">
                      {product.shortDesc}
                    </p>

                    <div className="mt-4 pt-4 border-t border-forest-800/10">
                      <p className="text-xs font-medium text-forest-700 mb-2">
                        Pack Size
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {product.packs.map((pack) => {
                          const isSelected = activePack.id === pack.id;
                          return (
                            <button
                              key={pack.id}
                              type="button"
                              onClick={() =>
                                setSelectedPacks((prev) => ({
                                  ...prev,
                                  [product.id]: pack.id,
                                }))
                              }
                              aria-pressed={isSelected}
                              className={`py-1.5 px-2 rounded-md text-xs font-semibold tabular-nums border transition-colors whitespace-nowrap ${
                                isSelected
                                  ? 'bg-forest-800 text-white border-forest-800'
                                  : 'bg-cream-50 text-forest-700 border-forest-800/15 hover:border-forest-800/40'
                              }`}
                            >
                              {pack.id}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onAddToBasket(product, activePack)}
                        aria-label={`Add ${product.name} ${activePack.id} to basket`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-leaf-500 hover:bg-leaf-400 text-forest-900 font-semibold text-sm py-2.5 px-4 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Add to Basket</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onInspectProduct(product)}
                        aria-label={`Details for ${product.name}`}
                        className="px-3.5 py-2.5 text-sm font-medium text-forest-800 border border-forest-800/15 hover:bg-cream-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
