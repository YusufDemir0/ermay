'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import productsData from '@/data/products.json'
import { formatPrice } from '@/lib/utils'

export default function SearchPage() {
    const [query, setQuery] = useState('')

    const results = useMemo(() => {
        if (query.length < 2) return []
        const lower = query.toLowerCase()
        return productsData.filter(
            (p) =>
                p.name.toLowerCase().includes(lower) ||
                p.categoryName.toLowerCase().includes(lower) ||
                p.tags.some((t) => t.toLowerCase().includes(lower)) ||
                p.shortDescription.toLowerCase().includes(lower)
        )
    }, [query])

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                    <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-navy transition-warm">Ana Sayfa</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">Arama</span>
                    </nav>

                    <h1 className="mb-6 font-serif text-3xl font-bold text-charcoal">Ürün Arama</h1>

                    {/* Search Input */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ürün adı, kategori veya etiket ara..."
                            className="w-full rounded-xl border border-light-gray bg-white py-4 pl-12 pr-12 text-lg focus:border-gold focus:outline-none shadow-soft-sm"
                            autoFocus
                        />
                        {query && (
                            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-charcoal">
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Results */}
                    {query.length >= 2 && (
                        <p className="mb-6 text-sm text-muted-foreground">
                            <strong className="text-charcoal">&quot;{query}&quot;</strong> için {results.length} sonuç bulundu
                        </p>
                    )}

                    <AnimatePresence>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {results.map((product, i) => (
                                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Link href={`/urunler/${product.slug}`} className="group flex gap-4 rounded-xl bg-white p-4 shadow-soft-sm hover-lift hover:shadow-card-hover">
                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                                            <Image src={product.images[0]?.url || ''} alt={product.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gold">{product.categoryName}</p>
                                            <h3 className="mt-0.5 font-medium text-charcoal group-hover:text-navy transition-warm">{product.name}</h3>
                                            <p className="mt-1 font-serif text-lg font-bold text-navy">{formatPrice(product.variants[0].priceB2C)}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>

                    {query.length >= 2 && results.length === 0 && (
                        <div className="py-16 text-center">
                            <Search className="mx-auto mb-4 h-12 w-12 text-light-gray" />
                            <h2 className="mb-2 font-serif text-xl font-bold text-charcoal">Sonuç bulunamadı</h2>
                            <p className="text-muted-foreground">Farklı anahtar kelimeler deneyin veya tüm ürünleri inceleyin.</p>
                            <Link href="/urunler" className="mt-4 inline-block rounded-xl bg-navy px-6 py-3 font-semibold text-white">Tüm Ürünler</Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
