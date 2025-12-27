"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Eye,
    AlertTriangle,
    Loader2,
    RefreshCw
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface Brand {
    id: string;
    name: string;
    description: string;
    logo: string;
}

export default function AdminBrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Delete Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState<string | null>(null);

    const fetchBrands = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/brands?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                setBrands(data);
            } else {
                toast.error("Markalar yüklenemedi.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Sunucu hatası.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const confirmDelete = (brandId: string) => {
        setBrandToDelete(brandId);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!brandToDelete) return;

        try {
            const response = await fetch(`/api/brands/${brandToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success("Marka silindi.");
                setBrands(prev => prev.filter(b => b.id !== brandToDelete));
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
                    <h1 className="text-2xl font-bold text-slate-800">Marka Yönetimi</h1>
                    <p className="text-slate-500">Toplam {brands.length} marka sistemde kayıtlı.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={fetchBrands}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                        title="Listeyi Yenile"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <Link href="/admin/brands/new" className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                        <Plus size={18} />
                        Yeni Marka
                    </Link>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Marka ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all shadow-sm"
                />
            </div>

            {/* Brands Grid */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 text-slate-400 bg-white rounded-xl border border-slate-200">
                    <Loader2 size={32} className="animate-spin mb-3" />
                    <p>Markalar yükleniyor...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBrands.map((brand) => (
                        <div key={brand.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-purple-200 hover:shadow-md transition-all">
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="h-16 w-16 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-2 overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={brand.logo || "https://placehold.co/100x50?text=Logo"} alt={brand.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="flex gap-1">
                                        <Link href={`/admin/brands/${brand.id}`} className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Düzenle">
                                            <Pencil size={18} />
                                        </Link>
                                        <button
                                            onClick={() => confirmDelete(brand.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{brand.name}</h3>
                                <p className="text-sm text-slate-500 line-clamp-2">{brand.description}</p>
                            </div>
                            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-sm">
                                <span className="text-slate-400 font-mono text-xs">ID: {brand.id}</span>
                                <Link href={`/brands/${brand.id}`} target="_blank" className="text-purple-600 font-medium hover:underline flex items-center gap-1">
                                    Sitede Gör <Eye size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {filteredBrands.length === 0 && !isLoading && (
                        <div className="col-span-full p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
                            <p>Kayıtlı marka bulunamadı.</p>
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="text-purple-600 hover:underline mt-2">
                                    Aramayı Temizle
                                </button>
                            )}
                        </div>
                    )}

                    {/* Add New Card */}
                    <Link href="/admin/brands/new" className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-purple-300 hover:bg-purple-50/10 cursor-pointer transition-all min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                            <Plus size={24} />
                        </div>
                        <span className="font-medium">Yeni Marka Ekle</span>
                    </Link>
                </div>
            )}

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
                                <h3 className="text-lg font-medium text-slate-900">Markayı Sil?</h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    Bu işlem geri alınamaz. Marka kalıcı olarak silinecektir.
                                </p>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 py-2 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Vazgeç
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
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
