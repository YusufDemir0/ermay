"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { number: 27, suffix: "", unit: "Yil", description: "Uretim Deneyimi" },
  { number: 500, suffix: "+", unit: "Urun", description: "Aktif Katalog" },
  { number: 10000, suffix: "+", unit: "Musteri", description: "Turkiye Genelinde" },
  { number: 50, suffix: "+", unit: "Bayi", description: "Bayi Agi" },
  { number: 100, suffix: "%", unit: "Yerli", description: "Uretim" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString("tr-TR")}
      {suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <section className="bg-navy py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-2 gap-8 md:grid-cols-5"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.unit}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center text-center"
            >
              <span className="font-serif text-3xl font-bold text-gold lg:text-4xl">
                <AnimatedNumber value={stat.number} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-sm font-medium text-primary-foreground/90">
                {stat.unit}
              </span>
              <span className="text-xs text-primary-foreground/50">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
