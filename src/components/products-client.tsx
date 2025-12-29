"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowRight, ChevronLeft, ChevronRight, Tags } from "lucide-react";
import { Button } from "@/components/button";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface ProductType {
    id: string;
    name: string;
    description: string;
    category: string;
    brandId: string;
    image: string;
}

interface Brand {
    id: string;
    name: string;
    description: string;
    logo: string;
}

interface ProductsClientProps {
    initialProducts: ProductType[];
}

const ITEMS_PER_PAGE = 12;

export function ProductsClient({ initialProducts }: ProductsClientProps) {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "Tümü";
    const initialBrandId = searchParams.get("brandId");

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [activeBrandId, setActiveBrandId] = useState<string | null>(initialBrandId);
    const [searchQuery, setSearchQuery] = useState("");
    const [brands, setBrands] = useState<Brand[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const products = initialProducts;

    // Fetch brands from API
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

    useEffect(() => {
        const category = searchParams.get("category") || "Tümü";
        const brandId = searchParams.get("brandId");
        setActiveCategory(category);
        setActiveBrandId(brandId);
        setCurrentPage(1); // Reset page on filter change
    }, [searchParams]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, activeBrandId, searchQuery]);

    const categories = ["Tümü", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === "Tümü" || product.category === activeCategory;
        const matchesBrand = !activeBrandId || product.brandId === activeBrandId;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesBrand && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const getBrandName = (id: string) => brands.find(b => b.id === id)?.name || "";

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of the page smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setActiveCategory("Tümü");
        setActiveBrandId(null);
        setSearchQuery("");
        setCurrentPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
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

                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                    {/* Brand Filter Dropdown */}
                    <div className="relative">
                        <Tags className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                            value={activeBrandId || ""}
                            onChange={(e) => setActiveBrandId(e.target.value || null)}
                            className="w-full sm:w-48 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white appearance-none cursor-pointer"
                        >
                            <option value="">Tüm Markalar</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
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
                    {paginatedProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-2"
                        >
                            {/* Premium Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                {/* Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary-50/30" />

                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-100/20 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />

                                {/* Product Image */}
                                <div className="relative w-full h-full p-6 flex items-center justify-center">
                                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500 ease-out">
                                        <Image
                                            src={product.image || "https://placehold.co/600x400?text=No+Image"}
                                            alt={product.name}
                                            fill
                                            className="object-contain drop-shadow-lg"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-700 shadow-sm border border-primary-100/50">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-slate-50/50">
                                <div className="mb-2">
                                    <span className="text-sm font-medium text-primary-600">
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
                                    <Button className="w-full justify-between group-hover:bg-primary-700 group-hover:shadow-lg transition-all duration-300">
                                        Detaylı Bilgi Al
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first, last, current, and nearby pages
                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                                        ? "bg-primary-600 text-white"
                                        : "border border-slate-200 hover:bg-slate-100"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="px-1">...</span>;
                        }
                        return null;
                    })}

                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>

                    <span className="ml-4 text-sm text-slate-500">
                        Sayfa {currentPage} / {totalPages}
                    </span>
                </div>
            )}
        </div>
    );
}
