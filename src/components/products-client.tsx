"use client";

import { useState, useEffect } from "react";
import { brands } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/data"; // Or define interface locally if needed

// Interface re-definition if needed safely
interface ProductType {
    id: string;
    name: string;
    description: string;
    category: string;
    brandId: string;
    image: string;
}

interface ProductsClientProps {
    initialProducts: ProductType[];
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "Tümü";
    const initialBrandId = searchParams.get("brandId");

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [activeBrandId, setActiveBrandId] = useState<string | null>(initialBrandId);
    const [searchQuery, setSearchQuery] = useState("");

    // Use props instead of fetching
    const products = initialProducts;

    useEffect(() => {
        const category = searchParams.get("category") || "Tümü";
        const brandId = searchParams.get("brandId");
        setActiveCategory(category);
        setActiveBrandId(brandId);
    }, [searchParams]);

    const categories = ["Tümü", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === "Tümü" || product.category === activeCategory;
        const matchesBrand = !activeBrandId || product.brandId === activeBrandId;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesBrand && matchesSearch;
    });

    const getBrandName = (id: string) => brands.find(b => b.id === id)?.name;

    const clearFilters = () => {
        setActiveCategory("Tümü");
        setActiveBrandId(null);
        setSearchQuery("");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Ürünlerimiz</h1>
                    <p className="text-slate-600">
                        {activeBrandId && <span className="font-semibold text-primary-600">{getBrandName(activeBrandId)} </span>}
                        {activeBrandId ? "markasına ait " : ""}
                        Toplam {filteredProducts.length} ürün listeleniyor.
                    </p>
                    {(activeBrandId || activeCategory !== "Tümü" || searchQuery) && (
                        <button onClick={clearFilters} className="text-sm text-red-500 hover:underline mt-1">
                            Filtreleri Temizle
                        </button>
                    )}
                </div>

                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Ürün ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Categories Tab */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category
                            ? "bg-primary-600 text-white shadow-md"
                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col"
                        >
                            <div className="relative h-64 p-6 bg-white flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={product.image || "https://placehold.co/600x400?text=No+Image"}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-2">
                                    <span className="text-sm font-medium text-slate-500">
                                        {getBrandName(product.brandId)}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
                                    {product.description}
                                </p>
                                <Link href={`/products/${product.id}`} className="mt-auto">
                                    <Button className="w-full justify-between group-hover:bg-primary-700">
                                        Detaylı Bilgi Al
                                        <ArrowRight size={18} />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Ürün Bulunamadı</h3>
                    <p className="text-slate-600">
                        Seçilen kriterlere uygun ürün bulunmamaktadır.
                    </p>
                    <button
                        onClick={clearFilters}
                        className="mt-4 text-primary-600 font-medium hover:underline"
                    >
                        Filtreleri Temizle
                    </button>
                </div>
            )}
        </div>
    );
}
