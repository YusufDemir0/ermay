'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Filter, ArrowUpDown, LayoutGrid, ShoppingCart, Package, CreditCard, LogOut, TrendingDown, TrendingUp, Minus as MinusIcon } from 'lucide-react'
import cariData from '@/data/cari-hareketler.json'
import dealersData from '@/data/dealers.json'
import { formatPrice } from '@/lib/utils'

const typeConfig: Record<string, { label: string; color: string; icon: typeof TrendingDown }> = {
    siparis: { label: 'Sipariş', color: 'text-red-400', icon: TrendingDown },
    odeme: { label: 'Ödeme', color: 'text-green-400', icon: TrendingUp },
    iade: { label: 'İade', color: 'text-yellow-400', icon: TrendingUp },
    duzeltme: { label: 'Düzeltme', color: 'text-blue-400', icon: MinusIcon },
}

const sidebarLinks = [
    { label: 'Dashboard', icon: LayoutGrid, href: '/b2b/dashboard' },
    { label: 'Sipariş Takip', icon: ShoppingCart, href: '/b2b/siparis-takip' },
    { label: 'Hızlı Sipariş', icon: Package, href: '/b2b/hizli-siparis' },
    { label: 'Cari Hesap', icon: CreditCard, href: '/b2b/cari', active: true },
]

export default function CariPage() {
    const [typeFilter, setTypeFilter] = useState<string>('all')
    const dealer = dealersData[0] // Demo dealer

    const filtered = useMemo(() => {
        const data = cariData.filter((h) => h.dealerId === 'DLR-001')
        if (typeFilter === 'all') return data
        return data.filter((h) => h.type === typeFilter)
    }, [typeFilter])

    const totalBorç = cariData.filter(h => h.dealerId === 'DLR-001' && h.type === 'siparis').reduce((s, h) => s + Math.abs(h.amount), 0)
    const totalÖdeme = cariData.filter(h => h.dealerId === 'DLR-001' && (h.type === 'odeme' || h.type === 'duzeltme')).reduce((s, h) => s + h.amount, 0)

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
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Cari Hesap</h1>
                        <p className="mt-1 text-sm text-[#94A3B8]">{dealer.companyName} – Cari hesap hareketleriniz</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-[#1E293B] px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] transition-all border border-[#334155]">
                        <Download className="h-4 w-4" /> Excel İndir
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl bg-[#1E293B] p-5">
                        <p className="text-sm text-[#94A3B8]">Bakiye</p>
                        <p className="mt-1 text-2xl font-bold text-red-400">{formatPrice(dealer.currentBalance)}</p>
                        <p className="mt-1 text-xs text-[#94A3B8]">Borç</p>
                    </div>
                    <div className="rounded-xl bg-[#1E293B] p-5">
                        <p className="text-sm text-[#94A3B8]">Kredi Limiti</p>
                        <p className="mt-1 text-2xl font-bold text-white">{formatPrice(dealer.creditLimit)}</p>
                        <p className="mt-1 text-xs text-[#94A3B8]">Kullanılabilir: {formatPrice(dealer.creditLimit - dealer.currentBalance)}</p>
                    </div>
                    <div className="rounded-xl bg-[#1E293B] p-5">
                        <p className="text-sm text-[#94A3B8]">Toplam Alım (6 Ay)</p>
                        <p className="mt-1 text-2xl font-bold text-gold">{formatPrice(dealer.totalPurchase6m)}</p>
                        <p className="mt-1 text-xs text-[#94A3B8]">{dealer.orderCount6m} sipariş</p>
                    </div>
                    <div className="rounded-xl bg-[#1E293B] p-5">
                        <p className="text-sm text-[#94A3B8]">Vade</p>
                        <p className="mt-1 text-2xl font-bold text-white">{dealer.paymentTerm}</p>
                        <p className="mt-1 text-xs text-[#94A3B8]">İskonto: %{dealer.discountRate}</p>
                    </div>
                </div>

                {/* Filter */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {['all', 'siparis', 'odeme', 'iade', 'duzeltme'].map((t) => (
                        <button key={t} onClick={() => setTypeFilter(t)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${typeFilter === t ? 'bg-gold text-[#0F172A]' : 'bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155]'}`}>
                            {t === 'all' ? 'Tümü' : typeConfig[t]?.label || t}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl bg-[#1E293B] shadow-lg">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#334155]">
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Tarih</th>
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Tür</th>
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Açıklama</th>
                                <th className="px-6 py-4 text-right font-medium text-[#94A3B8]">Tutar</th>
                                <th className="px-6 py-4 text-right font-medium text-[#94A3B8]">Bakiye</th>
                                <th className="px-6 py-4 text-center font-medium text-[#94A3B8]">Vade</th>
                                <th className="px-6 py-4 text-center font-medium text-[#94A3B8]">Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((h) => {
                                const tc = typeConfig[h.type]
                                return (
                                    <tr key={h.id} className="border-b border-[#334155]/50 hover:bg-[#334155]/30 transition-all">
                                        <td className="px-6 py-4 text-[#E2E8F0] whitespace-nowrap">{new Date(h.createdAt).toLocaleDateString('tr-TR')}</td>
                                        <td className="px-6 py-4"><span className={`text-xs font-medium ${tc?.color || 'text-white'}`}>{tc?.label || h.type}</span></td>
                                        <td className="px-6 py-4 text-[#94A3B8] max-w-xs truncate">{h.description}</td>
                                        <td className={`px-6 py-4 text-right font-medium whitespace-nowrap ${h.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {h.amount >= 0 ? '+' : ''}{formatPrice(h.amount)}
                                        </td>
                                        <td className={`px-6 py-4 text-right font-medium whitespace-nowrap ${h.balance < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                            {formatPrice(h.balance)}
                                        </td>
                                        <td className="px-6 py-4 text-center text-[#94A3B8] whitespace-nowrap">{h.dueDate ? new Date(h.dueDate).toLocaleDateString('tr-TR') : '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${h.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {h.isPaid ? 'Ödendi' : 'Bekliyor'}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
