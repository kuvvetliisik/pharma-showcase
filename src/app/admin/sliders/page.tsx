"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { Plus, Trash2, Image as ImageIcon, GripVertical, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface Slider {
    id: string;
    image: string;
    order: number;
    active: boolean;
}

export default function AdminSlidersPage() {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        try {
            const res = await fetch("/api/sliders?all=true");
            if (res.ok) {
                const data = await res.json();
                setSliders(data);
            }
        } catch (error) {
            console.error("Failed to fetch sliders:", error);
            toast.error("Slider'lar yüklenemedi");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Lütfen bir görsel dosyası seçin");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Dosya boyutu 5MB'dan küçük olmalıdır");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "sliders");

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) {
                throw new Error("Upload failed");
            }

            const { url } = await uploadRes.json();

            // Create new slider
            const sliderRes = await fetch("/api/sliders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: url }),
            });

            if (sliderRes.ok) {
                toast.success("Slider eklendi");
                fetchSliders();
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Slider eklenemedi");
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = "";
        }
    };

    const handleToggleActive = async (slider: Slider) => {
        try {
            const res = await fetch(`/api/sliders/${slider.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: !slider.active }),
            });

            if (res.ok) {
                toast.success(slider.active ? "Slider gizlendi" : "Slider aktif edildi");
                fetchSliders();
            }
        } catch (error) {
            console.error("Toggle error:", error);
            toast.error("İşlem başarısız");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/sliders/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success("Slider silindi");
                fetchSliders();
            } else {
                toast.error("Slider silinemedi");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Slider silinemedi");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Slider Yönetimi</h1>
                    <p className="text-slate-600 mt-1">Ana sayfa slider görsellerini yönetin</p>
                </div>

                <label className="cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isUploading}
                    />
                    <div className="inline-flex items-center justify-center gap-2 h-11 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/20 cursor-pointer transition-all">
                        {isUploading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Yükleniyor...
                            </>
                        ) : (
                            <>
                                <Plus size={20} />
                                Yeni Slider Ekle
                            </>
                        )}
                    </div>
                </label>
            </div>

            {/* Info Box */}
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
                <p className="text-sm text-primary-700">
                    <strong>Önerilen Ölçü:</strong> 1200x500px veya 16:9 oranında görseller en iyi sonucu verir.
                </p>
            </div>

            {/* Sliders Grid */}
            {sliders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Henüz slider yok</h3>
                    <p className="text-slate-600 mb-4">Ana sayfada gösterilecek slider görselleri ekleyin.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sliders.map((slider, index) => (
                        <div
                            key={slider.id}
                            className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${slider.active ? "border-slate-200" : "border-slate-300 opacity-60"
                                }`}
                        >
                            {/* Image */}
                            <div className="aspect-video relative bg-slate-100">
                                <img
                                    src={slider.image}
                                    alt={`Slider ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {!slider.active && (
                                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                                        <span className="text-white font-medium">Gizli</span>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <GripVertical size={18} />
                                    <span className="text-sm font-medium">Sıra: {index + 1}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleActive(slider)}
                                        className={`p-2 rounded-lg transition-colors ${slider.active
                                            ? "bg-green-50 text-green-600 hover:bg-green-100"
                                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                            }`}
                                        title={slider.active ? "Gizle" : "Göster"}
                                    >
                                        {slider.active ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(slider.id)}
                                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                        title="Sil"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
