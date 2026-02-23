"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ahmet Yilmaz",
    company: "ABC Hukuk Burosu, Istanbul",
    rating: 5,
    text: "Makam odamizi tamamen Ermay ile donattik. Kalite ve fiyat dengesi mukemmel, teslimat sureleri soz verildigi gibi.",
  },
  {
    name: "Zeynep Kaya",
    company: "Insaat Muhendisi, Ankara",
    rating: 5,
    text: "Ev ofisim icin calisma masasi ve koltugu burada aldim. Montaj ekibi cok profesyoneldi.",
  },
  {
    name: "Selim Arslan",
    company: "Selim Mobilya Ltd., Bursa (Bayi)",
    rating: 5,
    text: "5 yildir Ermay bayi agindayim. Urun kalitesi ve bayi destegi her zaman ust duzey.",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
            Referanslar
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
            Musterilerimiz Ne Diyor?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative flex flex-col rounded-[20px] bg-card p-8 shadow-soft-sm"
            >
              <Quote className="mb-4 h-8 w-8 text-gold/30" />
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="flex-1 font-serif text-base italic leading-relaxed text-charcoal/80">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-light-gray pt-4">
                <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                <p className="text-xs text-medium-gray">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
