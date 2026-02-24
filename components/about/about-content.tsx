"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Shield, CheckCircle2 } from "lucide-react"
import heroBg from "@/public/mock/hero-bg.jpg"

const timeline = [
  { year: 1999, title: "Kurulus", description: "Kocaeli'nde kucuk bir atolyeyle yolculuk basladi" },
  { year: 2005, title: "Fabrika Genislemesi", description: "Uretim kapasitesi 3 katina cikti" },
  { year: 2010, title: "Deneyim Merkezleri", description: "Turkiye genelinde 50+ sube" },
  { year: 2018, title: "Urun Yelpazesi", description: "Ev mobilyalari segmentine giris" },
  { year: 2024, title: "Dijital Donusum", description: "ERP ve e-ticaret platformuna gecis" },
  { year: 2026, title: "Yeni Platform", description: "B2B + B2C entegre dijital ekosistem" },
]

const certificates = ["ISO 9001", "TSE", "CE Uygunluk", "Turk Mali"]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
}

export default function AboutContent() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden py-32 lg:py-40">
        <Image
          src={heroBg}
          alt="Ermay Mobilya fabrika"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <motion.div {...fadeUp} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Hikayemiz
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            1999&apos;dan Beri Turk Mobilyasina Deger Katiyoruz
          </h1>
        </motion.div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="grid gap-12 md:grid-cols-2"
          >
            {[
              {
                title: "Misyonumuz",
                text: "Uretim kalitemizi her musteriye dogrudan ulastirmak. Aracisiz, dururust ve surdurulebilir bir is modeli ile Turkiye'nin dort bir yanina ulasiyoruz.",
              },
              {
                title: "Vizyonumuz",
                text: "Turkiye'nin en guvenilir mobilya tedarik platformu olmak. B2B ve B2C kanallarda lider, dijital donusumuyla sektore yon veren bir marka.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 },
                }}
                className="rounded-[20px] bg-card p-8 shadow-soft-sm lg:p-10"
              >
                <h2 className="font-serif text-2xl font-semibold text-charcoal">
                  {item.title}
                </h2>
                <div className="mt-3 h-px w-12 bg-gold" />
                <p className="mt-4 text-base leading-relaxed text-medium-gray">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
              Tarihcemiz
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
              Yolculugumuz
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-gold/30 md:left-1/2" />

            <div className="flex flex-col gap-8">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 top-1 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <span className="h-3 w-3 rounded-full bg-gold shadow-gold-glow" />
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="font-serif text-2xl font-bold text-gold">
                      {event.year}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-charcoal">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-medium-gray">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
              Kalite
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
              Sertifikalar ve Belgeler
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="flex flex-col items-center gap-3 rounded-[20px] bg-sand p-6 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold">
                  {cert.includes("ISO") ? (
                    <Award className="h-7 w-7" />
                  ) : cert.includes("TSE") ? (
                    <Shield className="h-7 w-7" />
                  ) : (
                    <CheckCircle2 className="h-7 w-7" />
                  )}
                </div>
                <span className="text-sm font-semibold text-charcoal">{cert}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
