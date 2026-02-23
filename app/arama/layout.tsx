import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Ürün Arama | Ermay Mobilya',
    description: 'Ermay Mobilya ürün kataloğunda arama yapın. Ofis mobilyaları, makam takımları, personel masaları ve daha fazlası.',
}

export default function AramaLayout({ children }: { children: React.ReactNode }) {
    return children
}
