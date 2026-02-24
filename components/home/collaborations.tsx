"use client"

import { motion } from "framer-motion"

const partners = [
    "Hilton",
    "Acıbadem",
    "Türk Telekom",
    "Garanti BBVA",
    "Şişecam",
    "Trendyol",
    "Türk Hava Yolları",
    "Ziraat Bankası",
    "Ford Otosan",
    "Aselsan"
]

export default function Collaborations() {
    return (
        <section className="bg-cream py-16 lg:py-24 overflow-hidden border-y border-light-gray/60">
            <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
                <span className="text-gold font-medium tracking-widest text-xs uppercase mb-2 block">GÜVEN</span>
                <h2 className="font-serif text-3xl font-bold text-navy">Değerli İş Birliklerimiz</h2>
                <p className="mt-4 text-medium-gray text-base max-w-2xl mx-auto">
                    Sektörünün öncü markaları ofis ve yaşam alanlarında Ermay Mobilya kalitesini tercih ediyor.
                </p>
            </div>

            <div className="relative flex w-full overflow-hidden bg-white py-12 shadow-soft-sm hidden-scrollbar">
                {/* Gradients blending with white background of the strip */}
                <div className="absolute left-0 top-0 z-10 w-32 h-full bg-gradient-to-r from-white to-transparent"></div>
                <div className="absolute right-0 top-0 z-10 w-32 h-full bg-gradient-to-l from-white to-transparent"></div>

                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    className="flex whitespace-nowrap items-center gap-16 sm:gap-24 px-8"
                >
                    {/* Double the array for seamless scroll loop */}
                    {[...partners, ...partners].map((partner, index) => (
                        <div key={`${partner}-${index}`} className="flex items-center justify-center shrink-0 min-w-[120px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <span className="font-serif text-2xl font-bold text-charcoal/80 hover:text-navy transition-colors">{partner}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
