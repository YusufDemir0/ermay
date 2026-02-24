"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, ArrowRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

const footerLinks = {
  urunler: {
    title: "Urunler",
    links: [
      { label: "Makam Mobilyalari", href: "/urunler?kategori=makam-mobilyalari" },
      { label: "Personel Masalari", href: "/urunler?kategori=personel-masalari" },
      { label: "Toplanti Mobilyalari", href: "/urunler?kategori=toplanti-mobilyalari" },
      { label: "Bekleme Koltuklari", href: "/urunler?kategori=bekleme-koltuklari" },
      { label: "Ev Ofisi", href: "/urunler?kategori=ev-ofisi" },
      { label: "Ozel Uretim", href: "/urunler?kategori=ozel-uretim" },
    ],
  },
  kurumsal: {
    title: "Kurumsal",
    links: [
      { label: "Hakkimizda", href: "/hakkimizda" },
      { label: "Subelerimiz", href: "/subelerimiz" },
      { label: "Blog", href: "/blog" },
      { label: "Kariyer", href: "/kariyer" },
    ],
  },
  destek: {
    title: "Destek",
    links: [
      { label: "Iletisim", href: "/iletisim" },
      { label: "Sikca Sorulan Sorular", href: "/sss" },
      { label: "Kargo ve Teslimat", href: "/kargo" },
      { label: "Iade Politikasi", href: "/iade" },
      { label: "Garanti Sartlari", href: "/garanti" },
    ],
  },
}

export default function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      {/* Gold separator line */}
      <div className="h-1 bg-gold" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-tight text-primary-foreground">
                ERMAY
              </span>
              <span className="ml-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                Mobilya
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              1999&apos;dan bu yana Kocaeli&apos;den Turkiye&apos;ye kaliteli ofis ve ev mobilyalari
              uretiyoruz. Ureticiden dogrudan, aracisiz fiyat avantaji.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">
                Bultenimize Abone Olun
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  aria-label="Abone ol"
                  className="rounded-xl bg-gold px-4 py-2.5 text-primary-foreground transition-colors hover:bg-gold/90"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact + Social */}
        <div className="mt-12 flex flex-col gap-6 border-t border-primary-foreground/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70">
            <a href="tel:+905324194151" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="h-4 w-4" />
              0532 419 41 51
            </a>
            <a href="mailto:erbayofis@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="h-4 w-4" />
              erbayofis@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Kocaeli, Turkiye
            </span>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="rounded-full border border-primary-foreground/20 p-2.5 text-primary-foreground/60 transition-all hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Ermay Mobilya. Tum haklar saklidir.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/kvkk" className="hover:text-gold transition-colors">KVKK</Link>
            <Link href="/gizlilik" className="hover:text-gold transition-colors">Gizlilik Politikasi</Link>
            <Link href="/cerez" className="hover:text-gold transition-colors">Cerez Politikasi</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
