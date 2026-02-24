import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import InteractiveTurkeyMap from '@/components/map/turkey-map'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: 'Şubelerimiz | Ermay Mobilya',
    description: 'Türkiye genelindeki Ermay Mobilya mağazalarını ve deneyim merkezlerini harita üzerinden keşfedin.',
}

export default function BranchesPage() {
    return (
        <div className="bg-cream">
            <Navbar />
            <main className="min-h-screen pt-24 pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header text */}
                    <div className="mb-12 text-center md:mb-16">
                        <span className="text-gold font-medium tracking-widest text-sm uppercase mb-3 block">ERMAY AĞI</span>
                        <h1 className="font-serif text-4xl font-bold text-navy md:text-5xl lg:text-6xl text-balance">
                            Türkiye'nin Her Yerindeyiz
                        </h1>
                        <p className="mt-6 text-lg text-medium-gray max-w-2xl mx-auto">
                            Ermay kalitesini yakından deneyimleyin. Harita üzerinden size en yakın
                            deneyim merkezini bulabilir veya tüm şubelerimizi inceleyebilirsiniz.
                        </p>
                    </div>

                    {/* The Map Component */}
                    <InteractiveTurkeyMap />

                    {/* B2C Experience Promo */}
                    <div className="mt-24 grid gap-8 md:grid-cols-2 items-center rounded-3xl bg-white p-8 md:p-12 shadow-soft-xl border border-light-gray/50">
                        <div className="order-2 md:order-1 space-y-6">
                            <h3 className="font-serif text-3xl font-bold text-charcoal">Mimari Destek ve Ücretsiz Teslimat</h3>
                            <p className="text-medium-gray text-lg leading-relaxed">
                                Tüm şubelerimizde iç mimarlarımızla fikir alışverişi yapabilir, mobilyalarınızı 3D projelendirerek ofisinize en uygun kombinasyonları deneyebilirsiniz. Ayrıca, Türkiye'nin her noktasına teslimat hizmetimiz mevcuttur.
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4">
                                <Link href="/iletisim" className="inline-flex items-center justify-center rounded-full bg-navy px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-charcoal hover:scale-105">
                                    Mimari Randevu
                                </Link>
                                <Link href="/urunler" className="inline-flex items-center justify-center rounded-full bg-sand px-8 py-3.5 text-sm font-bold text-navy transition-all hover:bg-gold hover:text-white hover:scale-105">
                                    Koleksiyonu Keşfet
                                </Link>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner">
                            <Image
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                                alt="Ermay VIP Mimari Destek"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
