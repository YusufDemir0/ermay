'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Check, CreditCard, Truck, User, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils'

const steps = [
    { id: 1, label: 'Bilgiler', icon: User },
    { id: 2, label: 'Teslimat', icon: Truck },
    { id: 3, label: 'Ödeme', icon: CreditCard },
    { id: 4, label: 'Onay', icon: ShieldCheck },
]

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [orderComplete, setOrderComplete] = useState(false)
    const { items, getSubtotal, getVatAmount, getTotal, clearCart } = useCartStore()
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', district: '', postalCode: '',
        cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
        kvkk: false,
    })

    const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }))

    const handleComplete = () => {
        setOrderComplete(true)
        clearCart()
    }

    if (orderComplete) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-cream">
                    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-success-green/10">
                                <Check className="h-12 w-12 text-success-green" />
                            </div>
                        </motion.div>
                        <h1 className="mb-4 font-serif text-3xl font-bold text-charcoal">Siparişiniz Alındı!</h1>
                        <p className="mb-2 text-muted-foreground">Sipariş numaranız: <strong className="text-navy">ERM-2026-{String(Math.floor(Math.random() * 9000) + 1000)}</strong></p>
                        <p className="mb-8 text-sm text-muted-foreground">Siparişiniz ile ilgili bilgiler e-posta adresinize gönderilecektir.</p>
                        <div className="flex justify-center gap-4">
                            <Link href="/urunler" className="rounded-xl bg-navy px-6 py-3 font-semibold text-white transition-warm hover:bg-navy/90">Alışverişe Devam Et</Link>
                            <Link href="/" className="rounded-xl border-2 border-navy px-6 py-3 font-semibold text-navy transition-warm hover:bg-navy/5">Ana Sayfa</Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-cream">
                    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
                        <h1 className="mb-4 font-serif text-3xl font-bold text-charcoal">Sepetiniz Boş</h1>
                        <p className="mb-6 text-muted-foreground">Ödeme yapmak için sepetinize ürün ekleyin.</p>
                        <Link href="/urunler" className="rounded-xl bg-navy px-8 py-3 font-semibold text-white">Ürünleri Keşfet</Link>
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-cream">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-navy transition-warm">Ana Sayfa</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/sepet" className="hover:text-navy transition-warm">Sepet</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">Ödeme</span>
                    </nav>

                    {/* Steps */}
                    <div className="mb-10 flex items-center justify-center gap-0">
                        {steps.map((step, i) => (
                            <div key={step.id} className="flex items-center">
                                <button onClick={() => { if (step.id < currentStep) setCurrentStep(step.id) }}
                                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-warm ${step.id === currentStep ? 'bg-navy text-white' :
                                            step.id < currentStep ? 'bg-success-green/10 text-success-green' :
                                                'bg-sand text-muted-foreground'
                                        }`}>
                                    {step.id < currentStep ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                                    <span className="hidden sm:inline">{step.label}</span>
                                </button>
                                {i < steps.length - 1 && <div className={`mx-2 h-0.5 w-8 sm:w-16 ${step.id < currentStep ? 'bg-success-green' : 'bg-light-gray'}`} />}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl bg-white p-6 shadow-soft-sm sm:p-8">
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <h2 className="font-serif text-xl font-bold text-charcoal">Kişisel Bilgiler</h2>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div><label className="mb-1 block text-sm font-medium text-charcoal">Ad</label><input type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="Adınız" /></div>
                                            <div><label className="mb-1 block text-sm font-medium text-charcoal">Soyad</label><input type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="Soyadınız" /></div>
                                            <div><label className="mb-1 block text-sm font-medium text-charcoal">E-posta</label><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="ornek@email.com" /></div>
                                            <div><label className="mb-1 block text-sm font-medium text-charcoal">Telefon</label><input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="05XX XXX XX XX" /></div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="font-serif text-xl font-bold text-charcoal">Teslimat Adresi</h2>
                                        <div className="space-y-4">
                                            <div><label className="mb-1 block text-sm font-medium text-charcoal">Adres</label><textarea value={form.address} onChange={(e) => update('address', e.target.value)} rows={3} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="Teslimat adresiniz" /></div>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                <div><label className="mb-1 block text-sm font-medium text-charcoal">İl</label><input type="text" value={form.city} onChange={(e) => update('city', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" /></div>
                                                <div><label className="mb-1 block text-sm font-medium text-charcoal">İlçe</label><input type="text" value={form.district} onChange={(e) => update('district', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" /></div>
                                                <div><label className="mb-1 block text-sm font-medium text-charcoal">Posta Kodu</label><input type="text" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" /></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="font-serif text-xl font-bold text-charcoal">Ödeme Bilgileri</h2>
                                        <div className="rounded-lg border border-gold/30 bg-gold/5 p-4 text-sm text-muted-foreground">⚠️ Bu bir demo sitesidir. Gerçek ödeme bilgisi girmeyiniz.</div>
                                        <div className="space-y-4">
                                            <div><label className="mb-1 block text-sm font-medium text-charcoal">Kart Numarası</label><input type="text" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} /></div>
                                            <div><label className="mb-1 block text-sm font-medium text-charcoal">Kart Üzerindeki İsim</label><input type="text" value={form.cardName} onChange={(e) => update('cardName', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="AD SOYAD" /></div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><label className="mb-1 block text-sm font-medium text-charcoal">Son Kullanma</label><input type="text" value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="AA/YY" maxLength={5} /></div>
                                                <div><label className="mb-1 block text-sm font-medium text-charcoal">CVV</label><input type="text" value={form.cardCvv} onChange={(e) => update('cardCvv', e.target.value)} className="w-full rounded-lg border border-light-gray px-4 py-3 focus:border-gold focus:outline-none" placeholder="XXX" maxLength={3} /></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <h2 className="font-serif text-xl font-bold text-charcoal">Sipariş Onayı</h2>
                                        <p className="text-muted-foreground">Siparişinizi onaylamadan önce bilgilerinizi kontrol edin.</p>
                                        <div className="rounded-lg bg-cream p-4 text-sm space-y-1">
                                            <p><strong>Ad Soyad:</strong> {form.firstName} {form.lastName}</p>
                                            <p><strong>E-posta:</strong> {form.email}</p>
                                            <p><strong>Telefon:</strong> {form.phone}</p>
                                            <p><strong>Adres:</strong> {form.address}, {form.district}, {form.city} {form.postalCode}</p>
                                        </div>
                                        <label className="flex items-start gap-2">
                                            <input type="checkbox" checked={form.kvkk} onChange={(e) => update('kvkk', e.target.checked)} className="mt-1 h-4 w-4 rounded border-light-gray text-navy" />
                                            <span className="text-sm text-muted-foreground">KVKK Aydınlatma Metni&apos;ni okudum ve onaylıyorum. Mesafeli satış sözleşmesini kabul ediyorum.</span>
                                        </label>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="mt-8 flex justify-between">
                                    {currentStep > 1 && (
                                        <button onClick={() => setCurrentStep(currentStep - 1)} className="rounded-xl border-2 border-navy px-6 py-3 font-semibold text-navy transition-warm hover:bg-navy/5">Geri</button>
                                    )}
                                    <div className="ml-auto">
                                        {currentStep < 4 ? (
                                            <button onClick={() => setCurrentStep(currentStep + 1)} className="rounded-xl bg-navy px-8 py-3 font-semibold text-white transition-warm hover:bg-navy/90">Devam Et</button>
                                        ) : (
                                            <button onClick={handleComplete} disabled={!form.kvkk} className="rounded-xl bg-gold px-8 py-3 font-semibold text-white transition-warm hover:bg-gold/90 disabled:opacity-50">Siparişi Onayla</button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-soft-sm">
                                <h3 className="mb-4 font-serif text-lg font-bold text-charcoal">Sipariş Özeti</h3>
                                <div className="space-y-3 text-sm">
                                    {items.map((item) => (
                                        <div key={`${item.productId}-${item.variantId}`} className="flex justify-between">
                                            <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                                            <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-light-gray pt-3">
                                        <div className="flex justify-between"><span className="text-muted-foreground">Ara Toplam</span><span className="font-medium">{formatPrice(getSubtotal())}</span></div>
                                        <div className="flex justify-between"><span className="text-muted-foreground">KDV (%20)</span><span>{formatPrice(getVatAmount())}</span></div>
                                        <div className="mt-2 flex justify-between border-t pt-2"><span className="font-semibold">Toplam</span><span className="font-serif text-lg font-bold text-navy">{formatPrice(getTotal())}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
