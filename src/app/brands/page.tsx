"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Building2 } from "lucide-react";
import Image from "next/image";

interface Brand {
    id: string;
    name: string;
    description: string;
    logo: string;
}

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch(`/api/brands?t=${Date.now()}`);
                if (!res.ok) throw new Error("Veri çekilemedi");
                const data = await res.json();
                setBrands(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const handleImageError = (brandId: string) => {
        setFailedLogos(prev => new Set(prev).add(brandId));
    };

    return (
        <div className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Markalarımız</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Dünyaca ünlü ve güvenilir markaların yetkili distribütörü olarak hizmet veriyoruz.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                            <Loader2 size={32} className="animate-spin text-primary-600 mb-4" />
                            <p className="text-slate-500">Markalar yükleniyor...</p>
                        </div>
                    ) : brands.length > 0 ? (
                        brands.map((brand, index) => (
                            <motion.div
                                key={brand.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="h-28 bg-slate-50 rounded-xl mb-4 flex items-center justify-center p-4 border border-slate-100 overflow-hidden">
                                    {brand.logo && !failedLogos.has(brand.id) ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={brand.logo}
                                            alt={brand.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                            onError={() => handleImageError(brand.id)}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors">
                                            <Building2 size={32} className="mb-1" />
                                            <span className="text-xs font-medium">{brand.name}</span>
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-lg font-bold text-slate-900 mb-2">{brand.name}</h2>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{brand.description}</p>

                                <Link href={`/brands/${brand.id}`}>
                                    <button className="w-full py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all flex items-center justify-center gap-2 text-sm">
                                        Detaylı Bilgi <ArrowRight size={16} />
                                    </button>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-500">
                            <p>Henüz marka eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
