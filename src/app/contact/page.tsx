"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(2, { message: "Ad soyad en az 2 karakter olmalıdır." }),
    phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz." }),
    email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
    subject: z.string().min(1, { message: "Lütfen bir konu seçiniz." }),
    message: z.string().min(10, { message: "Mesajınız en az 10 karakter olmalıdır." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Bir hata oluştu");

            toast.success("Mesajınız başarıyla gönderildi!", {
                description: "En kısa sürede sizinle iletişime geçeceğiz.",
            });
            reset();
        } catch (error) {
            toast.error("Mesaj gönderilemedi.", {
                description: "Lütfen daha sonra tekrar deneyiniz.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">İletişime Geçin</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Bayilik başvurusu, ürün bilgisi veya diğer sorularınız için bize ulaşın.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">İletişim Bilgileri</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Merkez Ofis</h4>
                                        <p className="text-slate-600">
                                            Sağlık Mah. Eczacılar Cad. No:123 <br />
                                            Şişli, İstanbul
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">Telefon</h4>
                                        <p className="text-slate-600">+90 212 123 45 67</p>
                                        <p className="text-slate-500 text-sm">Hafta içi 09:00 - 18:00</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">E-posta</h4>
                                        <p className="text-slate-600">info@eczadeposu.com</p>
                                        <p className="text-slate-600">satis@eczadeposu.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-600 p-8 rounded-2xl text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4">Bayilik Avantajları</h3>
                                <ul className="space-y-2 list-disc list-inside text-primary-50">
                                    <li>Geniş ürün yelpazesi</li>
                                    <li>Güçlü lojistik ağı</li>
                                    <li>Sürdürülebilir tedarik zinciri</li>
                                    <li>Pazarlama desteği</li>
                                </ul>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg"
                    >
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Bize Yazın</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Ad Soyad</label>
                                    <input {...register("name")} type="text" id="name" className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary-500'} focus:ring-2 focus:border-transparent outline-none transition-all`} placeholder="Adınız Soyadınız" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                                    <input {...register("phone")} type="tel" id="phone" className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary-500'} focus:ring-2 focus:border-transparent outline-none transition-all`} placeholder="0555 123 45 67" />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">E-posta</label>
                                <input {...register("email")} type="email" id="email" className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary-500'} focus:ring-2 focus:border-transparent outline-none transition-all`} placeholder="ornek@email.com" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Konu</label>
                                <select {...register("subject")} id="subject" className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary-500'} focus:ring-2 focus:border-transparent outline-none transition-all bg-white`}>
                                    <option value="">Seçiniz...</option>
                                    <option value="genel">Genel Bilgi</option>
                                    <option value="bayilik">Bayilik Başvurusu</option>
                                    <option value="urun-bilgisi">Ürün Bilgisi Talebi</option>
                                    <option value="sikayet">Şikayet / Öneri</option>
                                </select>
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Mesajınız</label>
                                <textarea {...register("message")} id="message" rows={4} className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-primary-500'} focus:ring-2 focus:border-transparent outline-none transition-all`} placeholder="Mesajınızı buraya yazın..."></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                            </div>

                            <Button size="lg" className="w-full" isLoading={isSubmitting}>Gönder</Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
