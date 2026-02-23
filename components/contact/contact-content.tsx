"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 (212) 555 0 123",
    href: "tel:+902125550123",
  },
  {
    icon: Mail,
    label: "E-posta",
    value: "info@ermaymobilya.com",
    href: "mailto:info@ermaymobilya.com",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Organize Sanayi Bolgesi, 1. Cadde No:42, Istanbul",
    href: "#",
  },
  {
    icon: Clock,
    label: "Calisma Saatleri",
    value: "Pzt-Cmt: 08:30 - 18:00",
    href: "#",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export function ContactContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-[#1B2A4A] pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl font-bold text-white md:text-5xl"
            >
              Iletisim
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 max-w-2xl text-lg text-white/70"
            >
              Projeleriniz icin bize ulasin. Uzman ekibimiz sizinle
              iletisime gececektir.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
                  Bize Ulasin
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, i) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#C8A96E]/10">
                        <item.icon className="h-5 w-5 text-[#C8A96E]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 font-medium text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Map placeholder */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8 overflow-hidden rounded-xl border border-border"
                >
                  <iframe
                    title="Ermay Mobilya Konum"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385398.5897809314!2d28.731994399999998!3d41.0049823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm lg:p-10">
                  <h2 className="mb-2 font-serif text-2xl font-bold text-foreground">
                    Teklif Formu
                  </h2>
                  <p className="mb-8 text-sm text-muted-foreground">
                    Asagidaki formu doldurarak bizimle iletisime gecebilirsiniz.
                  </p>

                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-800"
                    >
                      Mesajiniz basariyla gonderildi. En kisa surede
                      donus yapacagiz.
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Ad Soyad *
                        </label>
                        <input
                          required
                          type="text"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                          placeholder="Adiniz Soyadiniz"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          E-posta *
                        </label>
                        <input
                          required
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                          placeholder="ornek@sirket.com"
                        />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          value={formState.phone}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              phone: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                          placeholder="+90 (5XX) XXX XX XX"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">
                          Firma
                        </label>
                        <input
                          type="text"
                          value={formState.company}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              company: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                          placeholder="Firma Adi"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Konu *
                      </label>
                      <select
                        required
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            subject: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                      >
                        <option value="">Konu Seciniz</option>
                        <option value="teklif">Teklif Talebi</option>
                        <option value="bilgi">Bilgi Talebi</option>
                        <option value="bayi">Bayi Basvurusu</option>
                        <option value="diger">Diger</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Mesaj *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#C8A96E] focus:outline-none focus:ring-1 focus:ring-[#C8A96E]"
                        placeholder="Mesajinizi buraya yazin..."
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#C8A96E] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B8994E]"
                    >
                      <Send className="h-4 w-4" />
                      Gonder
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
