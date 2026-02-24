"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, ArrowRight, Gift } from "lucide-react"

export default function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [isSubscribed, setIsSubscribed] = useState(false)

    useEffect(() => {
        // Check local storage to see if the user closed the popup recently
        const checkPopupStatus = () => {
            const closedAt = localStorage.getItem("ermayPromoClosedTime")
            if (closedAt) {
                const timePassed = new Date().getTime() - parseInt(closedAt, 10)
                // If less than 24 hours have passed, don't show
                if (timePassed < 24 * 60 * 60 * 1000) {
                    return
                }
            }

            // Show after 3 seconds
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 3000)

            return () => clearTimeout(timer)
        }

        checkPopupStatus()
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem("ermayPromoClosedTime", new Date().getTime().toString())
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setIsSubscribed(true)
        setTimeout(() => {
            handleClose()
        }, 2500)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl z-10 flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-charcoal hover:bg-white hover:text-navy transition-colors backdrop-blur-sm shadow-sm"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Image Side */}
                        <div className="hidden md:block md:w-1/2 relative bg-navy overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-80"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop')",
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/50">
                                        <Gift className="h-5 w-5 text-gold" />
                                    </div>
                                    <span className="text-gold font-medium uppercase tracking-widest text-sm">Özel Fırsat</span>
                                </div>
                                <h3 className="font-serif text-3xl font-bold text-white mb-2">Ermay Ailesine Katılın</h3>
                                <p className="text-white/80">Yeni koleksiyonlar, dekorasyon fikirleri ve sadece abonelere özel indirimlerden ilk siz haberdar olun.</p>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-cream">
                            {!isSubscribed ? (
                                <>
                                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 font-semibold text-gold text-sm max-w-fit">
                                        İlk Siparişe Özel
                                    </div>
                                    <h2 className="font-serif text-4xl font-bold text-navy mb-4">
                                        %10 İndirim <span className="text-gold">Kazanın</span>
                                    </h2>
                                    <p className="text-medium-gray mb-8">
                                        E-posta bültenimize abone olun, ilk alışverişinizde geçerli %10 indirim kodunuz anında mailinize gelsin.
                                    </p>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-medium-gray" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="E-posta adresiniz"
                                                className="w-full rounded-xl border border-light-gray bg-white py-4 pl-12 pr-4 text-charcoal outline-none transition-all focus:border-gold focus:ring-1 focus:ring-gold"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-navy py-4 font-semibold text-white transition-all hover:bg-navy/90 hover:shadow-md"
                                        >
                                            Bültene Abone Ol
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </form>
                                    <p className="mt-4 text-center text-xs text-medium-gray">
                                        Abone olarak <a href="#" className="underline hover:text-gold">Aydınlatma Metni</a>'ni kabul etmiş olursunuz.
                                    </p>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-8"
                                >
                                    <div className="h-20 w-20 rounded-full bg-sage/20 flex items-center justify-center mb-6">
                                        <Mail className="h-10 w-10 text-sage" />
                                    </div>
                                    <h2 className="font-serif text-3xl font-bold text-navy mb-4">Teşekkürler!</h2>
                                    <p className="text-medium-gray text-lg">
                                        İndirim kodunuz <strong>{email}</strong> adresine başarıyla gönderildi.
                                    </p>
                                    <p className="mt-4 text-sm text-charcoal/60">Pencere birazdan kapanacaktır...</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
