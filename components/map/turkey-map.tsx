"use client"

import React, { useState } from 'react';
import TurkeyMap from 'turkey-map-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

interface Branch {
    id: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    email: string;
}

const mockBranches: Branch[] = [
    { id: '1', name: 'Ermay Kocaeli Merkez', city: 'Kocaeli', address: 'Sanayi Mah. Mobilyacılar Sok. No:1 İzmit', phone: '0532 419 41 51', email: 'kocaeli@ermaymobilya.com' },
    { id: '2', name: 'Ermay İstanbul Showroom', city: 'İstanbul', address: 'Maslak Mah. Büyükdere Cad. No:255 Sarıyer', phone: '0212 555 44 33', email: 'istanbul@ermaymobilya.com' },
    { id: '3', name: 'Ermay Ankara Bölge Müdürlüğü', city: 'Ankara', address: 'Mustafa Kemal Mah. Dumlupınar Bulv. No:100 Çankaya', phone: '0312 444 33 22', email: 'ankara@ermaymobilya.com' },
    { id: '4', name: 'Ermay İzmir Mağaza', city: 'İzmir', address: 'Alsancak Mah. Kıbrıs Şehitleri Cad. No:50 Konak', phone: '0232 333 22 11', email: 'izmir@ermaymobilya.com' },
    { id: '5', name: 'Ermay Bursa Şube', city: 'Bursa', address: 'Odunluk Mah. Akademi Cad. No:10 Nilüfer', phone: '0224 222 11 00', email: 'bursa@ermaymobilya.com' }
];

export default function InteractiveTurkeyMap() {
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    // Active city is selected if any, otherwise hovered
    const activeCity = selectedCity || hoveredCity;
    const activeBranches = mockBranches.filter(b => b.city === activeCity);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-soft-sm border border-light-gray relative overflow-hidden flex items-center justify-center min-h-[400px]">
                <div className="w-full max-w-[800px]">
                    <TurkeyMap
                        customStyle={{ idleColor: "#f3f4f6", hoverColor: "#001f3f" }}
                        onHover={(params: any) => setHoveredCity(params.name)}
                        onClick={(params: any) => setSelectedCity(params.name)}
                    />
                </div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-4">
                <div className="bg-navy rounded-2xl p-6 text-primary-foreground shadow-soft-md">
                    <h2 className="font-serif text-2xl font-bold mb-2">
                        {activeCity ? `${activeCity} Şubeleri` : 'Türkiye Geneli Şubelerimiz'}
                    </h2>
                    <p className="text-primary-foreground/80 text-sm">
                        {activeCity
                            ? `Seçilen şehirdeki mağazalarımızı aşağıda bulabilirsiniz.`
                            : `Harita üzerinden bir şehir seçerek veya üzerine gelerek şubelerimizi görüntüleyebilirsiniz.`}
                    </p>
                </div>

                <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {activeBranches.length > 0 ? (
                            activeBranches.map((branch) => (
                                <motion.div
                                    key={branch.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white text-charcoal border border-light-gray rounded-2xl p-5 shadow-soft-sm hover:border-gold transition-colors"
                                >
                                    <h3 className="font-bold text-lg text-navy mb-3 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-gold" />
                                        {branch.name}
                                    </h3>
                                    <div className="space-y-3 text-sm text-medium-gray">
                                        <p className="flex items-start gap-2">
                                            <Navigation className="h-4 w-4 mt-0.5 shrink-0" />
                                            <span>{branch.address}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 shrink-0" />
                                            <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors">{branch.phone}</a>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 shrink-0" />
                                            <a href={`mailto:${branch.email}`} className="hover:text-gold transition-colors">{branch.email}</a>
                                        </p>
                                    </div>
                                    <button className="mt-4 w-full py-2 bg-cream text-navy rounded-xl font-medium text-sm hover:bg-gold hover:text-white transition-colors">
                                        Yol Tarifi Al
                                    </button>
                                </motion.div>
                            ))
                        ) : activeCity ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white border border-light-gray rounded-2xl p-8 text-center"
                            >
                                <p className="text-medium-gray font-medium">Bu şehirde henüz şubemiz bulunmamaktadır.</p>
                                <p className="text-sm mt-2 text-charcoal/60">Ancak Türkiye'nin her yerine ücretsiz kargo hizmetimiz mevcuttur.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white border border-light-gray rounded-2xl p-8 text-center"
                            >
                                <p className="text-medium-gray">Şehir seçiniz...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
