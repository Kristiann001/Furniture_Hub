// ============================================
// FURNITURE HUB KENYA — Full Product Catalog
// ============================================

export const woodTypes = {
  mahogany: "Mahogany",
  oak: "Oak",
  walnut: "Walnut",
  teak: "Teak",
  pine: "Pine",
  mdf: "MDF/Engineered",
  rattan: "Rattan",
  aluminum: "Powder-Coated Aluminum",
};

export const productCategories = [
  { id: "all", name: "All" },
  { id: "living-room", name: "Living Room" },
  { id: "office", name: "Office" },
  { id: "bedroom", name: "Bedroom" },
  { id: "outdoor", name: "Outdoor" },
];

export const WHATSAPP_NUMBER = "254720515922";

export const generateWhatsAppLink = (product, quantity = 1, color = "") => {
  const colorText = color ? `, Color: ${color}` : "";
  const message =
    `Hello Furniture Hub Kenya! 🛋️\n\n` +
    `I'm interested in ordering:\n` +
    `*${product.name}*\n` +
    `Category: ${product.categoryName}\n` +
    `Wood Type: ${woodTypes[product.woodType] || product.woodType}\n` +
    `Dimensions: ${product.dimensionSummary}\n` +
    `Price: ${product.price}${colorText}\n` +
    `Quantity: ${quantity}\n\n` +
    `Please assist me with the order. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const formatPrice = (price) => {
  if (typeof price === "number") {
    return `KSh ${price.toLocaleString("en-KE")}`;
  }
  return price;
};

export const getProductPrice = (product) => {
  return typeof product.priceRaw === "number"
    ? product.priceRaw
    : parseInt(product.price.replace(/[^0-9]/g, ""), 10);
};

export const getProductsByCategory = (category) => {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
};

// ============================================
// FULL PRODUCT LIST
// ============================================
export const products = [
  // ---- LIVING ROOM ----
  {
    id: 1,
    name: "Modern Velvet Sofa",
    category: "living-room",
    categoryName: "Living Room",
    woodType: "oak",
    price: "KSh 185,000",
    priceRaw: 185000,
    originalPrice: "KSh 220,000",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&crop=top",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&crop=center",
    ],
    description:
      "Luxurious modern velvet sofa with premium finish. Features high-density foam cushions for exceptional comfort. Perfect for contemporary living spaces. Upholstered in premium Italian velvet with solid oak legs.",
    dimensionSummary: '84"W × 36"D × 32"H',
    dimensions: { Width: '84"', Depth: '36"', Height: '32"', "Seat Height": '18"' },
    colors: [
      { name: "Charcoal", hex: "#4a4a4a" },
      { name: "Beige", hex: "#8b7355" },
      { name: "Navy", hex: "#2c3e50" },
      { name: "Cream", hex: "#c9b8a8" },
    ],
    features: [
      "Premium Italian velvet upholstery",
      "High-density foam cushions",
      "Solid oak wood legs",
      "Seat depth: 22 inches",
      "Weight capacity: 300 lbs per seat",
      "Assembly required",
    ],
  },
  {
    id: 2,
    name: "Luxury L-Shape Sofa",
    category: "living-room",
    categoryName: "Living Room",
    woodType: "mahogany",
    price: "KSh 85,000",
    priceRaw: 85000,
    originalPrice: "KSh 105,000",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&crop=top",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&crop=center",
    ],
    description:
      "Premium handcrafted L-shape sofa with rich mahogany wood frame. Built to last generations with expert Kenyan craftsmanship. Perfect for large living rooms. Upholstered in high-grade fabric available in multiple colours.",
    dimensionSummary: '110"W × 80"D × 34"H',
    dimensions: { Width: '110"', Depth: '80"', Height: '34"', "Seat Height": '18"' },
    colors: [
      { name: "Smoke Grey", hex: "#6b7280" },
      { name: "Camel", hex: "#c19a6b" },
      { name: "Ivory", hex: "#fffff0" },
      { name: "Burgundy", hex: "#800020" },
    ],
    features: [
      "Solid Mahogany frame",
      "Premium foam padding",
      "Modular corner design",
      "Stain-resistant fabric option",
      "Available in custom colours",
      "Free delivery in Nairobi",
    ],
  },
  {
    id: 3,
    name: "Minimalist Coffee Table",
    category: "living-room",
    categoryName: "Living Room",
    woodType: "walnut",
    price: "KSh 45,000",
    priceRaw: 45000,
    originalPrice: "KSh 55,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800",
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1200",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1200&crop=top",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1200&crop=center",
    ],
    description:
      "Sleek minimalist coffee table in solid walnut with a matte finish. Clean lines and quality construction make this the perfect centrepiece for any modern living room.",
    dimensionSummary: '48"W × 24"D × 18"H',
    dimensions: { Width: '48"', Depth: '24"', Height: '18"' },
    colors: [
      { name: "Walnut", hex: "#5d4e37" },
      { name: "Oak", hex: "#a08050" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    features: [
      "Solid walnut top",
      "Powder-coated steel base",
      "Scratch-resistant surface",
      "Easy assembly",
    ],
  },
  {
    id: 4,
    name: "Accent Chair",
    category: "living-room",
    categoryName: "Living Room",
    woodType: "oak",
    price: "KSh 65,000",
    priceRaw: 65000,
    originalPrice: "KSh 75,000",
    badge: "New",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&crop=top",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&crop=center",
    ],
    description:
      "Elegant accent chair with solid oak frame and plush upholstery. A statement piece for any living room corner.",
    dimensionSummary: '30"W × 32"D × 36"H',
    dimensions: { Width: '30"', Depth: '32"', Height: '36"', "Seat Height": '18"' },
    colors: [
      { name: "Sage Green", hex: "#8fa888" },
      { name: "Mustard", hex: "#d4a843" },
      { name: "Charcoal", hex: "#4a4a4a" },
    ],
    features: [
      "Solid oak legs",
      "High-density foam seat",
      "Button-tufted back",
      "Available in multiple fabrics",
    ],
  },
  {
    id: 5,
    name: "TV Stand Unit",
    category: "living-room",
    categoryName: "Living Room",
    woodType: "mdf",
    price: "KSh 85,000",
    priceRaw: 85000,
    originalPrice: "KSh 95,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&crop=top",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&crop=center",
    ],
    description:
      "Modern TV stand unit with cable management and generous storage. Fits TVs up to 75 inches.",
    dimensionSummary: '63"W × 16"D × 20"H',
    dimensions: { Width: '63"', Depth: '16"', Height: '20"' },
    colors: [
      { name: "White", hex: "#f5f5f5" },
      { name: "Dark Oak", hex: "#4e3524" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    features: [
      "Supports TVs up to 75\"",
      "4 open compartments",
      "Built-in cable management",
      "Easy assembly",
    ],
  },

  // ---- OFFICE ----
  {
    id: 6,
    name: "Executive Desk",
    category: "office",
    categoryName: "Office",
    woodType: "mahogany",
    price: "KSh 125,000",
    priceRaw: 125000,
    originalPrice: "KSh 150,000",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&crop=top",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&crop=center",
    ],
    description:
      "Premium executive desk crafted from solid mahogany with modern design elements. Features spacious work surface, built-in cable management, and elegant drawer system. Perfect for the modern professional.",
    dimensionSummary: '72"W × 36"D × 30"H',
    dimensions: { Width: '72"', Depth: '36"', Height: '30"' },
    colors: [
      { name: "Mahogany", hex: "#722f37" },
      { name: "Oak", hex: "#8b6f47" },
      { name: "Walnut", hex: "#5d4e37" },
      { name: "Black", hex: "#2c2c2c" },
    ],
    features: [
      "Solid mahogany construction",
      "3 spacious drawers",
      "Built-in cable management",
      "Scratch-resistant finish",
      "Weight capacity: 200 lbs",
      "Minimal assembly required",
    ],
  },
  {
    id: 7,
    name: "Ergonomic Office Chair",
    category: "office",
    categoryName: "Office",
    woodType: "aluminum",
    price: "KSh 75,000",
    priceRaw: 75000,
    originalPrice: "KSh 85,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&crop=top",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&crop=center",
    ],
    description:
      "Premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back. Designed for long working hours.",
    dimensionSummary: '26"W × 26"D × 38–43"H',
    dimensions: { Width: '26"', Depth: '26"', "Height (adj)": '38–43"', "Seat Height": '17–21"' },
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Grey", hex: "#6b7280" },
    ],
    features: [
      "Breathable mesh back",
      "Adjustable lumbar support",
      "4D adjustable armrests",
      "360° swivel base",
      "Heavy-duty casters",
    ],
  },
  {
    id: 8,
    name: "Filing Cabinet",
    category: "office",
    categoryName: "Office",
    woodType: "mdf",
    price: "KSh 35,000",
    priceRaw: 35000,
    originalPrice: "KSh 40,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&crop=top",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&crop=center",
    ],
    description:
      "Sturdy 3-drawer filing cabinet with lock. Keeps your documents organized and secure. Fits standard A4 folders.",
    dimensionSummary: '15"W × 20"D × 28"H',
    dimensions: { Width: '15"', Depth: '20"', Height: '28"' },
    colors: [
      { name: "White", hex: "#f5f5f5" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Grey", hex: "#9ca3af" },
    ],
    features: [
      "3 lockable drawers",
      "Full-width drawer pulls",
      "Smooth ball-bearing slides",
      "Anti-tip safety mechanism",
    ],
  },
  {
    id: 9,
    name: "Bookshelf Unit",
    category: "office",
    categoryName: "Office",
    woodType: "pine",
    price: "KSh 55,000",
    priceRaw: 55000,
    originalPrice: "KSh 65,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&crop=top",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&crop=center",
    ],
    description:
      "5-shelf bookcase in solid pine. Adjustable shelving and wall-anchor kit included for safety.",
    dimensionSummary: '32"W × 12"D × 72"H',
    dimensions: { Width: '32"', Depth: '12"', Height: '72"' },
    colors: [
      { name: "Natural Pine", hex: "#c8a86b" },
      { name: "White", hex: "#f5f5f5" },
      { name: "Dark Walnut", hex: "#4e3524" },
    ],
    features: [
      "5 adjustable shelves",
      "Solid pine construction",
      "Wall-anchor kit included",
      "Max load 30kg per shelf",
    ],
  },

  // ---- BEDROOM ----
  {
    id: 10,
    name: "King Size Platform Bed",
    category: "bedroom",
    categoryName: "Bedroom",
    woodType: "mahogany",
    price: "KSh 145,000",
    priceRaw: 145000,
    originalPrice: "KSh 180,000",
    badge: "New",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&crop=top",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&crop=center",
    ],
    description:
      "Handcrafted king-size platform bed with solid mahogany headboard. Low-profile design for a sleek modern look. No box spring needed.",
    dimensionSummary: '76"W × 80"D × 14"H (platform)',
    dimensions: { Width: '76"', Length: '80"', "Platform Height": '14"', "Headboard Height": '48"' },
    colors: [
      { name: "Mahogany", hex: "#722f37" },
      { name: "Walnut Dark", hex: "#3e2723" },
      { name: "Natural Oak", hex: "#a08050" },
    ],
    features: [
      "Solid mahogany frame",
      "Low-profile platform", 
      "No box spring required",
      "Slatted base for airflow",
      "Weight capacity: 500 lbs",
    ],
  },
  {
    id: 11,
    name: "Wardrobe Cabinet",
    category: "bedroom",
    categoryName: "Bedroom",
    woodType: "mdf",
    price: "KSh 95,000",
    priceRaw: 95000,
    originalPrice: "KSh 110,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800",
    images: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&crop=top",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&crop=center",
    ],
    description:
      "3-door sliding wardrobe with built-in drawers, mirror, and hanging rail. Premium hinges and soft-close drawers.",
    dimensionSummary: '72"W × 22"D × 84"H',
    dimensions: { Width: '72"', Depth: '22"', Height: '84"' },
    colors: [
      { name: "White Gloss", hex: "#f0f0f0" },
      { name: "Dark Oak", hex: "#4e3524" },
      { name: "Grey Matt", hex: "#6b7280" },
    ],
    features: [
      "3 sliding doors with mirror",
      "Soft-close drawers",
      "Full-length hanging rail", 
      "Internal shelving",
      "Premium quality hinges",
    ],
  },
  {
    id: 12,
    name: "Nightstand Set",
    category: "bedroom",
    categoryName: "Bedroom",
    woodType: "oak",
    price: "KSh 35,000",
    priceRaw: 35000,
    originalPrice: "KSh 40,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800",
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&crop=top",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&crop=center",
    ],
    description:
      "Set of two matching oak nightstands with single drawer and open shelf. USB charging port included.",
    dimensionSummary: '20"W × 16"D × 24"H (each)',
    dimensions: { Width: '20"', Depth: '16"', Height: '24"' },
    colors: [
      { name: "Natural Oak", hex: "#a08050" },
      { name: "White", hex: "#f5f5f5" },
      { name: "Dark Walnut", hex: "#3e2723" },
    ],
    features: [
      "Set of 2 nightstands",
      "Built-in USB charging port",
      "Soft-close drawer",
      "Open shelf below",
    ],
  },
  {
    id: 13,
    name: "Dressing Table",
    category: "bedroom",
    categoryName: "Bedroom",
    woodType: "mdf",
    price: "KSh 65,000",
    priceRaw: 65000,
    originalPrice: "KSh 75,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&crop=top",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&crop=center",
    ],
    description:
      "Elegant dressing table with large mirror, LED lighting, and 4 drawers. Includes padded stool.",
    dimensionSummary: '48"W × 18"D × 55"H',
    dimensions: { Width: '48"', Depth: '18"', Height: '55"' },
    colors: [
      { name: "White Gloss", hex: "#f0f0f0" },
      { name: "Rose Gold", hex: "#b76e79" },
      { name: "Natural", hex: "#c8a86b" },
    ],
    features: [
      "Large frameless mirror",
      "LED vanity lighting",
      "4 drawers with organizers",
      "Padded stool included",
    ],
  },

  // ---- OUTDOOR ----
  {
    id: 14,
    name: "Rattan Lounge Set",
    category: "outdoor",
    categoryName: "Outdoor",
    woodType: "rattan",
    price: "KSh 165,000",
    priceRaw: 165000,
    originalPrice: "KSh 200,000",
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&crop=top",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&crop=center",
    ],
    description:
      "All-weather rattan lounge set for patios and gardens. Includes 2-seater sofa, 2 armchairs, coffee table, and weatherproof cushions.",
    dimensionSummary: "Sofa: 55\"W; Chairs: 28\"W; Table: 40\"×24\"",
    dimensions: { "Sofa Width": '55"', "Chair Width": '28"', "Table": '40"×24"' },
    colors: [
      { name: "Natural Rattan", hex: "#c8a86b" },
      { name: "Dark Brown", hex: "#3e2723" },
      { name: "Grey", hex: "#6b7280" },
    ],
    features: [
      "All-weather PE rattan weave",
      "5-piece set included",
      "Weatherproof cushions",
      "Powder-coated steel frame",
      "UV resistant",
    ],
  },
  {
    id: 15,
    name: "Outdoor Dining Table",
    category: "outdoor",
    categoryName: "Outdoor",
    woodType: "teak",
    price: "KSh 125,000",
    priceRaw: 125000,
    originalPrice: "KSh 145,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&crop=top",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&crop=center",
    ],
    description:
      "6-seater outdoor dining table in Grade A teak. Weather resistant with natural oils for long-lasting beauty.",
    dimensionSummary: '71"W × 35"D × 29"H',
    dimensions: { Width: '71"', Depth: '35"', Height: '29"', Seats: "6 people" },
    colors: [
      { name: "Natural Teak", hex: "#c8943a" },
      { name: "Aged Silver", hex: "#9ca3af" },
    ],
    features: [
      "Grade A teak wood",
      "6-person capacity",
      "Natural oil treatment",
      "Weather and UV resistant",
      "No annual sealing required",
    ],
  },
  {
    id: 16,
    name: "Garden Bench",
    category: "outdoor",
    categoryName: "Outdoor",
    woodType: "teak",
    price: "KSh 45,000",
    priceRaw: 45000,
    originalPrice: "KSh 55,000",
    badge: "",
    image: "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=800",
    images: [
      "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=1200",
      "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=1200&crop=top",
      "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=1200&crop=bottom",
      "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=1200&crop=center",
    ],
    description:
      "Classic garden bench in solid teak. Comfortable curved backrest with armrests. Seats 3 adults.",
    dimensionSummary: '60"W × 24"D × 36"H',
    dimensions: { Width: '60"', Depth: '24"', Height: '36"', "Seat Height": '17"' },
    colors: [
      { name: "Natural Teak", hex: "#c8943a" },
      { name: "Painted White", hex: "#f5f5f5" },
    ],
    features: [
      "Solid teak construction",
      "Curved ergonomic backrest",
      "Armrests on both sides",
      "Seats 3 adults",
      "Weather resistant",
    ],
  },
];
