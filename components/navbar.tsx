"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Phone,
  Building2,
} from "lucide-react"

const menuItems = [
  {
    label: "Urunler",
    href: "/urunler",
    hasMegaMenu: true,
    megaMenu: [
      {
        title: "Ofis Mobilyalari",
        items: [
          { label: "Makam Takimlari", href: "/urunler?kategori=makam-mobilyalari" },
          { label: "Personel Masalari", href: "/urunler?kategori=personel-masalari" },
          { label: "Toplanti Masalari", href: "/urunler?kategori=toplanti-mobilyalari" },
          { label: "Kutuphane ve Vitrin", href: "/urunler" },
        ],
      },
      {
        title: "Oturma Gruplari",
        items: [
          { label: "Makam Koltuklari", href: "/urunler?kategori=makam-koltuklari" },
          { label: "Personel Koltuklari", href: "/urunler" },
          { label: "Bekleme Koltuklari", href: "/urunler?kategori=bekleme-koltuklari" },
          { label: "Lounge Koltuklari", href: "/urunler" },
        ],
      },
      {
        title: "Ev Mobilyalari",
        items: [
          { label: "Calisma Masalari", href: "/urunler?kategori=ev-ofisi" },
          { label: "Kitapliklar", href: "/urunler" },
          { label: "TV Uniteleri", href: "/urunler" },
          { label: "Konsol Masalari", href: "/urunler" },
        ],
      },
    ],
  },
  { label: "Hakkimizda", href: "/hakkimizda" },
  { label: "Projelerimiz", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "Iletisim", href: "/iletisim" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-navy text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs tracking-wide">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3" />
              0532 419 41 51
            </span>
            <span className="text-gold">|</span>
            <span>Turkiye Geneli Ucretsiz Kargo (500TL Uzeri)</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/b2b" className="flex items-center gap-1.5 text-gold hover:text-gold/80 transition-colors">
              <Building2 className="h-3 w-3" />
              Bayi Girisi
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? "glass shadow-soft-md"
            : "bg-cream"
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-navy">
                ERMAY
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                Mobilya
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.hasMegaMenu && setMegaMenuOpen(item.label)
                }
                onMouseLeave={() => setMegaMenuOpen(null)}
              >
                <Link
                  href={item.href}
                  className="group flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-navy"
                >
                  {item.label}
                  {item.hasMegaMenu && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  )}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Mega Menu */}
                {item.hasMegaMenu && (
                  <AnimatePresence>
                    {megaMenuOpen === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-2xl glass p-6 shadow-soft-lg"
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {item.megaMenu?.map((col) => (
                            <div key={col.title}>
                              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
                                {col.title}
                              </h4>
                              <ul className="flex flex-col gap-2">
                                {col.items.map((sub) => (
                                  <li key={sub.label}>
                                    <Link
                                      href={sub.href}
                                      className="text-sm text-charcoal/80 transition-colors hover:text-navy"
                                    >
                                      {sub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex gap-3 border-t border-light-gray pt-4">
                          {["Yeni Gelenler", "En Cok Satanlar", "Kampanyalar"].map(
                            (tag) => (
                              <Link
                                key={tag}
                                href="/urunler"
                                className="rounded-full bg-sand px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:bg-gold hover:text-primary-foreground"
                              >
                                {tag}
                              </Link>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Ara"
              className="rounded-xl p-2.5 text-charcoal transition-colors hover:bg-sand hover:text-navy"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/hesabim"
              aria-label="Hesabim"
              className="hidden sm:flex rounded-xl p-2.5 text-charcoal transition-colors hover:bg-sand hover:text-navy"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/sepet"
              aria-label="Sepet"
              className="relative rounded-xl p-2.5 text-charcoal transition-colors hover:bg-sand hover:text-navy"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-primary-foreground">
                0
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Menu"
              className="lg:hidden rounded-xl p-2.5 text-charcoal transition-colors hover:bg-sand"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-charcoal/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-[70] h-full w-[85%] max-w-sm bg-cream shadow-soft-lg overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-light-gray px-6 py-4">
                <span className="font-serif text-xl font-bold text-navy">
                  ERMAY
                </span>
                <button
                  aria-label="Kapat"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl p-2 text-charcoal hover:bg-sand"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col px-6 py-6 gap-1">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-charcoal transition-colors hover:bg-sand hover:text-navy"
                    >
                      {item.label}
                      {item.hasMegaMenu && (
                        <ChevronDown className="h-4 w-4 text-medium-gray" />
                      )}
                    </Link>
                    {item.hasMegaMenu &&
                      item.megaMenu?.map((col) => (
                        <div key={col.title} className="pl-4 pb-2">
                          <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
                            {col.title}
                          </p>
                          {col.items.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-lg px-3 py-1.5 text-sm text-medium-gray hover:text-navy"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              <div className="border-t border-light-gray px-6 py-4">
                <Link
                  href="/b2b"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-navy/90"
                >
                  <Building2 className="h-4 w-4" />
                  Bayi Girisi
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
