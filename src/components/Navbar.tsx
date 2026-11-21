import { useState } from 'react';
import { Menu, ShoppingBag, Sprout, X } from 'lucide-react';
import { ViewId } from '../data/microgreens';

interface NavbarProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
  basketCount: number;
  onOpenBasket: () => void;
}

const NAV_ITEMS: { id: ViewId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({
  activeView,
  onNavigate,
  basketCount,
  onOpenBasket,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (view: ViewId) => {
    setMobileOpen(false);
    onNavigate(view);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-forest-900/95 backdrop-blur-md border-b border-white/10">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('home');
          }}
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 rounded-md"
        >
          <span className="w-8 h-8 rounded-full bg-leaf-500 grid place-items-center shrink-0">
            <Sprout className="w-4 h-4 text-forest-900" aria-hidden="true" />
          </span>
          <span className="font-heading text-xl font-bold text-white tracking-tight">
            Nutrileaf
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-cream-100">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400 rounded-sm ${
                    isActive
                      ? 'text-leaf-400 font-semibold'
                      : 'text-cream-100/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-1 h-0.5 bg-leaf-400 transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBasket}
            aria-label={
              basketCount > 0
                ? `Open order basket with ${basketCount} items`
                : 'Open order basket'
            }
            className="hidden sm:inline-flex items-center gap-2 bg-leaf-500 hover:bg-leaf-400 text-forest-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-300"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Order Basket</span>
            {basketCount > 0 && (
              <span
                data-testid="basket-count"
                className="tabular-nums bg-forest-900 text-white text-xs font-bold px-1.5 py-0.5 rounded"
              >
                {basketCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden w-10 h-10 grid place-items-center rounded-lg text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-400"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-forest-900 border-t border-white/10 px-4 py-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelect(item.id);
                    }}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-forest-800 text-leaf-400 font-semibold'
                        : 'text-cream-100 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBasket();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-leaf-500 text-forest-900 font-semibold text-sm py-2.5 px-4 rounded-lg"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>
                  Order Basket{basketCount > 0 ? ` (${basketCount})` : ''}
                </span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
