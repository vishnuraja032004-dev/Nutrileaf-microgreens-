import { useEffect, useState } from 'react';
import { AboutView } from './components/AboutView';
import { BenefitsView } from './components/BenefitsView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { Navbar } from './components/Navbar';
import { OrderDrawer } from './components/OrderDrawer';
import { ProductModal } from './components/ProductModal';
import { ProductsView } from './components/ProductsView';
import { MicrogreenProduct, PackOption, ViewId } from './data/microgreens';
import { calculateCartTotals, CartItem } from './utils/catalog';

const VALID_VIEWS: ViewId[] = ['home', 'about', 'products', 'benefits', 'contact'];

function resolveInitialView(): ViewId {
  const hash = window.location.hash.replace('#', '') as ViewId;
  return VALID_VIEWS.includes(hash) ? hash : 'home';
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>(resolveInitialView);
  const [basketItems, setBasketItems] = useState<CartItem[]>([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] =
    useState<MicrogreenProduct | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setActiveView(resolveInitialView());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (!addedNotice) return;
    const timer = window.setTimeout(() => setAddedNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [addedNotice]);

  const handleNavigate = (view: ViewId) => {
    setActiveView(view);
    if (window.location.hash !== `#${view}`) {
      window.history.replaceState(null, '', `#${view}`);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleAddToBasket = (
    product: MicrogreenProduct,
    pack: PackOption
  ) => {
    setBasketItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product.id && item.packId === pack.id
      );
      if (idx >= 0) {
        return prev.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          packId: pack.id,
          packLabel: pack.label,
          unitPriceInr: pack.priceInr,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setAddedNotice(`Added ${product.name} (${pack.id}) to order basket`);
  };

  const handleUpdateQty = (
    productId: string,
    packId: string,
    delta: number
  ) => {
    setBasketItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.packId === packId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, packId: string) => {
    setBasketItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.packId === packId)
      )
    );
  };

  const totals = calculateCartTotals(basketItems);

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-forest-800">
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        basketCount={totals.totalItems}
        onOpenBasket={() => setBasketOpen(true)}
      />

      <main className="flex-1 pt-16">
        {activeView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onInspectProduct={setInspectedProduct}
          />
        )}
        {activeView === 'about' && <AboutView onNavigate={handleNavigate} />}
        {activeView === 'products' && (
          <ProductsView
            onAddToBasket={handleAddToBasket}
            onInspectProduct={setInspectedProduct}
          />
        )}
        {activeView === 'benefits' && (
          <BenefitsView
            onAddToBasket={handleAddToBasket}
            onInspectProduct={setInspectedProduct}
          />
        )}
        {activeView === 'contact' && <ContactView />}
      </main>

      <Footer onNavigate={handleNavigate} />

      <ProductModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToBasket={handleAddToBasket}
      />

      <OrderDrawer
        open={basketOpen}
        items={basketItems}
        onClose={() => setBasketOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBasket={() => setBasketItems([])}
        onBrowseProducts={() => handleNavigate('products')}
      />

      {addedNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 bg-forest-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-lg border border-white/15 flex items-center gap-3"
        >
          <span>{addedNotice}</span>
          <button
            type="button"
            onClick={() => setBasketOpen(true)}
            className="text-leaf-400 hover:text-leaf-300 font-semibold whitespace-nowrap"
          >
            View Basket
          </button>
        </div>
      )}
    </div>
  );
}
