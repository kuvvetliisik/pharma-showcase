"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";

const brandSchema = z.object({
    name: z.string().min(2, "Marka adı en az 2 karakter olmalıdır"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
    logo: z.string().optional(),
});

type BrandFormValues = z.infer<typeof brandSchema>;

interface BrandFormProps {
    initialData?: BrandFormValues & { id?: string };
    buttonText?: string;
    isEdit?: boolean;
}

export function BrandForm({ initialData, buttonText = "Kaydet", isEdit = false }: BrandFormProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logo || null);
    const [isUploading, setIsUploading] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            logo: "",
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
            formData.append('type', 'brands');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setValue('logo', data.url);
                setLogoPreview(data.url);
                toast.success("Logo başarıyla yüklendi!");
            } else {
                const error = await response.json();
                toast.error(error.error || "Yükleme başarısız oldu.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Logo yüklenirken bir hata oluştu.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeLogo = () => {
        setValue('logo', '');
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

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

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Marka Logosu</label>

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleFileUpload}
                            className="hidden"
                        />

                        {logoPreview ? (
                            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-slate-200 group bg-white flex items-center justify-center p-4">
                                <Image
                                    src={logoPreview}
                                    alt="Marka logosu"
                                    fill
                                    className="object-contain p-2"
                                />
                                <button
                                    type="button"
                                    onClick={removeLogo}
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
                                className="w-full h-40 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-purple-400 hover:bg-purple-50/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                                        <span className="text-sm text-slate-500">Yükleniyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-3 bg-slate-100 rounded-full">
                                            <Upload size={24} className="text-slate-400" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-slate-600">Logo yüklemek için tıklayın</p>
                                            <p className="text-xs text-slate-400 mt-1">JPEG, PNG, WebP veya GIF (maks. 5MB)</p>
                                        </div>
                                    </>
                                )}
                            </button>
                        )}

                        {/* Hidden input for form value */}
                        <input type="hidden" {...register("logo")} />
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
