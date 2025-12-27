"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Brand {
    id: string;
    name: string;
    description: string;
    logo: string;
}

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch("/api/brands");
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
                        Sektörün öncü markalarını güvenle sunuyoruz.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white/50 rounded-2xl p-6 border border-slate-100 h-64 animate-pulse">
                                <div className="w-full h-32 bg-slate-200 rounded-xl mb-6"></div>
                                <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                                <div className="h-4 bg-slate-200 rounded w-full"></div>
                            </div>
                        ))
                    ) : (
                        brands.map((brand, index) => (
                            <motion.div
                                key={brand.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="h-32 bg-slate-50 rounded-xl mb-6 flex items-center justify-center p-4">
                                    <span className="text-2xl font-bold text-slate-400 group-hover:text-primary-500 transition-colors">
                                        {brand.name} Logo
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-3">{brand.name}</h2>
                                <p className="text-slate-600 mb-6">{brand.description}</p>

                                <Link href={`/brands/${brand.id}`}>
                                    <button className="w-full py-3 px-4 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all flex items-center justify-center gap-2">
                                        Ürünleri İncele <ArrowRight size={18} />
                                    </button>
                                </Link>
                            </motion.div>
                        )))}
                </div>
            </div>
        </div>
    );
}
