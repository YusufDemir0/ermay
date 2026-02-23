"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Ermay Error:", error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
            <div className="max-w-lg">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-terracotta/10">
                    <AlertTriangle className="h-8 w-8 text-terracotta" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-charcoal">
                    Bir hata oluştu
                </h2>
                <p className="mt-3 text-medium-gray">
                    Sayfa yüklenirken beklenmeyen bir hata meydana geldi. Lütfen sayfayı
                    yenilemeyi deneyin veya ana sayfaya dönün.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-navy/90"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Tekrar Dene
                    </button>
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-xl border border-light-gray px-6 py-3 text-sm font-medium text-charcoal transition hover:bg-sand"
                    >
                        <Home className="h-4 w-4" />
                        Ana Sayfa
                    </Link>
                </div>
            </div>
        </div>
    )
}
