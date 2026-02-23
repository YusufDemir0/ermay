import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'B2B Sipariş Takip | Ermay Mobilya Bayi Portali',
    description: 'Siparişlerinizi takip edin. Kargo durumu, teslimat bilgileri ve sipariş geçmişi.',
}

export default function SiparisTakipLayout({ children }: { children: React.ReactNode }) {
    return children
}
