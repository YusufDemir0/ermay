"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingBag, Heart } from "lucide-react"
import productsData from "@/data/products.json"
import { formatPrice } from "@/lib/utils"

type Product = (typeof productsData)[number]

const tabs = ["Yeni Gelenler", "En Cok Satanlar", "Kampanyalar"]

function getFilteredProducts(tab: string): Product[] {
  switch (tab) {
    case "Yeni Gelenler":
      return productsData.filter((p) => p.badges.includes("new")).slice(0, 4)
    case "En Cok Satanlar":
      return productsData.filter((p) => p.badges.includes("bestseller")).slice(0, 4)
    case "Kampanyalar":
      return productsData.filter((p) => p.badges.includes("sale")).slice(0, 4)
    default:
      return productsData.slice(0, 4)
  }
}

function ProductCard({ product }: { product: Product }) {
  const variant = product.variants[0]
  const hasDiscount = variant.discountRate > 0

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group flex flex-col rounded-[20px] bg-card shadow-soft-sm transition-shadow hover:shadow-card-hover"
    >
      {/* Image */}
      <Link
        href={`/urunler/${product.slug}`}
        className="relative aspect-[4/3] overflow-hidden rounded-t-[20px]"
      >
        <Image
          src={product.images[0]?.url || "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges.includes("new") && (
            <span className="rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
              Yeni
            </span>
          )}
          {product.badges.includes("bestseller") && (
            <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-bold text-gold border border-gold">
              Cok Satan
            </span>
          )}
          {product.badges.includes("sale") && (
            <span className="rounded-full bg-terracotta px-2.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
              -{variant.discountRate}%
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          aria-label="Favorilere ekle"
          className="absolute right-3 top-3 rounded-full bg-primary-foreground/80 p-2 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-primary-foreground"
        >
          <Heart className="h-4 w-4 text-charcoal" />
        </button>
        {/* Quick view */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="glass rounded-full px-4 py-2 text-xs font-medium text-charcoal">
            Hizli Bakis
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col px-4 py-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-gold">
          {product.categoryName}
        </span>
        <Link href={`/urunler/${product.slug}`}>
          <h3 className="mt-1 font-serif text-base font-semibold text-charcoal transition-colors hover:text-navy">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-medium-gray">{product.specs.material}</p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-xs font-medium text-charcoal">
            {product.rating.average}
          </span>
          <span className="text-xs text-medium-gray">
            ({product.rating.count})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col">
            {hasDiscount && variant.oldPrice && (
              <span className="text-xs text-medium-gray line-through">
                {formatPrice(variant.oldPrice)}
              </span>
            )}
            <span className="text-lg font-semibold text-navy">
              {formatPrice(variant.priceB2C)}
            </span>
          </div>
          <button
            aria-label="Sepete ekle"
            className="rounded-xl bg-navy p-2.5 text-primary-foreground transition-all hover:bg-navy/90 hover:shadow-gold-glow"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(tabs[0])
  const products = getFilteredProducts(activeTab)

  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
              Secme Urunler
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
              One Cikan Urunler
            </h2>
          </div>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeTab === tab
                    ? "bg-navy text-primary-foreground shadow-soft-sm"
                    : "bg-card text-charcoal hover:bg-primary-foreground"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-medium-gray py-12">
                Bu kategoride henuz urun bulunmuyor.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <Link
            href="/urunler"
            className="rounded-2xl border-2 border-navy px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground"
          >
            Tum Urunleri Gor
          </Link>
        </div>
      </div>
    </section>
  )
}
