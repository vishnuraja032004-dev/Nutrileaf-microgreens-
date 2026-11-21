import {
  BenefitGoal,
  FlavorCategory,
  FREE_DELIVERY_THRESHOLD_INR,
  MicrogreenProduct,
  PackOption,
  STANDARD_DELIVERY_FEE_INR,
  WHATSAPP_NUMBER,
} from '../data/microgreens';

export interface CartItem {
  productId: string;
  productName: string;
  packId: PackOption['id'];
  packLabel: string;
  unitPriceInr: number;
  quantity: number;
  image: string;
}

export interface CartTotals {
  totalItems: number;
  subtotalInr: number;
  deliveryFeeInr: number;
  grandTotalInr: number;
  freeDeliveryRemainingInr: number;
  qualifiesForFreeDelivery: boolean;
}

export interface EnquiryFormInput {
  name: string;
  phone: string;
  customerType: string;
  selectedVarieties: string[];
  message: string;
}

export interface EnquiryValidationErrors {
  name?: string;
  phone?: string;
  customerType?: string;
  message?: string;
}

export function filterProducts(
  products: MicrogreenProduct[],
  category: FlavorCategory,
  query: string
): MicrogreenProduct[] {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    const searchable = [
      item.name,
      item.botanicalName,
      item.categoryLabel,
      item.flavorProfile,
      item.shortDesc,
      item.detailedDesc,
      item.nutritionHighlight,
      ...item.culinaryUses,
    ]
      .join(' ')
      .toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}

export function filterProductsByGoal(
  products: MicrogreenProduct[],
  goal: BenefitGoal
): MicrogreenProduct[] {
  return products.filter((item) => item.goals.includes(goal));
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalInr = items.reduce(
    (sum, item) => sum + item.unitPriceInr * item.quantity,
    0
  );
  const qualifiesForFreeDelivery = subtotalInr >= FREE_DELIVERY_THRESHOLD_INR;
  const deliveryFeeInr =
    items.length === 0
      ? 0
      : qualifiesForFreeDelivery
        ? 0
        : STANDARD_DELIVERY_FEE_INR;
  const freeDeliveryRemainingInr =
    items.length === 0
      ? FREE_DELIVERY_THRESHOLD_INR
      : Math.max(0, FREE_DELIVERY_THRESHOLD_INR - subtotalInr);

  return {
    totalItems,
    subtotalInr,
    deliveryFeeInr,
    grandTotalInr: subtotalInr + deliveryFeeInr,
    freeDeliveryRemainingInr,
    qualifiesForFreeDelivery,
  };
}

export function formatWhatsAppOrderMessage(
  items: CartItem[],
  customerNote = ''
): string {
  if (items.length === 0) {
    return 'Hello Nutrileaf Microgreens (Dindigul), I would like to enquire about today’s fresh microgreens availability.';
  }

  const totals = calculateCartTotals(items);
  const lines = [
    'Hello Nutrileaf Microgreens (Dindigul),',
    'I would like to place a fresh microgreens order:',
    '',
    ...items.map(
      (item, index) =>
        `${index + 1}. ${item.productName} (${item.packLabel}) x ${item.quantity} = ₹${item.unitPriceInr * item.quantity}`
    ),
    '',
    `Subtotal: ₹${totals.subtotalInr}`,
    `Delivery: ${totals.deliveryFeeInr === 0 ? 'Free (Dindigul)' : `₹${totals.deliveryFeeInr}`}`,
    `Total: ₹${totals.grandTotalInr}`,
  ];

  const cleanNote = customerNote.trim();
  if (cleanNote) {
    lines.push('', `Delivery Note: ${cleanNote}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string, phone = WHATSAPP_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function validateEnquiryForm(
  input: EnquiryFormInput
): EnquiryValidationErrors {
  const errors: EnquiryValidationErrors = {};

  if (input.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const digitsOnly = input.phone.replace(/\D/g, '');
  const normalizedDigits =
    digitsOnly.length === 12 && digitsOnly.startsWith('91')
      ? digitsOnly.slice(2)
      : digitsOnly;

  if (!/^[6-9]\d{9}$/.test(normalizedDigits)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (!input.customerType.trim()) {
    errors.customerType = 'Please select your customer category.';
  }

  if (
    input.selectedVarieties.length === 0 &&
    input.message.trim().length < 5
  ) {
    errors.message =
      'Select at least one microgreen variety or share brief order details.';
  }

  return errors;
}

export function formatEnquiryWhatsAppMessage(input: EnquiryFormInput): string {
  const varietiesText =
    input.selectedVarieties.length > 0
      ? input.selectedVarieties.join(', ')
      : 'General enquiry';
  const lines = [
    'Hello Nutrileaf Microgreens (Dindigul),',
    `Name: ${input.name.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Category: ${input.customerType.trim()}`,
    `Varieties: ${varietiesText}`,
  ];
  if (input.message.trim()) {
    lines.push(`Details: ${input.message.trim()}`);
  }
  return lines.join('\n');
}
