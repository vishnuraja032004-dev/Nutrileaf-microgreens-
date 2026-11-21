import { useEffect, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { MicrogreenProduct, PackOption } from '../data/microgreens';
import { buildWhatsAppUrl } from '../utils/catalog';
import { SafeImage } from './SafeImage';

interface ProductModalProps {
  product: MicrogreenProduct | null;
  onClose: () => void;
  onAddToBasket: (product: MicrogreenProduct, pack: PackOption) => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToBasket,
}: ProductModalProps) {
  const [selectedPackId, setSelectedPackId] = useState<PackOption['id']>('100g');

  useEffect(() => {
    setSelectedPackId('100g');
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activePack =
    product.packs.find((p) => p.id === selectedPackId) ?? product.packs[1];

  const directWaUrl = buildWhatsAppUrl(
    `Hello Nutrileaf Microgreens (Dindigul), I would like to order ${product.name} (${activePack.label} - ₹${activePack.priceInr}).`
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="bg-cream-50 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-forest-800/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-5 bg-cream-100 min-h-[240px]">
            <SafeImage
              src={product.image}
              alt={product.imageDescription}
              fallbackTitle={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-forest-600">
                  {product.categoryLabel} · Harvested in {product.harvestDays}
                </p>
                <h2
                  id="modal-product-title"
                  className="font-heading text-2xl sm:text-3xl font-bold text-forest-800 mt-1"
                >
                  {product.name}
                </h2>
                <p className="text-xs italic text-forest-600 mt-0.5">
                  {product.botanicalName}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close product details"
                className="w-9 h-9 rounded-lg grid place-items-center text-forest-700 hover:bg-forest-800/10 transition-colors shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 text-sm text-forest-700 leading-relaxed">
              {product.detailedDesc}
            </p>

            <dl className="mt-5 space-y-3 text-sm border-t border-forest-800/10 pt-4">
              <div>
                <dt className="text-xs font-semibold text-forest-800">
                  Flavor Profile
                </dt>
                <dd className="text-forest-600 mt-0.5">{product.flavorProfile}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-forest-800">
                  Nutritional Highlights
                </dt>
                <dd className="text-forest-600 mt-0.5">
                  {product.nutritionHighlight}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-forest-800">
                  Ideal Culinary Uses
                </dt>
                <dd className="text-forest-600 mt-0.5">
                  {product.culinaryUses.join(' · ')}
                </dd>
              </div>
            </dl>

            <div className="mt-5 pt-4 border-t border-forest-800/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-forest-800">
                  Select Pack Weight
                </span>
                <span className="text-lg font-bold text-forest-800 tabular-nums">
                  ₹{activePack.priceInr}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.packs.map((pack) => {
                  const selected = activePack.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setSelectedPackId(pack.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors tabular-nums whitespace-nowrap ${
                        selected
                          ? 'bg-forest-800 text-white border-forest-800'
                          : 'bg-white text-forest-700 border-forest-800/15 hover:border-forest-800/40'
                      }`}
                    >
                      {pack.id} · ₹{pack.priceInr}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  onAddToBasket(product, activePack);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-leaf-500 hover:bg-leaf-400 text-forest-900 font-semibold text-sm py-3 px-5 rounded-lg transition-colors whitespace-nowrap"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add {activePack.id} to Basket</span>
              </button>
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-forest-800/20 hover:bg-forest-800/5 text-forest-800 font-semibold text-sm py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
              >
                Quick WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
