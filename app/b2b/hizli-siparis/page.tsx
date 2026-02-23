'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Plus, Minus, ShoppingCart, Package, FileSpreadsheet, Check, LayoutGrid, CreditCard, LogOut } from 'lucide-react'
import productsData from '@/data/products.json'
import { formatPrice } from '@/lib/utils'

interface QuickOrderItem {
    productId: string
    name: string
    sku: string
    variant: string
    unitPrice: number
    quantity: number
}

const sidebarLinks = [
    { label: 'Dashboard', icon: LayoutGrid, href: '/b2b/dashboard' },
    { label: 'Sipariş Takip', icon: ShoppingCart, href: '/b2b/siparis-takip' },
    { label: 'Hızlı Sipariş', icon: Package, href: '/b2b/hizli-siparis', active: true },
    { label: 'Cari Hesap', icon: CreditCard, href: '/b2b/cari' },
]

export default function QuickOrderPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [orderItems, setOrderItems] = useState<QuickOrderItem[]>([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const searchResults = useMemo(() => {
        if (searchQuery.length < 2) return []
        const q = searchQuery.toLowerCase()
        return productsData.filter((p) =>
            p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q)
        ).slice(0, 8)
    }, [searchQuery])

    const addToOrder = (product: (typeof productsData)[number]) => {
        const variant = product.variants[0]
        const exists = orderItems.find((i) => i.productId === product.id)
        if (exists) {
            setOrderItems(orderItems.map((i) => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        } else {
            setOrderItems([...orderItems, {
                productId: product.id, name: product.name, sku: product.sku,
                variant: `${variant.color} / ${variant.fabric}`, unitPrice: variant.priceB2BNet, quantity: 1,
            }])
        }
        setSearchQuery('')
    }

    const updateQty = (productId: string, qty: number) => {
        if (qty <= 0) {
            setOrderItems(orderItems.filter((i) => i.productId !== productId))
        } else {
            setOrderItems(orderItems.map((i) => i.productId === productId ? { ...i, quantity: qty } : i))
        }
    }

    const total = orderItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
    const totalWithVat = total * 1.20

    const handlePlaceOrder = () => {
        setOrderPlaced(true)
        setTimeout(() => { setOrderPlaced(false); setOrderItems([]) }, 3000)
    }

    return (
        <div className="flex min-h-screen bg-[#0F172A]">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-shrink-0 border-r border-[#334155] bg-[#1E293B] lg:block">
                <div className="p-6"><Link href="/" className="font-serif text-xl font-bold text-white">ERMAY <span className="text-gold text-sm">B2B</span></Link></div>
                <nav className="mt-4 space-y-1 px-3">
                    {sidebarLinks.map((link) => (
                        <Link key={link.label} href={link.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${link.active ? 'bg-gold/10 text-gold' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}`}>
                            <link.icon className="h-4 w-4" />{link.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto p-3">
                    <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#94A3B8] hover:bg-white/5"><LogOut className="h-4 w-4" /> Çıkış</Link>
                </div>
            </aside>

            <main className="flex-1 p-6 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">Hızlı Sipariş</h1>
                    <p className="mt-1 text-sm text-[#94A3B8]">Ürün arayarak veya Excel yükleyerek hızlı sipariş oluşturun</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Search + Add */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ürün adı veya SKU ile ara..." className="w-full rounded-xl border border-[#334155] bg-[#1E293B] py-3 pl-12 pr-4 text-white placeholder-[#94A3B8] focus:border-gold focus:outline-none" />
                            {searchResults.length > 0 && (
                                <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-64 overflow-y-auto rounded-xl bg-[#1E293B] border border-[#334155] shadow-xl scrollbar-thin">
                                    {searchResults.map((product) => (
                                        <button key={product.id} onClick={() => addToOrder(product)} className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-[#334155]/50 transition-all">
                                            <div className="text-left">
                                                <p className="font-medium text-white">{product.name}</p>
                                                <p className="text-xs text-[#94A3B8]">{product.sku} · {product.categoryName}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gold">{formatPrice(product.variants[0].priceB2BNet)}</p>
                                                <p className="text-xs text-[#94A3B8]">Net Fiyat</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Excel Upload */}
                        <div className="rounded-xl border-2 border-dashed border-[#334155] bg-[#1E293B]/50 p-8 text-center">
                            <FileSpreadsheet className="mx-auto mb-3 h-10 w-10 text-[#94A3B8]" />
                            <p className="text-sm font-medium text-white">Excel ile Toplu Sipariş</p>
                            <p className="mt-1 text-xs text-[#94A3B8]">SKU ve adet bilgilerini içeren .xlsx dosyanızı sürükleyip bırakın</p>
                            <button className="mt-3 rounded-lg bg-[#334155] px-4 py-2 text-sm text-white hover:bg-[#475569] transition-all">Dosya Seç</button>
                        </div>

                        {/* Order Table */}
                        {orderItems.length > 0 && (
                            <div className="rounded-xl bg-[#1E293B] overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#334155]">
                                            <th className="px-4 py-3 text-left font-medium text-[#94A3B8]">Ürün</th>
                                            <th className="px-4 py-3 text-left font-medium text-[#94A3B8]">SKU</th>
                                            <th className="px-4 py-3 text-center font-medium text-[#94A3B8]">Adet</th>
                                            <th className="px-4 py-3 text-right font-medium text-[#94A3B8]">Birim Fiyat</th>
                                            <th className="px-4 py-3 text-right font-medium text-[#94A3B8]">Toplam</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderItems.map((item) => (
                                            <tr key={item.productId} className="border-b border-[#334155]/50">
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-white">{item.name}</p>
                                                    <p className="text-xs text-[#94A3B8]">{item.variant}</p>
                                                </td>
                                                <td className="px-4 py-3 font-mono text-xs text-[#94A3B8]">{item.sku}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="rounded p-1 text-[#94A3B8] hover:bg-[#334155]"><Minus className="h-3 w-3" /></button>
                                                        <span className="w-8 text-center text-white">{item.quantity}</span>
                                                        <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="rounded p-1 text-[#94A3B8] hover:bg-[#334155]"><Plus className="h-3 w-3" /></button>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right text-white">{formatPrice(item.unitPrice)}</td>
                                                <td className="px-4 py-3 text-right font-medium text-gold">{formatPrice(item.unitPrice * item.quantity)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 rounded-xl bg-[#1E293B] p-6">
                            <h3 className="mb-4 text-lg font-bold text-white">Sipariş Özeti</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-[#94A3B8]">Ürün Sayısı</span><span className="text-white">{orderItems.length}</span></div>
                                <div className="flex justify-between"><span className="text-[#94A3B8]">Toplam Adet</span><span className="text-white">{orderItems.reduce((s, i) => s + i.quantity, 0)}</span></div>
                                <div className="flex justify-between"><span className="text-[#94A3B8]">Net Toplam</span><span className="text-white">{formatPrice(total)}</span></div>
                                <div className="flex justify-between"><span className="text-[#94A3B8]">KDV (%20)</span><span className="text-white">{formatPrice(total * 0.20)}</span></div>
                                <div className="flex justify-between border-t border-[#334155] pt-2 mt-2">
                                    <span className="font-semibold text-white">Genel Toplam</span>
                                    <span className="font-bold text-gold text-lg">{formatPrice(totalWithVat)}</span>
                                </div>
                            </div>

                            <motion.button whileTap={{ scale: 0.98 }} onClick={handlePlaceOrder} disabled={orderItems.length === 0}
                                className="mt-6 w-full rounded-xl bg-gold py-3 font-semibold text-[#0F172A] transition-all hover:bg-gold/90 disabled:opacity-50 flex items-center justify-center gap-2">
                                {orderPlaced ? <><Check className="h-5 w-5" /> Sipariş Alındı!</> : <><ShoppingCart className="h-5 w-5" /> Sipariş Ver</>}
                            </motion.button>

                            <p className="mt-3 text-center text-xs text-[#94A3B8]">Sipariş sonrası onay e-postası gönderilecektir</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
