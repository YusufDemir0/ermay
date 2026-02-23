'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Clock, Calendar, ArrowRight } from 'lucide-react'
import blogPosts from '@/data/blog-posts.json'

const categories = [...new Set(blogPosts.map((p) => p.category))]

export default function BlogList() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const filtered = useMemo(() => {
        let posts = blogPosts
        if (selectedCategory) posts = posts.filter((p) => p.category === selectedCategory)
        if (searchQuery.length >= 2) {
            const q = searchQuery.toLowerCase()
            posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
        }
        return posts
    }, [selectedCategory, searchQuery])

    const featured = blogPosts.filter((p) => p.featured).slice(0, 1)[0]

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            {/* Header */}
            <div className="mb-12 text-center">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">Blog</span>
                <h1 className="mt-3 font-serif text-3xl font-bold text-charcoal sm:text-4xl">Mobilya Dünyasından</h1>
                <p className="mt-3 text-muted-foreground">Trendler, ipuçları ve ilham verici içerikler</p>
            </div>

            {/* Featured Post */}
            {featured && !selectedCategory && !searchQuery && (
                <Link href={`/blog/${featured.slug}`} className="group mb-12 block">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl bg-white shadow-soft-md hover:shadow-card-hover transition-all duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="relative aspect-video lg:aspect-auto">
                                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">Öne Çıkan</div>
                            </div>
                            <div className="flex flex-col justify-center p-8 lg:p-12">
                                <span className="text-sm font-medium text-gold">{featured.category}</span>
                                <h2 className="mt-2 font-serif text-2xl font-bold text-charcoal lg:text-3xl">{featured.title}</h2>
                                <p className="mt-3 text-muted-foreground line-clamp-3">{featured.excerpt}</p>
                                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(featured.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readingTime} dk</span>
                                </div>
                                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-gold transition-warm">
                                    Devamını Oku <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            )}

            {/* Filters */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => setSelectedCategory(null)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-warm ${!selectedCategory ? 'bg-navy text-white' : 'bg-sand text-muted-foreground hover:bg-sand/80'}`}>
                        Tümü
                    </button>
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setSelectedCategory(cat)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-warm ${selectedCategory === cat ? 'bg-navy text-white' : 'bg-sand text-muted-foreground hover:bg-sand/80'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Yazı ara..."
                        className="rounded-lg border border-light-gray bg-white py-2 pl-9 pr-4 text-sm focus:border-gold focus:outline-none" />
                </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, i) => (
                    <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link href={`/blog/${post.slug}`} className="group block">
                            <div className="overflow-hidden rounded-xl bg-white shadow-soft-sm hover-lift hover:shadow-card-hover">
                                <div className="relative aspect-video overflow-hidden">
                                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gold">{post.category}</span>
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {post.readingTime} dk</span>
                                    </div>
                                    <h3 className="mt-2 font-serif text-lg font-bold text-charcoal line-clamp-2 group-hover:text-navy transition-warm">{post.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                                            {post.author.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="text-xs">
                                            <p className="font-medium text-charcoal">{post.author.name}</p>
                                            <p className="text-muted-foreground">{new Date(post.publishedAt).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="py-16 text-center">
                    <h2 className="font-serif text-xl font-bold text-charcoal">Sonuç bulunamadı</h2>
                    <p className="mt-2 text-muted-foreground">Farklı filtre veya arama terimi deneyin.</p>
                </div>
            )}
        </div>
    )
}
