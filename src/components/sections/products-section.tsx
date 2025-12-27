"use client";

import { motion } from "framer-motion";
import { brands } from "@/lib/data"; // Keep brands static for now or fetch too
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    brandId: string;
    image: string;
}

interface ProductsSectionProps {
    products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
    const featuredProducts = products.slice(0, 4); // Show first 4 products

    const getBrandName = (id: string) => {
        return brands.find(b => b.id === id)?.name || "Marka";
    };

    return (
        <section id="products" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Öne Çıkan Ürünler</h2>
                        <p className="text-slate-600 text-lg max-w-xl">
                            En çok tercih edilen ve mevsimsel ihtiyaçlara uygun seçilmiş ürünlerimiz.
                        </p>
                    </div>
                    <Link href="/products">
                        <Button variant="outline">Tüm Ürünleri Gör</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 group"
                        >
                            <div className="aspect-square bg-slate-50 relative overflow-hidden">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-medium text-lg group-hover:scale-105 transition-transform duration-500">
                                        Product Image
                                    </div>
                                )}
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                                    <Link href={`/products/${product.id}`}>
                                        <Button variant="secondary" size="sm" className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 shadow-lg">
                                            İncele
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="text-xs font-semibold text-primary-600 mb-2 uppercase tracking-wider">
                                    {getBrandName(product.brandId)}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">{product.category}</div>
                                    <Link href={`/products/${product.id}`} className="text-primary-600 hover:bg-primary-50 p-2 rounded-full transition-colors">
                                        <Plus size={20} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {featuredProducts.length === 0 && (
                        <div className="col-span-full text-center text-slate-500 py-12">
                            Henüz ürün eklenmemiş.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
