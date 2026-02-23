import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'B2B Cari Hesap | Ermay Mobilya Bayi Portali',
    description: 'Cari hesap hareketlerinizi görüntüleyin. Bakiye, kredi limiti ve ödeme geçmişi.',
}

export default function CariLayout({ children }: { children: React.ReactNode }) {
    return children
}
