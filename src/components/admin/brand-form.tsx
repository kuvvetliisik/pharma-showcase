"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const brandSchema = z.object({
    name: z.string().min(2, "Marka adı en az 2 karakter olmalıdır"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
    logo: z.string().url("Geçerli bir logo URL'si giriniz").or(z.literal("")),
});

type BrandFormValues = z.infer<typeof brandSchema>;

interface BrandFormProps {
    initialData?: BrandFormValues & { id?: string };
    buttonText?: string;
    isEdit?: boolean;
}

export function BrandForm({ initialData, buttonText = "Kaydet", isEdit = false }: BrandFormProps) {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            logo: "",
        }
    });

    const onSubmit = async (data: BrandFormValues) => {
        try {
            const url = isEdit && initialData?.id
                ? `/api/brands/${initialData.id}`
                : '/api/brands';

            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success(isEdit ? "Marka başarıyla güncellendi!" : "Yeni marka eklendi!");
                router.push("/admin/brands");
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
        <div className="max-w-2xl">
            <div className="mb-6">
                <Link href="/admin/brands" className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm mb-4 transition-colors">
                    <ArrowLeft size={16} />
                    Markalara Dön
                </Link>
                <h1 className="text-2xl font-bold text-slate-800">
                    {isEdit ? "Marka Düzenle" : "Yeni Marka Ekle"}
                </h1>
                <p className="text-slate-500">
                    {isEdit ? "Mevcut marka bilgilerini güncelleyin." : "Sisteme yeni bir marka tanıtın."}
                </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Brand Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Marka Adı</label>
                        <input
                            {...register("name")}
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
                            placeholder="Örn: Cire Aseptine"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Açıklama</label>
                        <textarea
                            {...register("description")}
                            rows={4}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all ${errors.description ? 'border-red-500' : 'border-slate-200'}`}
                            placeholder="Marka hakkında kısa bir açıklama yazınız..."
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Logo URL */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL</label>
                        <input
                            {...register("logo")}
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all ${errors.logo ? 'border-red-500' : 'border-slate-200'}`}
                            placeholder="https://example.com/logo.png"
                        />
                        {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo.message}</p>}
                        <p className="text-xs text-slate-400 mt-1">Marka logosunun harici bağlantısı (opsiyonel).</p>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button
                            type="submit"
                            size="lg"
                            isLoading={isSubmitting}
                            className="w-full md:w-auto min-w-[150px] bg-purple-600 hover:bg-purple-700"
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
