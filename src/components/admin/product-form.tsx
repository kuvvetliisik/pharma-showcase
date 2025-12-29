"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Brand {
    id: string;
    name: string;
    description: string;
    logo: string;
}

// Form Schema
const productSchema = z.object({
    name: z.string().min(2, "Ürün adı en az 2 karakter olmalıdır"),
    brandId: z.string().min(1, "Lütfen bir marka seçiniz"),
    category: z.string().min(2, "Kategori en az 2 karakter olmalıdır"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
    image: z.string().optional(),
    price: z.string().optional(),
    stock: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: ProductFormValues & { id?: string };
    buttonText?: string;
    isEdit?: boolean;
}

export function ProductForm({ initialData, buttonText = "Kaydet", isEdit = false }: ProductFormProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
    const [isUploading, setIsUploading] = useState(false);

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

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData || {
            name: "",
            brandId: "",
            category: "",
            description: "",
            image: "",
            price: "",
            stock: ""
        }
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Geçersiz dosya tipi. JPEG, PNG, WebP veya GIF olmalıdır.");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Dosya çok büyük. Maksimum 5MB olabilir.");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'products');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setValue('image', data.url);
                setImagePreview(data.url);
                toast.success("Görsel başarıyla yüklendi!");
            } else {
                const error = await response.json();
                toast.error(error.error || "Yükleme başarısız oldu.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Görsel yüklenirken bir hata oluştu.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setValue('image', '');
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = async (data: ProductFormValues) => {
        try {
            const url = isEdit && initialData?.id
                ? `/api/products/${initialData.id}`
                : '/api/products';

            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success(isEdit ? "Ürün başarıyla güncellendi ve kaydedildi!" : "Yeni ürün veritabanına eklendi!");
                router.push("/admin/products");
                router.refresh();
            } else {
                toast.error("İşlem sırasında bir hata oluştu.");
            }
        } catch (error) {
            console.error("Form error:", error);
            toast.error("Sunucuya bağlanılamadı.");
        }
    };

    return (
        <div className="max-w-3xl">
            <div className="mb-6">
                <Link href="/admin/products" className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm mb-4 transition-colors">
                    <ArrowLeft size={16} />
                    Listeye Dön
                </Link>
                <h1 className="text-2xl font-bold text-slate-800">
                    {isEdit ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
                </h1>
                <p className="text-slate-500">
                    {isEdit ? "Mevcut ürün bilgilerini güncelleyin." : "Sisteme yeni bir ürün tanıtın."}
                </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Ürün Adı</label>
                            <input
                                {...register("name")}
                                type="text"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
                                placeholder="Örn: Cire Aseptine Vazelin"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Brand Selection */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Marka</label>
                            <select
                                {...register("brandId")}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all bg-white ${errors.brandId ? 'border-red-500' : 'border-slate-200'}`}
                            >
                                <option value="">Marka Seçiniz</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                            {errors.brandId && <p className="text-red-500 text-xs mt-1">{errors.brandId.message}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                            <input
                                {...register("category")}
                                type="text"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all ${errors.category ? 'border-red-500' : 'border-slate-200'}`}
                                placeholder="Örn: Cilt Bakımı"
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                            <textarea
                                {...register("description")}
                                rows={4}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all ${errors.description ? 'border-red-500' : 'border-slate-200'}`}
                                placeholder="Ürün özelliklerini detaylıca yazınız..."
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Ürün Görseli</label>

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={handleFileUpload}
                                className="hidden"
                            />

                            {imagePreview ? (
                                <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-slate-200 group">
                                    <Image
                                        src={imagePreview}
                                        alt="Ürün görseli"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="w-full h-48 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? (
                                        <>
                                            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm text-slate-500">Yükleniyor...</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-3 bg-slate-100 rounded-full">
                                                <Upload size={24} className="text-slate-400" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-slate-600">Görsel yüklemek için tıklayın</p>
                                                <p className="text-xs text-slate-400 mt-1">JPEG, PNG, WebP veya GIF (maks. 5MB)</p>
                                            </div>
                                        </>
                                    )}
                                </button>
                            )}

                            {/* Hidden input for form value */}
                            <input type="hidden" {...register("image")} />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            size="lg"
                            isLoading={isSubmitting}
                            className="w-full md:w-auto min-w-[150px]"
                        >
                            <Save size={18} className="mr-2" />
                            {buttonText}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
