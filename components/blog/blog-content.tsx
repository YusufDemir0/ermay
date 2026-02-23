"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const blogPosts = [
  {
    id: 1,
    title: "2025 Ofis Mobilya Trendleri",
    excerpt:
      "Yeni yilin ofis mobilya trendlerini kesfetmek icin dogru adrestesiniz. Minimalizm, surdurulebilirlik ve teknoloji entegrasyonu on plana cikiyor.",
    image: "/mock/blog-1.jpg",
    date: "15 Ocak 2025",
    readTime: "5 dk",
    category: "Trendler",
  },
  {
    id: 2,
    title: "Ergonomik Calisma Alani Nasil Olusturulur?",
    excerpt:
      "Dogru mobilya secimi ile calisma verimliliginizi artirin. Ergonomik koltuk ve masa seciminde dikkat edilmesi gerekenler.",
    image: "/mock/blog-2.jpg",
    date: "8 Subat 2025",
    readTime: "7 dk",
    category: "Rehber",
  },
  {
    id: 3,
    title: "Surdurulebilir Mobilya Uretiminde Ermay Farki",
    excerpt:
      "Cevre dostu malzemeler ve surdurulebilir uretim surecleriyle gelecek nesillere daha yesil bir dunya birakmak icin calisiyoruz.",
    image: "/mock/blog-3.jpg",
    date: "22 Mart 2025",
    readTime: "4 dk",
    category: "Surdurulebilirlik",
  },
  {
    id: 4,
    title: "Toplanti Odasi Tasariminda Dikkat Edilmesi Gerekenler",
    excerpt:
      "Etkili toplantilarin sirri, dogru tasarlanmis toplanti odalaridir. Isik, akustik ve mobilya secimi hakkinda ipuclari.",
    image: "/mock/cat-toplanti.jpg",
    date: "5 Nisan 2025",
    readTime: "6 dk",
    category: "Rehber",
  },
  {
    id: 5,
    title: "Ev Ofisi Kurulum Rehberi",
    excerpt:
      "Evden calisma duzenine gecis yaparken dogru mobilya secimi ile verimli ve konforlu bir calisma alani olusturun.",
    image: "/mock/cat-ev-ofisi.jpg",
    date: "18 Nisan 2025",
    readTime: "8 dk",
    category: "Rehber",
  },
  {
    id: 6,
    title: "Ofis Dekorasyonunda Renk Psikolojisi",
    excerpt:
      "Renklerin calisma motivasyonu ve verimliligi uzerindeki etkilerini kesfederek ofisinizi ideal calisma ortamina donusturun.",
    image: "/mock/cat-bekleme.jpg",
    date: "2 Mayis 2025",
    readTime: "5 dk",
    category: "Trendler",
  },
];

const categories = ["Tumu", "Trendler", "Rehber", "Surdurulebilirlik"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("Tumu");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((post) => {
    const matchCategory =
      activeCategory === "Tumu" || post.category === activeCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-[#1B2A4A] pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl font-bold text-white md:text-5xl"
            >
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 max-w-2xl text-lg text-white/70"
            >
              Ofis mobilyasi dunyasindan en son trendler, rehberler ve
              ilham verici icerikler.
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-[#1B2A4A] text-white"
                        : "bg-muted text-muted-foreground hover:bg-[#1B2A4A]/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Blog yazisi ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">
                  Aramanizla eslesen yazi bulunamadi.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, i) => (
                  <motion.article
                    key={post.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeUp}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <Link href={`/blog/${post.id}`}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-[#C8A96E] px-3 py-1 text-xs font-semibold text-white">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="mb-2 font-serif text-xl font-bold text-foreground transition-colors group-hover:text-[#C8A96E]">
                          {post.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#C8A96E] transition-all group-hover:gap-2">
                          Devamini Oku
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
