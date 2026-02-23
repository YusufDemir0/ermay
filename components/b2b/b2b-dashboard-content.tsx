"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Clock,
  FileText,
  ChevronRight,
  LogOut,
  Bell,
  User,
  Home,
  Search,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const stats = [
  {
    label: "Aktif Siparisler",
    value: "12",
    change: "+3",
    icon: ShoppingCart,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Toplam Urunler",
    value: "2,400+",
    change: "",
    icon: Package,
    color: "bg-[#C8A96E]/10 text-[#C8A96E]",
  },
  {
    label: "Aylik Ciro",
    value: "245K TL",
    change: "+12%",
    icon: TrendingUp,
    color: "bg-green-50 text-green-600",
  },
  {
    label: "Bekleyen Teslimat",
    value: "5",
    change: "",
    icon: Clock,
    color: "bg-orange-50 text-orange-600",
  },
];

const recentOrders = [
  {
    id: "SIP-2025-0042",
    product: "Prestige Makam Takimi",
    date: "22 May 2025",
    status: "Hazirlaniyor",
    statusColor: "bg-yellow-100 text-yellow-800",
    amount: "32,500 TL",
  },
  {
    id: "SIP-2025-0041",
    product: "Ergonomik Koltuk x20",
    date: "20 May 2025",
    status: "Kargoda",
    statusColor: "bg-blue-100 text-blue-800",
    amount: "48,000 TL",
  },
  {
    id: "SIP-2025-0040",
    product: "Toplanti Masasi x5",
    date: "18 May 2025",
    status: "Teslim Edildi",
    statusColor: "bg-green-100 text-green-800",
    amount: "67,500 TL",
  },
  {
    id: "SIP-2025-0039",
    product: "Personel Masa Seti x15",
    date: "15 May 2025",
    status: "Teslim Edildi",
    statusColor: "bg-green-100 text-green-800",
    amount: "52,000 TL",
  },
];

const quickProducts = [
  { name: "Prestige Makam Takimi", price: "32,500 TL", image: "/mock/product-1.jpg" },
  { name: "Ergonomik Yonetici Koltugu", price: "8,750 TL", image: "/mock/product-2.jpg" },
  { name: "Konferans Masasi 12 Kisi", price: "18,900 TL", image: "/mock/product-3.jpg" },
  { name: "Personel Calisma Masasi", price: "4,200 TL", image: "/mock/product-4.jpg" },
];

const sidebarLinks = [
  { label: "Dashboard", icon: LayoutGrid, href: "/b2b/dashboard", active: true },
  { label: "Urunler", icon: Package, href: "#" },
  { label: "Siparislerim", icon: ShoppingCart, href: "#" },
  { label: "Faturalar", icon: FileText, href: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export function B2BDashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <Link href="/" className="font-serif text-xl font-bold text-foreground">
              ERMAY <span className="text-xs font-sans font-medium text-[#C8A96E]">B2B</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted lg:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-1">
              {sidebarLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      link.active
                        ? "bg-[#1B2A4A] text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Ana Sayfaya Don
            </Link>
            <Link
              href="/b2b"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Cikis Yap
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Urun veya siparis ara..."
                className="w-72 rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#C8A96E]" />
            </button>
            <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B2A4A]">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">Demo Bayi</p>
                <p className="text-xs text-muted-foreground">Istanbul</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Hosgeldiniz, Demo Bayi
            </h1>
            <p className="mt-1 text-muted-foreground">
              Siparis ve urun durumunuzu bu panelden takip edebilirsiniz.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  {stat.change && (
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                      {stat.change}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <h2 className="font-serif text-lg font-bold text-foreground">
                    Son Siparisler
                  </h2>
                  <button className="text-sm font-medium text-[#C8A96E] hover:underline">
                    Tumu
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {order.product}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {order.id} &middot; {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`hidden rounded-full px-2.5 py-1 text-xs font-medium sm:inline-block ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          {order.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Order */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <h2 className="font-serif text-lg font-bold text-foreground">
                    Hizli Siparis
                  </h2>
                  <button className="text-sm font-medium text-[#C8A96E] hover:underline">
                    Tum Urunler
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {quickProducts.map((product) => (
                    <div
                      key={product.name}
                      className="flex items-center gap-4 px-6 py-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs font-semibold text-[#C8A96E]">
                          {product.price}
                        </p>
                      </div>
                      <button className="rounded-lg bg-[#1B2A4A] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1B2A4A]/80">
                        Ekle
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
