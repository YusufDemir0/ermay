'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, XCircle, Search, ChevronDown, Eye, ArrowLeft, LayoutGrid, ShoppingCart, FileText, CreditCard, LogOut } from 'lucide-react'
import ordersData from '@/data/orders.json'
import { formatPrice } from '@/lib/utils'

const statusConfig: Record<string, { label: string; color: string; icon: typeof Package }> = {
    pending: { label: 'Onay Bekliyor', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    confirmed: { label: 'Onaylandı', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    in_production: { label: 'Üretimde', color: 'bg-indigo-100 text-indigo-800', icon: Package },
    quality_check: { label: 'Kalite Kontrol', color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
    shipped: { label: 'Kargoda', color: 'bg-cyan-100 text-cyan-800', icon: Truck },
    delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'İptal Edildi', color: 'bg-red-100 text-red-800', icon: XCircle },
}

const statusOrder = ['pending', 'confirmed', 'in_production', 'quality_check', 'shipped', 'delivered']

const sidebarLinks = [
    { label: 'Dashboard', icon: LayoutGrid, href: '/b2b/dashboard' },
    { label: 'Sipariş Takip', icon: ShoppingCart, href: '/b2b/siparis-takip', active: true },
    { label: 'Hızlı Sipariş', icon: Package, href: '/b2b/hizli-siparis' },
    { label: 'Cari Hesap', icon: CreditCard, href: '/b2b/cari' },
]

export default function OrderTrackingPage() {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
    const [statusFilter, setStatusFilter] = useState<string>('all')

    const filteredOrders = statusFilter === 'all'
        ? ordersData
        : ordersData.filter((o) => o.status === statusFilter)

    const selectedOrderData = ordersData.find((o) => o.id === selectedOrder)

    return (
        <div className="flex min-h-screen bg-[#0F172A]">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-shrink-0 border-r border-[#334155] bg-[#1E293B] lg:block">
                <div className="p-6">
                    <Link href="/" className="font-serif text-xl font-bold text-white">ERMAY <span className="text-gold text-sm">B2B</span></Link>
                </div>
                <nav className="mt-4 space-y-1 px-3">
                    {sidebarLinks.map((link) => (
                        <Link key={link.label} href={link.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${link.active ? 'bg-gold/10 text-gold' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'}`}>
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto p-3">
                    <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#94A3B8] hover:bg-white/5 hover:text-white transition-all">
                        <LogOut className="h-4 w-4" /> Çıkış
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6 lg:p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Sipariş Takip</h1>
                        <p className="mt-1 text-sm text-[#94A3B8]">Siparişlerinizi takip edin ve detaylarını görüntüleyin</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {[{ value: 'all', label: 'Tümü' }, ...Object.entries(statusConfig).map(([k, v]) => ({ value: k, label: v.label }))].map((f) => (
                        <button key={f.value} onClick={() => setStatusFilter(f.value)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${statusFilter === f.value ? 'bg-gold text-[#0F172A]' : 'bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155]'}`}>
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto rounded-xl bg-[#1E293B] shadow-lg">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[#334155]">
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Sipariş No</th>
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Tarih</th>
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Ürünler</th>
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Tutar</th>
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Durum</th>
                                <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const sc = statusConfig[order.status] || statusConfig.pending
                                return (
                                    <tr key={order.id} className="border-b border-[#334155]/50 hover:bg-[#334155]/30 transition-all">
                                        <td className="px-6 py-4 font-mono text-sm text-gold">{order.orderNumber}</td>
                                        <td className="px-6 py-4 text-[#E2E8F0]">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</td>
                                        <td className="px-6 py-4 text-[#94A3B8]">{order.items.map(i => i.productName).join(', ').slice(0, 40)}...</td>
                                        <td className="px-6 py-4 font-medium text-white">{formatPrice(order.totalGross)}</td>
                                        <td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-medium ${sc.color}`}>{sc.label}</span></td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => setSelectedOrder(order.id)} className="flex items-center gap-1 text-gold hover:text-gold/80 text-sm font-medium">
                                                <Eye className="h-4 w-4" /> Detay
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Order Detail Modal */}
                {selectedOrderData && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedOrder(null)}>
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()}
                            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#1E293B] p-6 shadow-2xl scrollbar-thin">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">{selectedOrderData.orderNumber}</h2>
                                <button onClick={() => setSelectedOrder(null)} className="rounded-lg p-2 text-[#94A3B8] hover:bg-[#334155]"><XCircle className="h-5 w-5" /></button>
                            </div>

                            {/* Pizza Tracker */}
                            {selectedOrderData.status !== 'cancelled' && (
                                <div className="mb-8">
                                    <h3 className="mb-4 text-sm font-semibold text-[#94A3B8]">Sipariş Durumu</h3>
                                    <div className="flex items-center justify-between">
                                        {statusOrder.map((s, i) => {
                                            const reached = statusOrder.indexOf(selectedOrderData.status) >= i
                                            const isActive = selectedOrderData.status === s
                                            return (
                                                <div key={s} className="flex flex-1 items-center">
                                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${reached ? 'bg-gold text-[#0F172A]' : 'bg-[#334155] text-[#94A3B8]'
                                                        } ${isActive ? 'ring-2 ring-gold/50 ring-offset-2 ring-offset-[#1E293B]' : ''}`}>
                                                        {i + 1}
                                                    </div>
                                                    {i < statusOrder.length - 1 && (
                                                        <div className={`h-0.5 flex-1 ${reached ? 'bg-gold' : 'bg-[#334155]'}`} />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="mt-2 flex justify-between text-[10px] text-[#94A3B8]">
                                        {statusOrder.map((s) => <span key={s} className="w-12 text-center">{statusConfig[s]?.label}</span>)}
                                    </div>
                                </div>
                            )}

                            {/* Status History */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-sm font-semibold text-[#94A3B8]">Durum Geçmişi</h3>
                                <div className="space-y-3">
                                    {selectedOrderData.statusHistory.map((sh, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm">
                                            <div className="mt-1 h-2 w-2 rounded-full bg-gold" />
                                            <div>
                                                <p className="font-medium text-white">{sh.note}</p>
                                                <p className="text-xs text-[#94A3B8]">{new Date(sh.timestamp).toLocaleString('tr-TR')} – {sh.actor}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Items */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-sm font-semibold text-[#94A3B8]">Ürünler</h3>
                                <div className="space-y-2">
                                    {selectedOrderData.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between rounded-lg bg-[#0F172A] p-3">
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.productName}</p>
                                                <p className="text-xs text-[#94A3B8]">{item.variantDescription} × {item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-medium text-gold">{formatPrice(item.totalNet)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="rounded-lg bg-[#0F172A] p-4 text-sm">
                                <div className="flex justify-between mb-1"><span className="text-[#94A3B8]">Ara Toplam (Net)</span><span className="text-white">{formatPrice(selectedOrderData.subtotalNet)}</span></div>
                                <div className="flex justify-between mb-1"><span className="text-[#94A3B8]">KDV (%20)</span><span className="text-white">{formatPrice(selectedOrderData.vatAmount)}</span></div>
                                <div className="flex justify-between border-t border-[#334155] pt-2 mt-2"><span className="font-semibold text-white">Toplam</span><span className="font-bold text-gold">{formatPrice(selectedOrderData.totalGross)}</span></div>
                            </div>

                            {/* Shipping */}
                            {selectedOrderData.shipping.trackingNumber && (
                                <div className="mt-4 rounded-lg bg-[#0F172A] p-3 text-sm">
                                    <p className="text-[#94A3B8]">Kargo: <span className="text-white">{selectedOrderData.shipping.carrier}</span></p>
                                    <p className="text-[#94A3B8]">Takip No: <span className="font-mono text-gold">{selectedOrderData.shipping.trackingNumber}</span></p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </main>
        </div>
    )
}
