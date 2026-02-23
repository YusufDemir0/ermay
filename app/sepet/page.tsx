'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, X, ChevronRight } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants'

export default function CartPage() {
    const { items, removeItem, updateQuantity, clearCart, couponCode, discount, applyCoupon, removeCoupon, getSubtotal, getVatAmount, getTotal, getItemCount } = useCartStore()
    const [couponInput, setCouponInput] = useState('')
    const [couponError, setCouponError] = useState('')

    const subtotal = getSubtotal()
    const vatAmount = getVatAmount()
    const total = getTotal()
    const itemCount = getItemCount()
    const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD

    const handleApplyCoupon = () => {
        if (couponInput.toUpperCase() === 'ERMAY10') {
            applyCoupon(couponInput)
            setCouponError('')
        } else {
            setCouponError('Geçersiz kupon kodu')
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-navy transition-warm">Ana Sayfa</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">Sepet ({itemCount})</span>
                    </nav>

                    <h1 className="mb-8 font-serif text-3xl font-bold text-charcoal">Alışveriş Sepeti</h1>

                    {items.length === 0 ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-24">
                            <ShoppingBag className="mb-4 h-16 w-16 text-light-gray" />
                            <h2 className="mb-2 font-serif text-2xl font-bold text-charcoal">Sepetiniz boş</h2>
                            <p className="mb-6 text-muted-foreground">Hemen alışverişe başlayın!</p>
                            <Link href="/urunler" className="rounded-xl bg-navy px-8 py-3 font-semibold text-white transition-warm hover:bg-navy/90">
                                Ürünleri Keşfet
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div key={`${item.productId}-${item.variantId}`} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
                                            className="flex gap-4 rounded-xl bg-white p-4 shadow-soft-sm sm:gap-6 sm:p-6">
                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-32">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div>
                                                    <h3 className="font-medium text-charcoal">{item.name}</h3>
                                                    <p className="mt-1 text-sm text-muted-foreground">{item.variantDescription}</p>
                                                </div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <div className="flex items-center rounded-lg border border-light-gray">
                                                        <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="px-2 py-1 hover:bg-sand transition-warm rounded-l-lg"><Minus className="h-3 w-3" /></button>
                                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="px-2 py-1 hover:bg-sand transition-warm rounded-r-lg"><Plus className="h-3 w-3" /></button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-serif text-lg font-bold text-navy">{formatPrice(item.price * item.quantity)}</span>
                                                        <button onClick={() => removeItem(item.productId, item.variantId)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-alert-red/10 hover:text-alert-red transition-warm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-alert-red transition-warm">Sepeti Temizle</button>
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-soft-md">
                                    <h2 className="mb-6 font-serif text-xl font-bold text-charcoal">Sipariş Özeti</h2>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between"><span className="text-muted-foreground">Ara Toplam</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-success-green"><span>Kupon İndirimi (%{discount})</span><span>-{formatPrice(subtotal * discount / 100)}</span></div>
                                        )}
                                        <div className="flex justify-between"><span className="text-muted-foreground">KDV (%20)</span><span className="font-medium">{formatPrice(vatAmount)}</span></div>
                                        <div className={`flex justify-between ${freeShipping ? 'text-success-green' : ''}`}>
                                            <span className="text-muted-foreground">Kargo</span>
                                            <span className="font-medium">{freeShipping ? 'Ücretsiz' : formatPrice(150)}</span>
                                        </div>
                                        <div className="border-t border-light-gray pt-3">
                                            <div className="flex justify-between"><span className="font-semibold text-charcoal">Toplam</span><span className="font-serif text-xl font-bold text-navy">{formatPrice(total + (freeShipping ? 0 : 150))}</span></div>
                                        </div>
                                    </div>

                                    {/* Coupon */}
                                    <div className="mt-6">
                                        {couponCode ? (
                                            <div className="flex items-center justify-between rounded-lg bg-success-green/10 px-3 py-2">
                                                <span className="flex items-center gap-1 text-sm font-medium text-success-green"><Tag className="h-4 w-4" /> {couponCode.toUpperCase()}</span>
                                                <button onClick={removeCoupon} className="text-success-green hover:text-alert-red"><X className="h-4 w-4" /></button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Kupon kodu" className="flex-1 rounded-lg border border-light-gray px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                                                <button onClick={handleApplyCoupon} className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy/90 transition-warm">Uygula</button>
                                            </div>
                                        )}
                                        {couponError && <p className="mt-1 text-xs text-alert-red">{couponError}</p>}
                                        {!couponCode && <p className="mt-2 text-xs text-muted-foreground">Demo kupon: ERMAY10</p>}
                                    </div>

                                    <Link href="/odeme" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 font-semibold text-white shadow-soft-md transition-warm hover:bg-gold/90 w-full">
                                        Ödemeye Geç <ArrowRight className="h-5 w-5" />
                                    </Link>

                                    <Link href="/urunler" className="mt-3 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-navy transition-warm">
                                        Alışverişe Devam Et
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
