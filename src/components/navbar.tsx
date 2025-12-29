"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface Product {
    id: string;
    name: string;
    brandId: string;
    category: string;
    description: string;
    image: string;
}

interface Brand {
    id: string;
    name: string;
    description: string;
    logo: string;
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isBrandsOpen, setIsBrandsOpen] = useState(false);
    const [activeBrandId, setActiveBrandId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Fetch products and brands from API
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, brandsRes] = await Promise.all([
                    fetch(`/api/products?t=${Date.now()}`),
                    fetch(`/api/brands?t=${Date.now()}`)
                ]);

                if (productsRes.ok) {
                    const productsData = await productsRes.json();
                    setProducts(productsData);
                }

                if (brandsRes.ok) {
                    const brandsData = await brandsRes.json();
                    setBrands(brandsData);
                }
            } catch (error) {
                console.error("Failed to fetch data for navbar:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsBrandsOpen(false);
        setActiveBrandId(null);
        setActiveCategory(null);
        setIsOpen(false);
    }, [pathname]);

    const activeBrandCategories = useMemo(() => {
        if (!activeBrandId) return [];
        return Array.from(new Set(
            products.filter(p => p.brandId === activeBrandId).map(p => p.category)
        )).sort();
    }, [activeBrandId, products]);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                scrolled || isBrandsOpen
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-slate-200/60"
                    : "bg-white/80 backdrop-blur-sm border-transparent"
            )}
            onMouseLeave={() => {
                setIsBrandsOpen(false);
                setActiveBrandId(null);
                setActiveCategory(null);
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* LEFT SECTION: Logo + Navigation Links */}
                    <div className="flex items-center gap-10">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center z-50">
                            <Link href="/" className="block">
                                <img
                                    src="/logo.png"
                                    alt="Farmavis"
                                    className="h-[160px] w-auto"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link
                                href="/"
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    pathname === "/"
                                        ? "bg-primary-50 text-primary-700"
                                        : "text-slate-600 hover:text-primary-600 hover:bg-slate-50/50"
                                )}
                            >
                                Ana Sayfa
                            </Link>

                            {/* Brands Cascading Menu */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsBrandsOpen(true)}
                            >
                                <button
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1",
                                        isBrandsOpen || pathname.includes("/brands")
                                            ? "bg-primary-50 text-primary-700"
                                            : "text-slate-600 hover:text-primary-600 hover:bg-slate-50/50"
                                    )}
                                >
                                    Markalarımız
                                    <ChevronDown
                                        size={14}
                                        className={cn(
                                            "transition-transform duration-200",
                                            isBrandsOpen ? "rotate-180" : ""
                                        )}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isBrandsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-0 bg-white rounded-xl shadow-xl border border-slate-100 py-2 mt-1 overflow-visible flex"
                                        >
                                            {/* Level 1: Brands */}
                                            <div className="w-56 border-r border-slate-50 py-1">
                                                {brands.map((brand) => (
                                                    <div
                                                        key={brand.id}
                                                        onMouseEnter={() => { setActiveBrandId(brand.id); setActiveCategory(null); }}
                                                        className={cn(
                                                            "px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors",
                                                            activeBrandId === brand.id
                                                                ? "bg-primary-50 text-primary-700 font-medium"
                                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                        )}
                                                    >
                                                        {brand.name}
                                                        {activeBrandId === brand.id && <ChevronRight size={14} />}
                                                    </div>
                                                ))}
                                                <div className="border-t border-slate-100 mt-2 pt-2 pb-1 px-4">
                                                    <Link href="/brands" className="block text-center text-xs font-semibold text-primary-600 hover:bg-primary-50 rounded-md py-2 transition-colors">
                                                        Tüm Markalar
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Level 2: Categories */}
                                            {activeBrandId && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="w-56 border-r border-slate-50 py-1 bg-slate-50/30"
                                                >
                                                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                        Kategoriler
                                                    </div>
                                                    {activeBrandCategories.map((category) => (
                                                        <Link
                                                            key={category}
                                                            href={`/products?brandId=${activeBrandId}&category=${encodeURIComponent(category)}`}
                                                            className={cn(
                                                                "px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors block",
                                                                activeCategory === category
                                                                    ? "bg-white text-primary-700 font-medium shadow-sm"
                                                                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                                                            )}
                                                            onMouseEnter={() => setActiveCategory(category)}
                                                        >
                                                            {category}
                                                            <ChevronRight size={14} className="text-slate-300" />
                                                        </Link>
                                                    ))}
                                                    {activeBrandCategories.length === 0 && (
                                                        <div className="px-4 py-4 text-sm text-slate-400 italic">
                                                            Kategori bulunamadı.
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                href="/products"
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    pathname === "/products"
                                        ? "bg-primary-50 text-primary-700"
                                        : "text-slate-600 hover:text-primary-600 hover:bg-slate-50/50"
                                )}
                            >
                                Ürünler
                            </Link>

                            <Link
                                href="/about"
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    pathname === "/about"
                                        ? "bg-primary-50 text-primary-700"
                                        : "text-slate-600 hover:text-primary-600 hover:bg-slate-50/50"
                                )}
                            >
                                Hakkımızda
                            </Link>

                            <Link
                                href="/contact"
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    pathname === "/contact"
                                        ? "bg-primary-50 text-primary-700"
                                        : "text-slate-600 hover:text-primary-600 hover:bg-slate-50/50"
                                )}
                            >
                                İletişim
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT SECTION: Contact Button + Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <Link href="/contact">
                                <Button size="sm" variant={scrolled || isBrandsOpen ? "default" : "secondary"}>İletişime Geç</Button>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-slate-600 hover:text-primary-600 focus:outline-none"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <Link
                                href="/"
                                className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Ana Sayfa
                            </Link>

                            <Link
                                href="/brands"
                                className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Markalar
                            </Link>

                            <Link
                                href="/products"
                                className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Ürünler
                            </Link>

                            <Link
                                href="/about"
                                className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Hakkımızda
                            </Link>

                            <div className="pt-4">
                                <Link href="/contact" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full">İletişime Geç</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
