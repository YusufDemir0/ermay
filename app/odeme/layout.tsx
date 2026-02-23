import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Güvenli Ödeme | Ermay Mobilya',
    description: 'Ermay Mobilya güvenli ödeme sayfası. Siparişinizi hızlı ve güvenli bir şekilde tamamlayın.',
}

export default function OdemeLayout({ children }: { children: React.ReactNode }) {
    return children
}
