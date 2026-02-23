"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import blogPosts from "@/data/blog-posts.json"

export default function BlogPreview() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
              Blog
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
              Mobilya ve Tasarim Dunyasindan
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-gold"
          >
            Tum Yazilar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 md:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="group flex flex-col rounded-[20px] bg-card shadow-soft-sm overflow-hidden transition-shadow hover:shadow-soft-md"
            >
              <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                  {post.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-serif text-lg font-semibold text-charcoal transition-colors group-hover:text-navy">
                    {post.title}
                    <span className="block h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full mt-1" />
                  </h3>
                </Link>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-medium-gray line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-medium-gray">
                  <span>{post.author.name}</span>
                  <span className="text-light-gray">|</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} dk
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium text-navy"
          >
            Tum Yazilar
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
