"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  ShoppingBag,
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import productsData from "@/data/products.json"
import categoriesData from "@/data/categories.json"
import { formatPrice } from "@/lib/utils"

type SortOption = "recommended" | "newest" | "price_asc" | "price_desc" | "bestseller"

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Onerilen" },
  { value: "newest", label: "Yeni Gelenler" },
  { value: "price_asc", label: "Fiyat (Artan)" },
  { value: "price_desc", label: "Fiyat (Azalan)" },
  { value: "bestseller", label: "En Cok Satanlar" },
]

function getPrice(product: (typeof productsData)[number]) {
  return product.variants[0]?.priceB2C || 0
}

export default function CatalogContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>("recommended")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])

  const filtered = useMemo(() => {
    let items = [...productsData]
    if (selectedCategory) {
      items = items.filter((p) => p.categorySlug === selectedCategory)
    }
    items = items.filter(
      (p) => getPrice(p) >= priceRange[0] && getPrice(p) <= priceRange[1]
    )
    switch (sort) {
      case "price_asc":
        items.sort((a, b) => getPrice(a) - getPrice(b))
        break
      case "price_desc":
        items.sort((a, b) => getPrice(b) - getPrice(a))
        break
      case "newest":
        items.sort((a, b) => (b.badges.includes("new") ? 1 : 0) - (a.badges.includes("new") ? 1 : 0))
        break
      case "bestseller":
        items.sort((a, b) => b.rating.count - a.rating.count)
        break
    }
    return items
  }, [selectedCategory, sort, priceRange])

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-medium-gray">
        <Link href="/" className="hover:text-navy transition-colors">Anasayfa</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-charcoal font-medium">Urunler</span>
        {selectedCategory && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span className="text-charcoal font-medium">
              {categoriesData.find((c) => c.slug === selectedCategory)?.name}
            </span>
          </>
        )}
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal sm:text-4xl">
            Urun Katalogu
          </h1>
          <p className="mt-1 text-sm text-medium-gray">
            {filtered.length} urun listeleniyor
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-xl border border-light-gray bg-card px-4 py-2.5 pr-10 text-sm text-charcoal focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-medium-gray" />
          </div>

          {/* View toggle */}
          <div className="hidden sm:flex items-center rounded-xl border border-light-gray">
            <button
              aria-label="Izgara gorunumu"
              onClick={() => setView("grid")}
              className={`p-2.5 transition-colors ${view === "grid" ? "text-navy bg-sand" : "text-medium-gray"} rounded-l-xl`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              aria-label="Liste gorunumu"
              onClick={() => setView("list")}
              className={`p-2.5 transition-colors ${view === "list" ? "text-navy bg-sand" : "text-medium-gray"} rounded-r-xl`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex lg:hidden items-center gap-2 rounded-xl border border-light-gray px-4 py-2.5 text-sm text-charcoal"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtre
          </button>
        </div>
      </div>

      {/* Active filters */}
      {selectedCategory && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-medium-gray">Aktif Filtreler:</span>
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-1 rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy"
          >
            {categoriesData.find((c) => c.slug === selectedCategory)?.name}
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar filter - desktop */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          <FilterPanel
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${sort}-${view}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={
                view === "grid"
                  ? "grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {filtered.length > 0 ? (
                filtered.map((product) =>
                  view === "grid" ? (
                    <GridProductCard key={product.id} product={product} />
                  ) : (
                    <ListProductCard key={product.id} product={product} />
                  )
                )
              ) : (
                <div className="col-span-full flex flex-col items-center py-20 text-center">
                  <p className="text-lg text-medium-gray">Bu filtrelere uygun urun bulunamadi.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null)
                      setPriceRange([0, 50000])
                    }}
                    className="mt-4 rounded-xl bg-navy px-6 py-2.5 text-sm font-medium text-primary-foreground"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-charcoal/40"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-[60] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-charcoal">Filtreler</h3>
                <button onClick={() => setMobileFilterOpen(false)} aria-label="Kapat">
                  <X className="h-5 w-5 text-charcoal" />
                </button>
              </div>
              <FilterPanel
                selectedCategory={selectedCategory}
                onCategoryChange={(c) => {
                  setSelectedCategory(c)
                  setMobileFilterOpen(false)
                }}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ========== FilterPanel ========== */
function FilterPanel({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}: {
  selectedCategory: string | null
  onCategoryChange: (slug: string | null) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
          Kategori
        </h4>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${!selectedCategory
                ? "bg-navy text-primary-foreground font-medium"
                : "text-charcoal hover:bg-sand"
              }`}
          >
            Tumu
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedCategory === cat.slug
                  ? "bg-navy text-primary-foreground font-medium"
                  : "text-charcoal hover:bg-sand"
                }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs opacity-60">{cat.productCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
          Fiyat Araligi
        </h4>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              onPriceChange([parseInt(e.target.value) || 0, priceRange[1]])
            }
            className="w-full rounded-xl border border-light-gray bg-sand/50 px-3 py-2 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none"
            placeholder="Min"
          />
          <span className="text-medium-gray">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], parseInt(e.target.value) || 50000])
            }
            className="w-full rounded-xl border border-light-gray bg-sand/50 px-3 py-2 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={() => {
          onCategoryChange(null)
          onPriceChange([0, 50000])
        }}
        className="rounded-xl border border-light-gray px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-sand"
      >
        Filtreleri Temizle
      </button>
    </div>
  )
}

/* ========== GridProductCard ========== */
function GridProductCard({ product }: { product: (typeof productsData)[number] }) {
  const variant = product.variants[0]
  const hasDiscount = variant.discountRate > 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group flex flex-col rounded-[20px] bg-card shadow-soft-sm transition-shadow hover:shadow-card-hover"
    >
      <Link
        href={`/urunler/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden rounded-t-[20px]"
      >
        <Image
          src={product.images[0]?.url || ""}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges.includes("new") && (
            <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
              Yeni
            </span>
          )}
          {product.badges.includes("sale") && (
            <span className="rounded-full bg-terracotta px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              -{variant.discountRate}%
            </span>
          )}
        </div>
        <button
          aria-label="Favorilere ekle"
          className="absolute right-3 top-3 rounded-full bg-card/80 p-2 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-card"
        >
          <Heart className="h-4 w-4 text-charcoal" />
        </button>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-gold">
          {product.categoryName}
        </span>
        <Link href={`/urunler/${product.slug}`}>
          <h3 className="mt-1 font-serif text-sm font-semibold text-charcoal line-clamp-1 hover:text-navy transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1">
          <Star className="h-3 w-3 fill-gold text-gold" />
          <span className="text-xs text-charcoal">{product.rating.average}</span>
          <span className="text-[10px] text-medium-gray">({product.rating.count})</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            {hasDiscount && variant.oldPrice && (
              <span className="text-xs text-medium-gray line-through">
                {formatPrice(variant.oldPrice)}
              </span>
            )}
            <p className="text-base font-semibold text-navy">
              {formatPrice(variant.priceB2C)}
            </p>
          </div>
          <button
            aria-label="Sepete ekle"
            className="rounded-xl bg-navy p-2 text-primary-foreground transition hover:bg-navy/90"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ========== ListProductCard ========== */
function ListProductCard({ product }: { product: (typeof productsData)[number] }) {
  const variant = product.variants[0]
  const hasDiscount = variant.discountRate > 0

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group flex overflow-hidden rounded-[20px] bg-card shadow-soft-sm transition-shadow hover:shadow-soft-md"
    >
      <Link
        href={`/urunler/${product.slug}`}
        className="relative aspect-square w-40 shrink-0 sm:w-52 overflow-hidden"
      >
        <Image
          src={product.images[0]?.url || ""}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-gold">
            {product.categoryName}
          </span>
          <Link href={`/urunler/${product.slug}`}>
            <h3 className="mt-1 font-serif text-lg font-semibold text-charcoal hover:text-navy transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-medium-gray line-clamp-2">
            {product.shortDescription}
          </p>
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="text-xs font-medium text-charcoal">{product.rating.average}</span>
            <span className="text-xs text-medium-gray">({product.rating.count} degerlendirme)</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            {hasDiscount && variant.oldPrice && (
              <span className="text-xs text-medium-gray line-through">
                {formatPrice(variant.oldPrice)}
              </span>
            )}
            <p className="text-lg font-semibold text-navy">
              {formatPrice(variant.priceB2C)}
            </p>
          </div>
          <button className="rounded-xl bg-navy px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-navy/90">
            Sepete Ekle
          </button>
        </div>
      </div>
    </motion.div>
  )
}
