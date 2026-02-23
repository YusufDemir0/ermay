import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Clock, Calendar, ArrowLeft, Tag } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import blogPosts from '@/data/blog-posts.json'

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = blogPosts.find((p) => p.slug === slug)
    if (!post) return notFound()

    const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-navy transition-warm">Ana Sayfa</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/blog" className="hover:text-navy transition-warm">Blog</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
                    </nav>

                    {/* Header */}
                    <header className="mb-10">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="rounded-full bg-gold/10 px-3 py-1 text-sm font-medium text-gold">{post.category}</span>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(post.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                {post.readingTime} dk okuma
                            </div>
                        </div>
                        <h1 className="font-serif text-3xl font-bold text-charcoal sm:text-4xl lg:text-5xl leading-tight">{post.title}</h1>
                        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

                        {/* Author */}
                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                                {post.author.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-charcoal">{post.author.name}</p>
                                <p className="text-xs text-muted-foreground">{post.author.role}</p>
                            </div>
                        </div>
                    </header>

                    {/* Cover Image */}
                    <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl shadow-soft-md">
                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-muted-foreground prose-a:text-navy prose-strong:text-charcoal">
                        {post.content.split('\n\n').map((block, i) => {
                            if (block.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{block.replace('# ', '')}</h1>
                            if (block.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-3">{block.replace('## ', '')}</h2>
                            return <p key={i} className="mb-4 leading-relaxed text-muted-foreground">{block.split('**').map((part, j) =>
                                j % 2 === 1 ? <strong key={j} className="text-charcoal">{part}</strong> : part
                            )}</p>
                        })}
                    </div>

                    {/* Tags */}
                    <div className="mt-10 flex items-center gap-2 flex-wrap">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {post.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-sand px-3 py-1 text-sm text-muted-foreground">#{tag}</span>
                        ))}
                    </div>

                    {/* Back */}
                    <div className="mt-10">
                        <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-warm">
                            <ArrowLeft className="h-4 w-4" /> Tüm Yazılar
                        </Link>
                    </div>

                    {/* Related */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-16 mb-16">
                            <h2 className="mb-6 font-serif text-2xl font-bold text-charcoal">İlgili Yazılar</h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                {relatedPosts.map((rp) => (
                                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="group">
                                        <div className="overflow-hidden rounded-xl bg-white shadow-soft-sm hover-lift hover:shadow-card-hover">
                                            <div className="relative aspect-video overflow-hidden">
                                                <Image src={rp.coverImage} alt={rp.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xs text-gold">{rp.category}</p>
                                                <h3 className="mt-1 font-medium text-charcoal line-clamp-2">{rp.title}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </main>
            <Footer />
        </>
    )
}
