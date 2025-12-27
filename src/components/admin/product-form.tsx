"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { brands } from "@/lib/data";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

// Form Schema
const productSchema = z.object({
    name: z.string().min(2, "Ürün adı en az 2 karakter olmalıdır"),
    brandId: z.string().min(1, "Lütfen bir marka seçiniz"),
    category: z.string().min(2, "Kategori en az 2 karakter olmalıdır"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
    image: z.string().url("Geçerli bir resim URL'si giriniz").or(z.literal("")),
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

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductFormValues>({
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
                                placeholder="Ü ürün özelliklerini detaylıca yazınız..."
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Görsel URL</label>
                            <input
                                {...register("image")}
                                type="text"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all ${errors.image ? 'border-red-500' : 'border-slate-200'}`}
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                            <p className="text-xs text-slate-400 mt-1">Harici bir resim bağlantısı giriniz.</p>
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
