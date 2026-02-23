import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Alışveriş Sepeti | Ermay Mobilya',
    description: 'Sepetinizdeki ürünleri inceleyin ve siparişinizi tamamlayın. Ermay Mobilya güvenli alışveriş.',
}

export default function SepetLayout({ children }: { children: React.ReactNode }) {
    return children
}
