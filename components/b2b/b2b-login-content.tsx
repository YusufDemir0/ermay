"use client";

import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Building2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function B2BLoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "bayi@ermay.com" && password === "demo123") {
      router.push("/b2b/dashboard");
    } else {
      setError("Gecersiz e-posta veya sifre. Demo: bayi@ermay.com / demo123");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Image */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/mock/hero-bg.jpg"
          alt="Ermay Mobilya B2B"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1B2A4A]/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link href="/" className="font-serif text-2xl font-bold text-white">
            ERMAY
          </Link>
          <div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-white">
              B2B Bayi Portali
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
              Ozel bayi fiyatlarina erisin, toplu siparis verin ve projelerinizi
              kolayca yonetin.
            </p>
            <div className="mt-8 flex gap-8">
              {[
                { label: "Aktif Bayi", value: "150+" },
                { label: "Urun Cesidi", value: "2.400+" },
                { label: "Hizli Teslimat", value: "48 Saat" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#C8A96E]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-white/40">
            &copy; 2025 Ermay Mobilya. Tum haklari saklidir.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex w-full items-center justify-center bg-background px-6 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 lg:hidden">
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-foreground"
            >
              ERMAY
            </Link>
          </div>

          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B2A4A]">
            <Building2 className="h-7 w-7 text-[#C8A96E]" />
          </div>
          <h2 className="mt-6 font-serif text-3xl font-bold text-foreground">
            Hos Geldiniz
          </h2>
          <p className="mt-2 text-muted-foreground">
            Bayi hesabiniza giris yapin
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                  placeholder="bayi@ermay.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Sifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                  placeholder="demo123"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-[#C8A96E] focus:ring-[#C8A96E]"
                />
                <span className="text-muted-foreground">Beni hatirla</span>
              </label>
              <button type="button" className="text-sm text-[#C8A96E] hover:underline">
                Sifremi Unuttum
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C8A96E] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B8994E]"
            >
              Giris Yap
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Henuz bayi degilsiniz?{" "}
            <Link href="/iletisim" className="font-medium text-[#C8A96E] hover:underline">
              Basvuru yapin
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
