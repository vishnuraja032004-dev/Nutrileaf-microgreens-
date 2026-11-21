export type ViewId = 'home' | 'about' | 'products' | 'benefits' | 'contact';

export type FlavorCategory = 'all' | 'mild' | 'crisp' | 'spicy' | 'herbal';

export type BenefitGoal = 'immunity' | 'fitness' | 'culinary' | 'family';

export interface PackOption {
  id: '50g' | '100g' | '250g';
  label: string;
  weightGrams: number;
  priceInr: number;
}

export interface MicrogreenProduct {
  id: string;
  name: string;
  botanicalName: string;
  category: Exclude<FlavorCategory, 'all'>;
  categoryLabel: string;
  flavorProfile: string;
  harvestDays: string;
  shortDesc: string;
  detailedDesc: string;
  nutritionHighlight: string;
  culinaryUses: string[];
  goals: BenefitGoal[];
  image: string;
  imageDescription: string;
  packs: PackOption[];
}

export const WHATSAPP_NUMBER = '919629534728';
export const DISPLAY_PHONE = '+91 96295 34728';
export const SECONDARY_WHATSAPP_NUMBER = '918148587637';
export const SECONDARY_DISPLAY_PHONE = '+91 81485 87637';
export const CONTACT_PHONES = [
  { raw: WHATSAPP_NUMBER, display: DISPLAY_PHONE },
  { raw: SECONDARY_WHATSAPP_NUMBER, display: SECONDARY_DISPLAY_PHONE },
] as const;
export const FREE_DELIVERY_THRESHOLD_INR = 499;
export const STANDARD_DELIVERY_FEE_INR = 40;

export const HERO_IMAGE = '/src/assets/images/hero_microgreens_farm_1795259188734.jpg';
export const ABOUT_IMAGE = '/src/assets/images/about_harvest_trays_1795259190013.jpg';

export const MICROGREEN_PRODUCTS: MicrogreenProduct[] = [
  {
    id: 'radish',
    name: 'Radish Microgreens',
    botanicalName: 'Raphanus sativus',
    category: 'spicy',
    categoryLabel: 'Bold & Spicy',
    flavorProfile: 'Crisp peppery bite with fresh radish heat',
    harvestDays: '7–9 Days',
    shortDesc:
      'Vibrant rose-pink stems and crisp green cotyledons that wake up salads, dosas, sandwiches, and rice bowls with clean radish spice.',
    detailedDesc:
      'Grown in coco-coir trays in Dindigul and harvested at 7 to 9 days, Nutrileaf Radish Microgreens feature striking rosy-pink to purple stems topped with bright heart-shaped leaves. They deliver the clean, lively snap of a mature radish in tender raw form without any harsh bitterness.',
    nutritionHighlight: 'Rich in Vitamin C, Vitamin E, folate, potassium, and natural radish enzymes',
    culinaryUses: ['Avocado & egg toast', 'Chaat & wraps', 'Grilled paneer bowls', 'Soups & dosa garnish'],
    goals: ['culinary', 'immunity'],
    image: '/src/assets/images/product_radish_microgreens_1795259192605.jpg',
    imageDescription:
      'Close-up macro shot of dense pink-and-purple stemmed radish microgreens in a harvest tray or ceramic bowl, highlighting water droplets on crisp green cotyledon leaves.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 80 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 145 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 330 },
    ],
  },
  {
    id: 'sunflower',
    name: 'Sunflower Microgreens',
    botanicalName: 'Helianthus annuus',
    category: 'crisp',
    categoryLabel: 'Crisp & Nutty',
    flavorProfile: 'Juicy, nutty crunch reminiscent of fresh sunflower seeds',
    harvestDays: '8–10 Days',
    shortDesc:
      'Thick, succulent stems and broad twin leaves prized by fitness enthusiasts and kitchens alike for a satisfying crunch and mild nuttiness.',
    detailedDesc:
      'Nutrileaf Sunflower Microgreens grow tall with sturdy, juicy stalks and plump emerald seed leaves. Cut fresh right before dispatch, they bring the richness of raw sunflower kernels paired with crisp lettuce-like hydration that holds up well in dressings.',
    nutritionHighlight: 'High plant amino acids, zinc, iron, Vitamin B complex, and Vitamin E',
    culinaryUses: ['Post-workout salads', 'Protein wraps', 'Green smoothies', 'Stir-fry finish'],
    goals: ['fitness', 'family'],
    image: '/src/assets/images/product_sunflower_microgreens_1795259193113.jpg',
    imageDescription:
      'Overhead and side-angle shot of plump, broad-leaved sunflower microgreens arranged in a stoneware bowl on natural linen with harvesting shears beside them.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 85 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 155 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 350 },
    ],
  },
  {
    id: 'pea-shoots',
    name: 'Pea Shoots',
    botanicalName: 'Pisum sativum',
    category: 'mild',
    categoryLabel: 'Mild & Sweet',
    flavorProfile: 'Sweet, crisp spring garden pea flavor',
    harvestDays: '10–12 Days',
    shortDesc:
      'Tender emerald leaves with delicate curly tendrils. Naturally sweet enough for kids and versatile enough for cafe salads and warm noodles.',
    detailedDesc:
      'Harvested when lacy tendrils first unfurl, Nutrileaf Pea Shoots offer the gentle sweetness of freshly shelled green peas. Their approachable flavor and airy volume make them an instant favorite for family meals, cafes, and stir-fries.',
    nutritionHighlight: 'Packed with Vitamin A, Vitamin C, folate, plant protein, and dietary fiber',
    culinaryUses: ['Kids lunchboxes', 'Noodle bowls & soups', 'Sandwich layers', 'Pasta garnish'],
    goals: ['family', 'fitness', 'culinary'],
    image: '/src/assets/images/product_pea_shoots_1795259192976.jpg',
    imageDescription:
      'Bright natural-light photo of delicate green pea shoot microgreens showing signature curly tendrils spilling gently out of a shallow stoneware dish.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 80 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 145 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 330 },
    ],
  },
  {
    id: 'mustard',
    name: 'Mustard Microgreens',
    botanicalName: 'Brassica juncea',
    category: 'spicy',
    categoryLabel: 'Bold & Spicy',
    flavorProfile: 'Zesty, sharp mustard tang with bright aroma',
    harvestDays: '7–9 Days',
    shortDesc:
      'Lively lime-green leaves carrying an unmistakable mustard warmth that cuts cleanly through rich curries, eggs, and grilled dishes.',
    detailedDesc:
      'Small in stature yet bold in character, Nutrileaf Mustard Microgreens bring an authentic mustard-seed zing with a gentle wasabi-like warmth on the finish. Chefs use them to brighten rich sauces, seafood, eggs, and South Indian snacks.',
    nutritionHighlight: 'Concentrated glucosinolates, Vitamin K, beta-carotene, and calcium',
    culinaryUses: ['Omelettes & bhurji', 'South Indian sundal', 'Cheese & hummus toast', 'Seafood plates'],
    goals: ['culinary', 'immunity'],
    image: '/src/assets/images/product_mustard_microgreens_1795259192355.jpg',
    imageDescription:
      'Crisp studio view of vibrant lime-green mustard microgreens with tender white stems spread evenly across a pale ceramic plate.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 75 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 135 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 310 },
    ],
  },
  {
    id: 'red-amaranthus',
    name: 'Red Amaranthus',
    botanicalName: 'Amaranthus tricolor',
    category: 'mild',
    categoryLabel: 'Mild & Sweet',
    flavorProfile: 'Gentle earthy spinach note with mild sweetness',
    harvestDays: '9–11 Days',
    shortDesc:
      'Striking ruby-magenta leaves and stems grown to bring vivid natural plating contrast and gentle iron-rich nutrition to everyday meals.',
    detailedDesc:
      'Grown under bright balanced light to deepen its crimson pigment, Nutrileaf Red Amaranthus adds dramatic jewel-toned color without overpowering delicate dishes. Its silky, mild leaves pair equally well with yogurt bowls and gourmet plates.',
    nutritionHighlight: 'Rich in betalain antioxidants, iron, Vitamin K, and potassium',
    culinaryUses: ['Fine-dining plating', 'Curd rice & poriyal garnish', 'Smoothie bowls', 'Fresh salads'],
    goals: ['culinary', 'family', 'immunity'],
    image: '/src/assets/images/product_red_amaranthus_1795259192167.jpg',
    imageDescription:
      'High-contrast culinary photograph of deep ruby-red and magenta amaranthus microgreens in a speckled stoneware bowl against neutral stone.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 90 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 165 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 380 },
    ],
  },
  {
    id: 'broccoli',
    name: 'Broccoli Microgreens',
    botanicalName: 'Brassica oleracea var. italica',
    category: 'mild',
    categoryLabel: 'Mild & Sweet',
    flavorProfile: 'Clean, mild brassica crunch with zero bitterness',
    harvestDays: '8–10 Days',
    shortDesc:
      'Our most requested daily wellness microgreen. Mild flavor blends effortlessly into idli batters, smoothies, dals, and salads without bitterness.',
    detailedDesc:
      'Nutrileaf Broccoli Microgreens are dense carpets of crisp white stems and emerald cotyledons harvested right at peak phytonutrient potency. Loved by wellness-focused households, they deliver concentrated brassica nutrition in a gentle everyday green.',
    nutritionHighlight: 'Exceptional source of sulforaphane precursors, Vitamin C, and polyphenols',
    culinaryUses: ['Morning smoothies', 'Dal & khichdi topping', 'Grain bowls', 'Everyday salads'],
    goals: ['immunity', 'family', 'fitness'],
    image: '/src/assets/images/product_broccoli_microgreens_1795259192742.jpg',
    imageDescription:
      'Dense emerald-green tray of fresh broccoli microgreens with slender white stems and twin rounded leaves in soft morning daylight.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 95 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 175 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 390 },
    ],
  },
  {
    id: 'cabbage',
    name: 'Cabbage Microgreens',
    botanicalName: 'Brassica oleracea var. capitata',
    category: 'crisp',
    categoryLabel: 'Crisp & Nutty',
    flavorProfile: 'Clean, crisp, slightly sweet brassica finish',
    harvestDays: '8–10 Days',
    shortDesc:
      'Jewel-toned purple and emerald leaves with sturdy crunch that hold their structure in slaws, tacos, wraps, and chilled display counters.',
    detailedDesc:
      'Nutrileaf Cabbage Microgreens blend tender green and violet-tinted stems with a pleasant, mildly sweet crunch. Because their leaves stay buoyant even under light dressings, cafes and retail counters rely on them for fresh wraps and bowls.',
    nutritionHighlight: 'Rich in anthocyanins, Vitamin C, Vitamin E, and natural phytonutrients',
    culinaryUses: ['Coleslaws & wraps', 'Cafe sandwiches', 'Tacos & burgers', 'Chilled salad bars'],
    goals: ['culinary', 'immunity', 'family'],
    image: '/src/assets/images/product_cabbage_microgreens_1795259193049.jpg',
    imageDescription:
      'Fresh purple-veined and bright green cabbage microgreens arranged loosely on a matte ceramic plate over pale travertine stone.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 85 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 155 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 350 },
    ],
  },
  {
    id: 'coriander',
    name: 'Coriander Microgreens',
    botanicalName: 'Coriandrum sativum',
    category: 'herbal',
    categoryLabel: 'Aromatic Herbs',
    flavorProfile: 'Bright, citrusy cilantro aroma with concentrated freshness',
    harvestDays: '14–16 Days',
    shortDesc:
      'Fragrant scalloped leaves delivering bold dhaniya aroma that elevates chutneys, curries, tacos, and South Indian tiffin plates.',
    detailedDesc:
      'Slow-grown for 14 to 16 days in clean coco-coir, Nutrileaf Coriander Microgreens pack far brighter citrus-herb aroma than mature market bunches. Their tender stems are completely edible and zero-prep for kitchens.',
    nutritionHighlight: 'Rich in Vitamin K, Vitamin A, Vitamin C, lutein, and natural antioxidants',
    culinaryUses: ['Chutneys & raita', 'Sambar & rasam finish', 'Tacos & curries', 'Avocado toast'],
    goals: ['culinary', 'family', 'immunity'],
    image: '/src/assets/images/product_coriander_microgreens_1795260080266.jpg',
    imageDescription:
      'Studio photograph of fragrant scalloped green coriander microgreens with slender stems in a cream ceramic dish on warm travertine stone.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 90 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 165 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 375 },
    ],
  },
  {
    id: 'fenugreek',
    name: 'Fenugreek Microgreens',
    botanicalName: 'Trigonella foenum-graecum',
    category: 'herbal',
    categoryLabel: 'Aromatic Herbs',
    flavorProfile: 'Warm, nutty methi flavor with gentle herbal bitterness',
    harvestDays: '7–9 Days',
    shortDesc:
      'Traditional Indian methi microgreens with plump green leaves that pair effortlessly with parathas, dals, curd, and wholesome bowls.',
    detailedDesc:
      'Harvested young before mature bitterness sets in, Nutrileaf Fenugreek (Methi) Microgreens deliver classic roasted-spice warmth and tender crunch. Loved by local Dindigul families for daily rotis, khichdi, and wholesome tiffin bowls.',
    nutritionHighlight: 'Source of plant iron, soluble fiber, saponins, Vitamin C, and magnesium',
    culinaryUses: ['Methi parathas & dosas', 'Dal tadka topping', 'Curd bowls', 'Spiced rice plates'],
    goals: ['family', 'immunity', 'fitness'],
    image: '/src/assets/images/product_fenugreek_microgreens_1795260080307.jpg',
    imageDescription:
      'Fresh crisp fenugreek methi microgreens with rounded green twin leaves and pale tender stems in a speckled stoneware bowl.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 75 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 135 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 310 },
    ],
  },
  {
    id: 'beetroot',
    name: 'Beetroot Microgreens',
    botanicalName: 'Beta vulgaris',
    category: 'mild',
    categoryLabel: 'Mild & Sweet',
    flavorProfile: 'Sweet, earthy beet flavor with tender juicy stems',
    harvestDays: '10–14 Days',
    shortDesc:
      'Jewel-crimson stems and glossy dark green leaves bringing vibrant restaurant color and gentle earthy sweetness to salads and grain bowls.',
    detailedDesc:
      'Nutrileaf Beetroot Microgreens capture the sweet earthiness of young garden beets in delicate ruby stalks and emerald-burgundy leaves. Chefs rely on them for striking plate contrast, while fitness buyers prize them for natural nitrates.',
    nutritionHighlight: 'Rich in dietary nitrates, betalains, folate, iron, and Vitamin C',
    culinaryUses: ['Chef salad plating', 'Pre-workout juices', 'Hummus & feta toast', 'Grain bowls'],
    goals: ['fitness', 'culinary', 'immunity'],
    image: '/src/assets/images/product_beetroot_microgreens_1795260080775.jpg',
    imageDescription:
      'Vibrant ruby-crimson stemmed beetroot microgreens with glossy green and burgundy leaves on a matte ceramic plate over travertine.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 95 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 175 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 390 },
    ],
  },
  {
    id: 'wheatgrass',
    name: 'Wheatgrass',
    botanicalName: 'Triticum aestivum',
    category: 'mild',
    categoryLabel: 'Mild & Sweet',
    flavorProfile: 'Sweet, clean, grassy freshness ideal for cold-pressed shots',
    harvestDays: '8–10 Days',
    shortDesc:
      'Freshly harvested emerald wheatgrass blades grown for morning wellness shots, green juices, gyms, and detox beverage bars.',
    detailedDesc:
      'Cultivated without chemicals in clean Dindigul trays and harvested at peak sweetness around day 8 to 10, Nutrileaf Wheatgrass produces vibrant chlorophyll-rich juice. Available in freshly cut punnets or kitchen packs for daily wellness routines.',
    nutritionHighlight: 'High chlorophyll, Vitamin A, Vitamin C, Vitamin E, iron, and active enzymes',
    culinaryUses: ['Morning wellness shots', 'Cold-pressed green juice', 'Smoothie blends', 'Cafe juice bars'],
    goals: ['immunity', 'fitness'],
    image: '/src/assets/images/product_wheatgrass_microgreens_1795260081749.jpg',
    imageDescription:
      'Freshly cut lush emerald wheatgrass bundle tied cleanly beside a stoneware dish on warm travertine in soft morning daylight.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 70 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 125 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 290 },
    ],
  },
  {
    id: 'basil',
    name: 'Basil Microgreens',
    botanicalName: 'Ocimum basilicum',
    category: 'herbal',
    categoryLabel: 'Aromatic Herbs',
    flavorProfile: 'Lush sweet-clove Italian basil fragrance and crisp finish',
    harvestDays: '12–15 Days',
    shortDesc:
      'Glossy aromatic cotyledon leaves packed with concentrated sweet basil essential oils for pizzas, pastas, bruschetta, and gourmet salads.',
    detailedDesc:
      'Nutrileaf Basil Microgreens burst with sweet, peppery-clove aroma the instant a punnet is opened. A favorite among Dindigul cafes and Italian kitchens, tiny leaves deliver full fresh basil impact over hot pizzas, soups, and cold bowls.',
    nutritionHighlight: 'Rich in Vitamin K, polyphenols, beta-carotene, and aromatic essential oils',
    culinaryUses: ['Wood-fired pizzas', 'Pasta & pesto finish', 'Caprese & tomato salads', 'Cafe sandwiches'],
    goals: ['culinary', 'family'],
    image: '/src/assets/images/product_basil_microgreens_1795260080808.jpg',
    imageDescription:
      'Fragrant sweet basil microgreens with glossy cupped bright green leaves in a cream ceramic dish on travertine stone.',
    packs: [
      { id: '50g', label: '50g Punnet', weightGrams: 50, priceInr: 95 },
      { id: '100g', label: '100g Family Pack', weightGrams: 100, priceInr: 175 },
      { id: '250g', label: '250g Kitchen Pack', weightGrams: 250, priceInr: 390 },
    ],
  },
];

export const WHY_CHOOSE_PILLARS = [
  {
    index: '01',
    title: 'Cut on Harvest Day',
    description:
      'Every batch in Dindigul is harvested just hours before dispatch so leaves stay crisp, hydrated, and aromatic.',
  },
  {
    index: '02',
    title: 'Hygienic Food-Grade Trays',
    description:
      'Grown in protected racks using clean water, food-grade substrates, and sanitized packing tables.',
  },
  {
    index: '03',
    title: 'Zero Chemical Sprays',
    description:
      'No synthetic pesticides or artificial growth boosters—just quality untreated seed, clean moisture, and light.',
  },
  {
    index: '04',
    title: 'Direct Grower Pricing',
    description:
      'No middlemen or cold-storage delays. Order small family punnets or recurring kitchen trays straight from us.',
  },
];

export const CUSTOMER_SEGMENTS = [
  {
    title: 'Families & Home Kitchens',
    detail: '100g family packs for daily salads, chutneys, smoothies, and kids meals with mild varieties.',
  },
  {
    title: 'Gyms & Fitness Enthusiasts',
    detail: 'Sunflower, pea shoots, beetroot, and wheatgrass packed with plant amino acids and micronutrients.',
  },
  {
    title: 'Restaurants & Cafes',
    detail: 'Consistent weekly trays of radish, red amaranthus, basil, and coriander for vibrant plating.',
  },
  {
    title: 'Hotels & Catering Kitchens',
    detail: 'Bulk 250g+ harvests scheduled ahead of banquets, breakfast buffets, and live salad counters.',
  },
  {
    title: 'Supermarkets & Organic Stores',
    detail: 'Labeled food-grade clamshell punnets with crisp shelf presentation for local retail chillers.',
  },
  {
    title: 'Health & Wellness Buyers',
    detail: 'Sulforaphane-rich broccoli, fenugreek, and wheatgrass harvests cut at peak nutrient density.',
  },
];

export const FARM_STATS = [
  { label: 'Varieties Grown', value: '12' },
  { label: 'Harvest Window', value: '7–16 Days' },
  { label: 'Chemical Sprays', value: '0%' },
  { label: 'Farm-to-Kitchen', value: 'Same Day' },
];

export const BENEFIT_PILLARS = [
  {
    index: '01',
    title: 'Concentrated Phytonutrients',
    description:
      'Microgreens are harvested right after their first true leaves emerge—when vitamins, carotenoids, and protective plant compounds are densely concentrated.',
  },
  {
    index: '02',
    title: 'Bioavailable Everyday Greens',
    description:
      'Tender stems require zero cooking. Adding a small handful over warm dishes preserves heat-sensitive Vitamin C and natural enzymes.',
  },
  {
    index: '03',
    title: 'Distinct Flavor & Color Contrast',
    description:
      'From spicy pink radish to ruby amaranthus and nutty sunflower, each variety brings instant brightness and crisp mouthfeel.',
  },
  {
    index: '04',
    title: 'Clean, Zero-Waste Portions',
    description:
      'Pre-trimmed and clean-grown above soil line—100% edible from leaf tip to tender stem with no thick stalks to discard.',
  },
];
