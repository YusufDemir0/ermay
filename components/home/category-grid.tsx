"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const categories = [
  { slug: "makam-mobilyalari", image: "/mock/cat-makam.jpg", title: "Makam Mobilyalari", count: 47 },
  { slug: "personel-masalari", image: "/mock/cat-personel.jpg", title: "Personel Masalari", count: 83 },
  { slug: "toplanti-mobilyalari", image: "/mock/cat-toplanti.jpg", title: "Toplanti Mobilyalari", count: 31 },
  { slug: "bekleme-koltuklari", image: "/mock/cat-bekleme.jpg", title: "Bekleme Koltuklari", count: 28 },
  { slug: "ev-ofisi", image: "/mock/cat-ev-ofisi.jpg", title: "Ev Ofisi", count: 62 },
  { slug: "ozel-uretim", image: "/mock/cat-ozel.jpg", title: "Ozel Uretim", count: 0 },
]

export default function CategoryGrid() {
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
            Koleksiyonlar
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl lg:text-5xl text-balance">
            Koleksiyonumuzu Kesfedin
          </h2>
          <p className="mt-3 text-medium-gray text-lg">
            Ofisten eve, her alana ozel mobilya cozumleri
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
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                href={`/urunler?kategori=${cat.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[20px]"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent transition-colors group-hover:from-charcoal/80" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary-foreground lg:text-2xl">
                      {cat.title}
                    </h3>
                    {cat.count > 0 && (
                      <p className="mt-1 text-sm text-primary-foreground/70">
                        {cat.count} urun
                      </p>
                    )}
                  </div>
                  <span className="rounded-full bg-primary-foreground/10 p-2 backdrop-blur-sm transition-all group-hover:bg-gold group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
