"use client";

import { motion } from "framer-motion";
import { brands } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandsSection() {
    return (
        <section id="brands" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Markalarımız</h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Dünyaca ünlü ve güvenilir markaların yetkili distribütörü olarak hizmet veriyoruz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="aspect-[3/2] bg-white rounded-xl mb-6 flex items-center justify-center p-4 shadow-sm border border-slate-50 group-hover:border-primary-100 transition-colors">
                                <div className="text-2xl font-bold text-slate-300 group-hover:text-primary-500 transition-colors transform group-hover:scale-110 duration-300">
                                    {/* Placeholder for Logo */}
                                    {brand.name}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">{brand.name}</h3>
                            <p className="text-slate-600 mb-4 line-clamp-2">{brand.description}</p>

                            <Link href={`/brands/${brand.id}`} className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                                Detaylı Bilgi <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
