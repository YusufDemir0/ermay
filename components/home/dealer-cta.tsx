"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Building2, ArrowRight } from "lucide-react"

export default function DealerCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/5" />
      <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-gold/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/20 text-gold">
            <Building2 className="h-8 w-8" />
          </div>

          {/* Gold accent line */}
          <div className="mb-6 h-px w-16 bg-gold" />

          <h2 className="max-w-xl font-serif text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
            Bayi Agimiza Katilin
          </h2>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-primary-foreground/70">
            Ozel bayi fiyatlari, oncelikli stok ve satis destek programi ile buyuyun.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/bayi"
              className="flex items-center gap-2 rounded-2xl bg-gold px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-gold/90 hover:shadow-gold-glow"
            >
              Bayi Basvurusu Yap
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/b2b"
              className="rounded-2xl border border-primary-foreground/30 px-8 py-4 text-base font-medium text-primary-foreground/80 transition-all hover:border-gold hover:text-gold"
            >
              Bayi Portali Giris
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-primary-foreground/50">
            {["50+ Aktif Bayi", "Ozel Fiyat Listeleri", "Cari Hesap Destegi", "XML Entegrasyonu"].map(
              (point) => (
                <span key={point} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {point}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
