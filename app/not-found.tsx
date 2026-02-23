"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-lg"
            >
                <h1 className="font-serif text-[120px] font-bold leading-none text-navy/10">
                    404
                </h1>
                <h2 className="mt-2 font-serif text-2xl font-semibold text-charcoal">
                    Sayfa Bulunamadı
                </h2>
                <p className="mt-3 text-medium-gray">
                    Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-navy/90"
                    >
                        <Home className="h-4 w-4" />
                        Ana Sayfa
                    </Link>
                    <Link
                        href="/urunler"
                        className="flex items-center gap-2 rounded-xl border border-light-gray px-6 py-3 text-sm font-medium text-charcoal transition hover:bg-sand"
                    >
                        <Search className="h-4 w-4" />
                        Ürünleri Keşfet
                    </Link>
                </div>
                <button
                    onClick={() => typeof window !== "undefined" && window.history.back()}
                    className="mt-4 flex items-center gap-1 text-sm text-medium-gray transition hover:text-navy mx-auto"
                >
                    <ArrowLeft className="h-3 w-3" />
                    Geri dön
                </button>
            </motion.div>
        </div>
    )
}
