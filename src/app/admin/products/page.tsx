"use client";

import { useState, useEffect, useCallback } from "react";
import { brands } from "@/lib/data";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Eye,
    AlertTriangle,
    X,
    Loader2,
    RefreshCw
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Delete Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            // Add timestamp to prevent browser caching
            const response = await fetch(`/api/products?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                toast.error("Ürün listesi alınamadı.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Sunucu hatası.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getBrandName = (brandId: string) => {
        return brands.find(b => b.id === brandId)?.name || "Marka Yok";
    };

    const confirmDelete = (productId: string) => {
        setProductToDelete(productId);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!productToDelete) return;

        try {
            const response = await fetch(`/api/products/${productToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success("Ürün silindi.");
                setProducts(prev => prev.filter(p => p.id !== productToDelete));
                setIsDeleteModalOpen(false);
            } else {
                toast.error("Silinemedi.");
            }
        } catch (error) {
            toast.error("Bir hata oluştu.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Ürün Listesi</h1>
                    <p className="text-slate-500">Toplam {products.length} ürün sistemde kayıtlı.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchProducts}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                        title="Listeyi Yenile"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <Link href="/admin/products/new" className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                        <Plus size={18} />
                        Yeni Ürün
                    </Link>
                </div>
            </div>

            {/* Simple Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Hızlı arama..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all shadow-sm"
                />
            </div>

            {/* Clean Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                        <Loader2 size={32} className="animate-spin mb-3" />
                        <p>Yükleniyor...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-slate-700">Ürün</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700">Kategori & Marka</th>
                                    <th className="px-6 py-4 font-semibold text-slate-700 text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={product.image || "https://placehold.co/100x100?text=No+Img"}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{product.name}</div>
                                                    <div className="text-xs text-slate-500 max-w-[200px] truncate">{product.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">
                                                    {product.category}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {getBrandName(product.brandId)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link href={`/products/${product.id}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sitede Gör">
                                                    <Eye size={18} />
                                                </Link>
                                                <Link href={`/admin/products/${product.id}`} className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Düzenle">
                                                    <Pencil size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => confirmDelete(product.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center text-slate-500">
                        <p>Kayıtlı ürün bulunamadı veya arama kriterlerine uymuyor.</p>
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="text-primary-600 hover:underline mt-2">
                                Aramayı Temizle
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-xl shadow-xl w-full max-w-sm relative z-10 overflow-hidden p-6"
                        >
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <AlertTriangle className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900">Ürünü Sil?</h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    Bu işlem geri alınamaz. Ürün kalıcı olarak silinecektir.
                                </p>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 py-2 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Fazgeç
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Sil
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
