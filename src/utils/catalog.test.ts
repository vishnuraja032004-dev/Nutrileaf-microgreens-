import test from 'node:test';
import assert from 'node:assert/strict';
import { MICROGREEN_PRODUCTS } from '../data/microgreens';
import {
  buildWhatsAppUrl,
  calculateCartTotals,
  filterProducts,
  filterProductsByGoal,
  formatWhatsAppOrderMessage,
  validateEnquiryForm,
} from './catalog';

test('filterProducts returns all 12 varieties for all + empty query', () => {
  const result = filterProducts(MICROGREEN_PRODUCTS, 'all', '');
  assert.equal(result.length, 12);
});

test('filterProducts filters by flavor category and search query', () => {
  const spicy = filterProducts(MICROGREEN_PRODUCTS, 'spicy', '');
  assert.equal(spicy.length, 2);
  assert.deepEqual(
    spicy.map((p) => p.id),
    ['radish', 'mustard']
  );

  const herbal = filterProducts(MICROGREEN_PRODUCTS, 'herbal', '');
  assert.equal(herbal.length, 3);
  assert.deepEqual(
    herbal.map((p) => p.id),
    ['coriander', 'fenugreek', 'basil']
  );

  const searchBroccoli = filterProducts(MICROGREEN_PRODUCTS, 'all', 'sulforaphane');
  assert.equal(searchBroccoli.length, 1);
  assert.equal(searchBroccoli[0].id, 'broccoli');

  const searchWheatgrass = filterProducts(MICROGREEN_PRODUCTS, 'all', 'chlorophyll');
  assert.equal(searchWheatgrass.length, 1);
  assert.equal(searchWheatgrass[0].id, 'wheatgrass');
});

test('filterProductsByGoal matches varieties for fitness goal', () => {
  const fitnessItems = filterProductsByGoal(MICROGREEN_PRODUCTS, 'fitness');
  assert.ok(fitnessItems.some((item) => item.id === 'sunflower'));
  assert.ok(fitnessItems.some((item) => item.id === 'broccoli'));
});

test('calculateCartTotals handles empty cart, delivery fee, and free delivery threshold', () => {
  const empty = calculateCartTotals([]);
  assert.equal(empty.totalItems, 0);
  assert.equal(empty.grandTotalInr, 0);
  assert.equal(empty.deliveryFeeInr, 0);

  const underThreshold = calculateCartTotals([
    {
      productId: 'radish',
      productName: 'Radish Microgreens',
      packId: '100g',
      packLabel: '100g Family Pack',
      unitPriceInr: 145,
      quantity: 2,
      image: '/img.jpg',
    },
  ]);
  assert.equal(underThreshold.subtotalInr, 290);
  assert.equal(underThreshold.deliveryFeeInr, 40);
  assert.equal(underThreshold.grandTotalInr, 330);
  assert.equal(underThreshold.qualifiesForFreeDelivery, false);
  assert.equal(underThreshold.freeDeliveryRemainingInr, 209);

  const overThreshold = calculateCartTotals([
    {
      productId: 'broccoli',
      productName: 'Broccoli Microgreens',
      packId: '250g',
      packLabel: '250g Kitchen Pack',
      unitPriceInr: 390,
      quantity: 2,
      image: '/img.jpg',
    },
  ]);
  assert.equal(overThreshold.subtotalInr, 780);
  assert.equal(overThreshold.deliveryFeeInr, 0);
  assert.equal(overThreshold.grandTotalInr, 780);
  assert.equal(overThreshold.qualifiesForFreeDelivery, true);
});

test('formatWhatsAppOrderMessage and buildWhatsAppUrl format clean order text', () => {
  const msg = formatWhatsAppOrderMessage(
    [
      {
        productId: 'sunflower',
        productName: 'Sunflower Microgreens',
        packId: '100g',
        packLabel: '100g Family Pack',
        unitPriceInr: 155,
        quantity: 1,
        image: '/img.jpg',
      },
    ],
    'Deliver before 8 AM'
  );
  assert.match(msg, /Sunflower Microgreens/);
  assert.match(msg, /Total: ₹195/);
  assert.match(msg, /Deliver before 8 AM/);

  const url = buildWhatsAppUrl(msg);
  assert.ok(url.startsWith('https://wa.me/919629534728?text='));
});

test('validateEnquiryForm catches missing fields and accepts valid Dindigul enquiry', () => {
  const invalid = validateEnquiryForm({
    name: '',
    phone: '12345',
    customerType: '',
    selectedVarieties: [],
    message: '',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.phone);
  assert.ok(invalid.customerType);
  assert.ok(invalid.message);

  const valid = validateEnquiryForm({
    name: 'Karthik Sundaram',
    phone: '+91 98765 43210',
    customerType: 'Restaurants & Cafes',
    selectedVarieties: ['Radish Microgreens', 'Broccoli Microgreens'],
    message: '',
  });
  assert.deepEqual(valid, {});
});
