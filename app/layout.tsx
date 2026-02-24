import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import PromoPopup from '@/components/marketing/promo-popup'
import FloatingChatbot from '@/components/chatbot/floating-chatbot'
import JsonLd from '@/components/seo/json-ld'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ermay Mobilya – Ureticiden Ofis ve Ev Mobilyalari | 1999\'dan Beri',
  description: 'Kocaeli merkezli Ermay Mobilya ile kaliteli ofis ve ev mobilyalarini dogrudan ureticiden kesfedin. B2B bayi firsatlari ve B2C kolay alisveris.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans antialiased relative">
        {children}
        <PromoPopup />
        <FloatingChatbot />
        <Analytics />
      </body>
    </html>
  )
}
