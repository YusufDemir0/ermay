import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import InteractiveTurkeyMap from '@/components/map/turkey-map'

export const metadata = {
    title: 'Şubelerimiz | Ermay Mobilya',
    description: 'Türkiye genelindeki Ermay Mobilya mağazalarını ve şubelerini keşfedin. Size en yakın şubemizi harita üzerinden görüntüleyin.',
}

export default function BranchesPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-sand pt-16 lg:pt-24 pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="mb-12 text-center">
                        <span className="text-gold font-medium tracking-widest text-sm uppercase mb-2 block">ERMAY AĞI</span>
                        <h1 className="font-serif text-4xl font-bold text-navy md:text-5xl">Şubelerimiz</h1>
                        <p className="mt-4 text-lg text-medium-gray max-w-2xl mx-auto">
                            Ermay kalitesini yakından görün. Türkiye'nin dört bir yanındaki mağazalarımızı ziyaret edin.
                        </p>
                    </div>
                    <InteractiveTurkeyMap />
                </div>
            </main>
            <Footer />
        </>
    )
}
