import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'B2B Hızlı Sipariş | Ermay Mobilya Bayi Portali',
    description: 'Toplu sipariş oluşturun. SKU veya ürün adıyla hızlı arama, Excel yükleme ve bayi fiyatları.',
}

export default function HizliSiparisLayout({ children }: { children: React.ReactNode }) {
    return children
}
