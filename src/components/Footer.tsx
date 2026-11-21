import { CONTACT_PHONES, ViewId } from '../data/microgreens';

interface FooterProps {
  onNavigate: (view: ViewId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-forest-900 text-cream-100 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 border-b border-white/10">
          <div>
            <p className="font-heading text-xl font-bold text-white">
              Nutrileaf Microgreens
            </p>
            <p className="mt-2 text-sm text-cream-100/75 max-w-xs leading-relaxed">
              Fresh Nutrition. Naturally Grown. Cultivated, packed, and sold
              directly from Dindigul, Tamil Nadu.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-leaf-300 mb-3">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'products', label: 'Products' },
                { id: 'benefits', label: 'Benefits' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id as ViewId);
                    }}
                    className="text-cream-100/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-leaf-300 mb-3">
              Dindigul Direct Sales
            </p>
            <p className="text-sm text-cream-100/80">Dindigul, Tamil Nadu, India</p>
            <div className="mt-1.5 space-y-1 text-sm text-cream-100/80 tabular-nums">
              {CONTACT_PHONES.map((entry) => (
                <p key={entry.raw}>
                  <a
                    href={`tel:+${entry.raw}`}
                    className="hover:text-white transition-colors"
                  >
                    {entry.display}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-100/60">
          <p>© {new Date().getFullYear()} Nutrileaf Microgreens. All rights reserved.</p>
          <p>Fresh Harvest · Direct Grower Supply</p>
        </div>
      </div>
    </footer>
  );
}
