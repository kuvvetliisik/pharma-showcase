"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/button";

interface Brand {
    id: string;
    name: string;
    description: string;
    logo: string;
}

export function BrandsSection() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch("/api/brands");
                if (res.ok) {
                    const data = await res.json();
                    setBrands(data);
                }
            } catch (error) {
                console.error("Failed to fetch brands:", error);
            }
        };
        fetchBrands();
    }, []);

    const handleImageError = (brandId: string) => {
        setFailedLogos(prev => new Set(prev).add(brandId));
    };

    return (
        <section id="brands" className="py-24 bg-gradient-to-b from-white via-primary-50/20 to-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary-100/30 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-4"
                    >
                        <Sparkles size={16} className="text-primary-600" />
                        <span className="text-sm font-medium text-primary-700">Premium Markalar</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                    >
                        Güvendiğiniz <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Markalar</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 text-lg max-w-2xl mx-auto"
                    >
                        Sağlık ve kozmetik sektörünün lider markalarının yetkili distribütörüyüz.
                    </motion.p>
                </div>

                {/* Brands Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brands.slice(0, 6).map((brand, index) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Gradient Border on Hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                            <div className="absolute inset-[1px] rounded-2xl bg-white -z-10" />

                            {/* Logo Container */}
                            <div className="aspect-[3/2] bg-gradient-to-br from-slate-50 to-primary-50/30 rounded-xl mb-6 flex items-center justify-center p-6 overflow-hidden">
                                {brand.logo && !failedLogos.has(brand.id) ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                        onError={() => handleImageError(brand.id)}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-primary-300 group-hover:text-primary-500 transition-colors">
                                        <Building2 size={48} className="mb-2" />
                                        <span className="text-lg font-bold">{brand.name}</span>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors">{brand.name}</h3>
                            <p className="text-slate-600 mb-4 line-clamp-2">{brand.description}</p>

                            <Link href={`/brands/${brand.id}`} className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 group/link">
                                Ürünleri Gör
                                <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                {brands.length > 6 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link href="/brands">
                            <Button variant="outline" size="lg" className="gap-2">
                                Tüm Markaları Gör <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
