import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import productsData from '@/data/products.json'
import ProductDetailView from '@/components/product/product-detail-view'

export function generateStaticParams() {
    return productsData.map((product) => ({
        slug: product.slug,
    }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = productsData.find((p) => p.slug === slug)

    if (!product) return notFound()

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                <ProductDetailView product={product} />
            </main>
            <Footer />
        </>
    )
}
