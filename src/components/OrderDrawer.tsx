import { useEffect, useState } from 'react';
import { MessageCircle, Minus, Plus, Trash2, X } from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD_INR } from '../data/microgreens';
import {
  buildWhatsAppUrl,
  calculateCartTotals,
  CartItem,
  formatWhatsAppOrderMessage,
} from '../utils/catalog';
import { SafeImage } from './SafeImage';

interface OrderDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, packId: string, delta: number) => void;
  onRemoveItem: (productId: string, packId: string) => void;
  onClearBasket: () => void;
  onBrowseProducts: () => void;
}

export function OrderDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearBasket,
  onBrowseProducts,
}: OrderDrawerProps) {
  const [deliveryNote, setDeliveryNote] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const totals = calculateCartTotals(items);
  const waMessage = formatWhatsAppOrderMessage(items, deliveryNote);
  const waUrl = buildWhatsAppUrl(waMessage);

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-900/60 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Order Basket"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-cream-50 h-full flex flex-col border-l border-forest-800/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-forest-900 text-white flex items-center justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold">Order Basket</h2>
            <p className="text-xs text-cream-100/80 tabular-nums">
              {totals.totalItems} {totals.totalItems === 1 ? 'pack' : 'packs'}{' '}
              selected
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order basket"
            className="w-9 h-9 rounded-lg grid place-items-center text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-heading text-xl font-bold text-forest-800">
                Your basket is empty
              </p>
              <p className="mt-2 text-sm text-forest-600">
                Add fresh microgreen punnets from our 7 Dindigul varieties to
                build a WhatsApp order.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseProducts();
                }}
                className="mt-6 bg-forest-800 hover:bg-forest-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
              >
                Browse Varieties
              </button>
            </div>
          ) : (
            <>
              <div className="bg-forest-50 border border-forest-800/10 rounded-xl px-4 py-3 text-xs text-forest-800">
                {totals.qualifiesForFreeDelivery ? (
                  <span className="font-semibold text-leaf-700">
                    Free Dindigul delivery unlocked (orders ₹
                    {FREE_DELIVERY_THRESHOLD_INR}+).
                  </span>
                ) : (
                  <span>
                    Add{' '}
                    <span className="font-semibold tabular-nums">
                      ₹{totals.freeDeliveryRemainingInr}
                    </span>{' '}
                    more for free delivery in Dindigul.
                  </span>
                )}
              </div>

              <ul className="divide-y divide-forest-800/10">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.packId}`}
                    className="py-4 flex gap-3.5"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream-100 shrink-0">
                      <SafeImage
                        src={item.image}
                        alt={item.productName}
                        fallbackTitle={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-sm text-forest-800 truncate">
                            {item.productName}
                          </h3>
                          <p className="text-xs text-forest-600">
                            {item.packLabel} · ₹{item.unitPriceInr}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            onRemoveItem(item.productId, item.packId)
                          }
                          aria-label={`Remove ${item.productName} ${item.packId}`}
                          className="text-forest-600 hover:text-red-700 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="inline-flex items-center border border-forest-800/15 rounded-lg bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.productId, item.packId, -1)
                            }
                            aria-label={`Decrease ${item.productName} quantity`}
                            className="w-8 h-8 grid place-items-center text-forest-700 hover:bg-cream-100 rounded-l-lg"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span
                            data-testid={`qty-${item.productId}-${item.packId}`}
                            className="w-8 text-center text-xs font-semibold text-forest-800 tabular-nums"
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.productId, item.packId, 1)
                            }
                            aria-label={`Increase ${item.productName} quantity`}
                            className="w-8 h-8 grid place-items-center text-forest-700 hover:bg-cream-100 rounded-r-lg"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-forest-800 tabular-nums">
                          ₹{item.unitPriceInr * item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div>
                <label
                  htmlFor="basket-note"
                  className="block text-xs font-semibold text-forest-800 mb-1.5"
                >
                  Dindigul Address / Timing Note (Optional)
                </label>
                <textarea
                  id="basket-note"
                  rows={2}
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="e.g. Morning delivery near Begambur, Dindigul"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-forest-800/15 bg-white text-forest-800"
                />
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-forest-800/10 space-y-4">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-forest-600">
                <dt>Subtotal</dt>
                <dd className="tabular-nums font-medium">
                  ₹{totals.subtotalInr}
                </dd>
              </div>
              <div className="flex justify-between text-forest-600">
                <dt>Dindigul Delivery</dt>
                <dd className="tabular-nums font-medium">
                  {totals.deliveryFeeInr === 0
                    ? 'Free'
                    : `₹${totals.deliveryFeeInr}`}
                </dd>
              </div>
              <div className="flex justify-between text-forest-800 font-bold text-base pt-2 border-t border-forest-800/10">
                <dt>Estimated Total</dt>
                <dd data-testid="basket-total" className="tabular-nums">
                  ₹{totals.grandTotalInr}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-leaf-500 hover:bg-leaf-400 text-forest-900 font-semibold text-sm py-3 px-4 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Send Order on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={onClearBasket}
                className="text-xs font-medium text-forest-600 hover:text-forest-800 py-1.5"
              >
                Clear Basket
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
