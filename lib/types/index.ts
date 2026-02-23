// ============================================================
// Ermay Mobilya – TypeScript Type Definitions
// ============================================================

// ─── Product ──────────────────────────────────────────────────
export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    type: 'standard' | 'lifestyle' | 'detail';
}

export interface ProductVariant {
    id: string;
    color: string;
    colorHex: string;
    fabric: string;
    mechanism: string;
    skuVariant: string;
    priceB2C: number;
    priceB2BNet: number;
    discountRate: number;
    oldPrice: number | null;
    stock: number;
    stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'on_order';
}

export interface ProductSpecs {
    widthCm: number;
    depthCm: number;
    heightCm: number;
    weightKg: number;
    maxLoadKg: number | null;
    seatHeightCm: number | null;
    armHeightCm: number | null;
    material: string;
    frameColor: string;
    certificates: string[];
}

export interface ProductRating {
    average: number;
    count: number;
}

export interface ProductMeta {
    title: string;
    description: string;
    keywords: string[];
}

export interface Product {
    id: string;
    slug: string;
    sku: string;
    name: string;
    categoryId: string;
    categorySlug: string;
    categoryName: string;
    shortDescription: string;
    longDescription: string;
    images: ProductImage[];
    variants: ProductVariant[];
    specs: ProductSpecs;
    badges: Array<'new' | 'sale' | 'bestseller' | 'sustainable' | 'b2b_only'>;
    rating: ProductRating;
    isConfigurable: boolean;
    arSupported: boolean;
    isFeatured: boolean;
    relatedProductIds: string[];
    setProductIds: string[];
    tags: string[];
    meta: ProductMeta;
    createdAt: string;
    updatedAt: string;
}

// ─── Category ─────────────────────────────────────────────────
export interface CategoryMeta {
    title: string;
    description: string;
}

export interface Category {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    parentId: string | null;
    productCount: number;
    order: number;
    icon: string;
    featured: boolean;
    meta: CategoryMeta;
}

// ─── Blog ─────────────────────────────────────────────────────
export interface BlogAuthor {
    name: string;
    role: string;
    avatar: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    author: BlogAuthor;
    publishedAt: string;
    readingTime: number;
    featured: boolean;
}

// ─── Testimonial ──────────────────────────────────────────────
export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    city: string;
    avatar: string;
    rating: number;
    comment: string;
    productName: string | null;
    isDealer: boolean;
    featured: boolean;
}

// ─── Dealer (B2B) ─────────────────────────────────────────────
export interface Dealer {
    dealerId: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    city: string;
    taxNumber: string;
    discountTier: 'A' | 'B' | 'C';
    discountRate: number;
    creditLimit: number;
    currentBalance: number;
    paymentTerm: 'Net 30' | 'Net 60' | 'Net 90';
    totalPurchase6m: number;
    orderCount6m: number;
    lastOrderDate: string;
    joinedAt: string;
}

// ─── Order ────────────────────────────────────────────────────
export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'in_production'
    | 'quality_check'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface OrderStatusHistory {
    status: string;
    timestamp: string;
    note: string;
    actor: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    variantDescription: string;
    quantity: number;
    unitPriceNet: number;
    totalNet: number;
}

export interface OrderShipping {
    carrier: string;
    trackingNumber: string | null;
    estimatedDelivery: string | null;
    address: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    dealerId: string;
    status: OrderStatus;
    statusHistory: OrderStatusHistory[];
    items: OrderItem[];
    subtotalNet: number;
    vatRate: number;
    vatAmount: number;
    totalGross: number;
    shipping: OrderShipping;
    paymentStatus: 'paid' | 'pending' | 'overdue';
    notes: string | null;
    createdAt: string;
    updatedAt: string;
}

// ─── Cari Hareket ─────────────────────────────────────────────
export interface CariHareket {
    id: string;
    dealerId: string;
    type: 'siparis' | 'odeme' | 'iade' | 'duzeltme';
    description: string;
    amount: number;
    balance: number;
    orderNumber: string | null;
    dueDate: string | null;
    isPaid: boolean;
    createdAt: string;
}

// ─── Cart ─────────────────────────────────────────────────────
export interface CartItem {
    productId: string;
    variantId: string;
    name: string;
    variantDescription: string;
    price: number;
    quantity: number;
    image: string;
    maxStock: number;
}

// ─── User / Auth ──────────────────────────────────────────────
export interface User {
    id: string;
    email: string;
    name: string;
    isDealer: boolean;
}

// ─── UI State ─────────────────────────────────────────────────
export interface Toast {
    id: string;
    title: string;
    description?: string;
    type: 'success' | 'error' | 'info' | 'warning';
}

// ─── Navigation ───────────────────────────────────────────────
export interface NavItem {
    label: string;
    href: string;
    hasMegaMenu?: boolean;
    children?: NavItem[];
}

export interface MegaMenuItem {
    title: string;
    items: { label: string; href: string; image?: string }[];
}

// ─── Filter ───────────────────────────────────────────────────
export interface FilterState {
    categories: string[];
    priceMin: number | null;
    priceMax: number | null;
    materials: string[];
    colors: string[];
    inStockOnly: boolean;
    sustainable: boolean;
    sortBy: 'default' | 'price_asc' | 'price_desc' | 'newest' | 'popular';
    page: number;
    viewMode: 'grid' | 'list';
}

// ─── Search ───────────────────────────────────────────────────
export interface SearchResult {
    products: Product[];
    total: number;
    query: string;
}
