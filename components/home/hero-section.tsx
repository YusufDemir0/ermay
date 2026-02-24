"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/mock/hero-bg.jpg"
        alt="Ermay Mobilya premium ofis mekanı"
        fill
        className="object-cover"
        priority
        quality={90}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-6 py-32 lg:py-0 w-full">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-gold"
        >
          1999&apos;dan Beri Turk Mobilyasina Deger Katiyoruz
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl font-serif text-5xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-6xl lg:text-[clamp(48px,7vw,88px)] lg:leading-[1.05]"
        >
          Yasam Alaninizi
          <br />
          <span className="text-gold">Bizimle Tasarlayin</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 max-w-lg text-lg leading-relaxed text-primary-foreground/80 sm:text-xl"
        >
          Kocaeli&apos;den Turkiye&apos;ye &ndash; Ureticiden Dogrudan
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link
            href="/urunler"
            className="rounded-2xl border-2 border-gold bg-gold/10 px-8 py-4 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-gold hover:text-primary-foreground"
          >
            Koleksiyonu Kesfet
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 flex flex-wrap gap-8 lg:gap-12"
        >
          {[
            { value: "27", label: "Yil Deneyim" },
            { value: "500+", label: "Urun" },
            { value: "Turkiye", label: "Geneli Teslimat" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-gold lg:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs tracking-wide text-primary-foreground/60">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-primary-foreground/40"
        >
          <span className="text-[10px] uppercase tracking-widest">Kesfet</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
