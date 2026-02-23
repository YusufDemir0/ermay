"use client"

import { motion } from "framer-motion"
import { Factory, Truck, Settings, Shield } from "lucide-react"

const features = [
  {
    icon: Factory,
    title: "Dogrudan Uretici",
    description: "Aracisiz fiyat, fabrika kalitesi. 27 yillik uretim tecrubesi.",
  },
  {
    icon: Truck,
    title: "Hizli Teslimat",
    description: "Turkiye genelinde 3-7 is gunu icinde teslimat.",
  },
  {
    icon: Settings,
    title: "Ozel Uretim",
    description: "Olcu ve renk secenegi ile kisisel cozum.",
  },
  {
    icon: Shield,
    title: "2 Yil Garanti",
    description: "Tum urunlerde uretici garantisi.",
  },
]

export default function WhyErmay() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
            Avantajlarimiz
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl lg:text-5xl text-balance">
            Neden Ermay?
          </h2>
          <p className="mt-3 text-medium-gray text-lg">
            1999&apos;dan bu yana guven veren kalite
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="group flex flex-col items-center rounded-[20px] bg-sand p-8 text-center transition-shadow hover:shadow-soft-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-gold transition-transform group-hover:scale-110">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-semibold text-charcoal">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-medium-gray">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
