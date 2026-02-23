'use client'

import { useState, useMemo } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShoppingBag, Heart, Shield, Truck, RotateCcw, Check, ChevronRight, Minus, Plus, Share2, Maximize2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ScrollReveal from '@/components/animations/ScrollReveal'
import productsData from '@/data/products.json'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = require('react').use(params)
    const product = productsData.find((p) => p.slug === slug)

    if (!product) return notFound()

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                <ProductDetailContent product={product} />
            </main>
            <Footer />
        </>
    )
}

function ProductDetailContent({ product }: { product: (typeof productsData)[number] }) {
    const [selectedVariant, setSelectedVariant] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const addItem = useCartStore((s) => s.addItem)
    const [addedToCart, setAddedToCart] = useState(false)

    const variant = product.variants[selectedVariant]
    const relatedProducts = useMemo(
        () => productsData.filter((p) => product.relatedProductIds.includes(p.id)).slice(0, 4),
        [product.relatedProductIds]
    )

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            variantId: variant.id,
            name: product.name,
            variantDescription: `${variant.color} / ${variant.fabric}`,
            price: variant.priceB2C,
            quantity,
            image: product.images[0]?.url || '',
            maxStock: variant.stock,
        })
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-navy transition-warm">Ana Sayfa</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/urunler" className="hover:text-navy transition-warm">Ürünler</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground font-medium">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                {/* Gallery */}
                <ScrollReveal direction="left">
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-soft-md">
                            <Image
                                src={product.images[activeImage]?.url || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80'}
                                alt={product.images[activeImage]?.alt || product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.badges.length > 0 && (
                                <div className="absolute left-4 top-4 flex flex-col gap-2">
                                    {product.badges.map((badge) => (
                                        <span key={badge} className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${badge === 'sale' ? 'bg-alert-red' :
                                                badge === 'new' ? 'bg-navy' :
                                                    badge === 'bestseller' ? 'bg-gold' :
                                                        badge === 'sustainable' ? 'bg-sage' : 'bg-medium-gray'
                                            }`}>
                                            {badge === 'sale' ? 'İndirim' :
                                                badge === 'new' ? 'Yeni' :
                                                    badge === 'bestseller' ? 'Çok Satan' :
                                                        badge === 'sustainable' ? 'Eko' : badge.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm hover:bg-white transition-warm">
                                <Maximize2 className="h-5 w-5 text-charcoal" />
                            </button>
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, i) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-warm ${activeImage === i ? 'border-gold shadow-gold-glow' : 'border-transparent hover:border-light-gray'
                                            }`}
                                    >
                                        <Image src={img.url} alt={img.alt} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollReveal>

                {/* Product Info */}
                <ScrollReveal direction="right">
                    <div className="space-y-6">
                        <div>
                            <p className="mb-2 text-sm font-medium text-gold">{product.categoryName}</p>
                            <h1 className="font-serif text-3xl font-bold text-charcoal lg:text-4xl">{product.name}</h1>
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating.average) ? 'fill-gold text-gold' : 'text-light-gray'}`} />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">{product.rating.average} ({product.rating.count} değerlendirme)</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="font-serif text-3xl font-bold text-navy">{formatPrice(variant.priceB2C)}</span>
                            {variant.oldPrice && (
                                <span className="text-lg text-muted-foreground line-through">{formatPrice(variant.oldPrice)}</span>
                            )}
                            {variant.discountRate > 0 && (
                                <span className="rounded-full bg-alert-red/10 px-3 py-1 text-sm font-semibold text-alert-red">%{variant.discountRate} İndirim</span>
                            )}
                        </div>

                        <p className="text-base leading-relaxed text-muted-foreground">{product.shortDescription}</p>

                        {/* Variant Selection */}
                        {product.variants.length > 1 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-charcoal">Renk / Malzeme</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((v, i) => (
                                        <button
                                            key={v.id}
                                            onClick={() => { setSelectedVariant(i); setQuantity(1) }}
                                            className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2 transition-warm ${selectedVariant === i ? 'border-gold bg-gold/5 shadow-gold-glow' : 'border-light-gray hover:border-gold/50'
                                                }`}
                                        >
                                            <div className="h-5 w-5 rounded-full border border-light-gray" style={{ backgroundColor: v.colorHex }} />
                                            <span className="text-sm font-medium">{v.color}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-charcoal">Adet</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center rounded-xl border border-light-gray">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-sand transition-warm rounded-l-xl">
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button onClick={() => setQuantity(Math.min(variant.stock, quantity + 1))} className="px-3 py-2 hover:bg-sand transition-warm rounded-r-xl">
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {variant.stockStatus === 'in_stock' ? `${variant.stock} adet stokta` :
                                        variant.stockStatus === 'low_stock' ? `Son ${variant.stock} adet!` :
                                            variant.stockStatus === 'on_order' ? 'Sipariş üzerine' : 'Stokta yok'}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                disabled={variant.stockStatus === 'out_of_stock'}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-navy px-6 py-4 font-semibold text-white shadow-soft-md transition-warm hover:bg-navy/90 disabled:opacity-50"
                            >
                                <AnimatePresence mode="wait">
                                    {addedToCart ? (
                                        <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                            <Check className="h-5 w-5" /> Sepete Eklendi!
                                        </motion.span>
                                    ) : (
                                        <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                            <ShoppingBag className="h-5 w-5" /> Sepete Ekle
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                            <button onClick={() => setIsWishlisted(!isWishlisted)} className={`rounded-xl border-2 p-4 transition-warm ${isWishlisted ? 'border-alert-red bg-alert-red/5' : 'border-light-gray hover:border-gold'}`}>
                                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-alert-red text-alert-red' : 'text-muted-foreground'}`} />
                            </button>
                            <button className="rounded-xl border-2 border-light-gray p-4 hover:border-gold transition-warm">
                                <Share2 className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Trust */}
                        <div className="grid grid-cols-3 gap-3 rounded-xl border border-light-gray/50 bg-white p-4">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <Truck className="h-5 w-5 text-navy" />
                                <span className="text-xs text-muted-foreground">Ücretsiz Kargo</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <Shield className="h-5 w-5 text-navy" />
                                <span className="text-xs text-muted-foreground">2 Yıl Garanti</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <RotateCcw className="h-5 w-5 text-navy" />
                                <span className="text-xs text-muted-foreground">14 Gün İade</span>
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="rounded-xl border border-light-gray/50 bg-white p-6">
                            <h3 className="mb-4 font-serif text-lg font-bold text-charcoal">Teknik Özellikler</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {product.specs.widthCm > 0 && <div><span className="text-muted-foreground">Genişlik:</span> <span className="font-medium">{product.specs.widthCm} cm</span></div>}
                                {product.specs.depthCm > 0 && <div><span className="text-muted-foreground">Derinlik:</span> <span className="font-medium">{product.specs.depthCm} cm</span></div>}
                                {product.specs.heightCm > 0 && <div><span className="text-muted-foreground">Yükseklik:</span> <span className="font-medium">{product.specs.heightCm} cm</span></div>}
                                {product.specs.weightKg > 0 && <div><span className="text-muted-foreground">Ağırlık:</span> <span className="font-medium">{product.specs.weightKg} kg</span></div>}
                                <div><span className="text-muted-foreground">Malzeme:</span> <span className="font-medium">{product.specs.material}</span></div>
                                {product.specs.maxLoadKg && <div><span className="text-muted-foreground">Max Yük:</span> <span className="font-medium">{product.specs.maxLoadKg} kg</span></div>}
                            </div>
                            {product.specs.certificates.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {product.specs.certificates.map((cert) => (
                                        <span key={cert} className="rounded-full bg-sage/10 px-3 py-1 text-xs font-medium text-sage">{cert}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Description */}
            <ScrollReveal className="mt-16">
                <div className="rounded-2xl bg-white p-8 shadow-soft-sm">
                    <h2 className="mb-4 font-serif text-2xl font-bold text-charcoal">Ürün Açıklaması</h2>
                    <p className="leading-relaxed text-muted-foreground">{product.longDescription}</p>
                </div>
            </ScrollReveal>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <ScrollReveal className="mt-16 mb-16">
                    <h2 className="mb-8 font-serif text-2xl font-bold text-charcoal">Benzer Ürünler</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((rp) => (
                            <Link key={rp.id} href={`/urunler/${rp.slug}`} className="group">
                                <div className="overflow-hidden rounded-xl bg-white shadow-soft-sm hover-lift hover:shadow-card-hover">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image src={rp.images[0]?.url || ''} alt={rp.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-gold">{rp.categoryName}</p>
                                        <h3 className="mt-1 font-medium text-charcoal">{rp.name}</h3>
                                        <p className="mt-2 font-serif text-lg font-bold text-navy">{formatPrice(rp.variants[0].priceB2C)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </ScrollReveal>
            )}
        </div>
    )
}
