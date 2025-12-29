import { Award, Building2, Heart, Truck, Users, ShieldCheck, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/button";

export const metadata = {
    title: "Hakkımızda - Ecza Deposu",
    description: "Sağlık sektöründe güvenilir çözüm ortağınız. Yılların tecrübesiyle eczanelere kaliteli hizmet sunuyoruz.",
};

export default function AboutPage() {
    const stats = [
        { label: "Yıllık Tecrübe", value: "25+", icon: Clock },
        { label: "Marka Ortağı", value: "50+", icon: Building2 },
        { label: "Ürün Çeşidi", value: "1000+", icon: Award },
        { label: "Mutlu Müşteri", value: "500+", icon: Heart },
    ];

    const values = [
        {
            icon: ShieldCheck,
            title: "Güvenilirlik",
            description: "Tüm ürünlerimiz orijinal ve sertifikalıdır. Sağlık sektöründe güvenilirlik bizim için önceliktir."
        },
        {
            icon: Truck,
            title: "Hızlı Teslimat",
            description: "Güçlü lojistik ağımız sayesinde siparişlerinizi en kısa sürede teslim ediyoruz."
        },
        {
            icon: Users,
            title: "Müşteri Odaklılık",
            description: "Her müşterimizin ihtiyaçlarına özel çözümler sunarak uzun vadeli iş ortaklıkları kuruyoruz."
        },
        {
            icon: Award,
            title: "Kalite Standartları",
            description: "Sektörün en yüksek kalite standartlarına uygun ürünleri portföyümüze alıyoruz."
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Sağlık Sektöründe <br />
                            <span className="text-primary-200">Güvenilir Ortağınız</span>
                        </h1>
                        <p className="text-xl text-primary-100 leading-relaxed">
                            25 yılı aşkın tecrübemizle Türkiye genelinde eczanelere en kaliteli markaları ve ürünleri ulaştırıyoruz.
                            Müşteri memnuniyetini ön planda tutarak büyümeye devam ediyoruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl mb-4">
                                        <Icon size={28} />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                    <div className="text-slate-500 font-medium">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Hikayemiz</h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    1998 yılında küçük bir ecza deposu olarak başladığımız yolculuğumuzda, bugün Türkiye'nin
                                    önde gelen ilaç ve kozmetik distribütörlerinden biri haline geldik.
                                </p>
                                <p>
                                    Cire Aseptine, MiaDerm, VitaPlus gibi sektörün öncü markalarının Türkiye distribütörlüğünü
                                    üstlenerek, eczanelere geniş bir ürün yelpazesi sunuyoruz.
                                </p>
                                <p>
                                    Modern depolama tesislerimiz ve güçlü lojistik ağımız sayesinde, siparişlerinizi
                                    en hızlı şekilde ve soğuk zincir kurallarına uygun olarak teslim ediyoruz.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-8 h-80 flex items-center justify-center">
                            <div className="text-center">
                                <Building2 size={64} className="text-slate-400 mx-auto mb-4" />
                                <p className="text-slate-500 font-medium">Merkez Ofis Görseli</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Değerlerimiz</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            İş anlayışımızın temelini oluşturan değerlerimiz, her adımımızda bize yol gösteriyor.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div key={index} className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mb-4">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                                    <p className="text-slate-600 text-sm">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 bg-primary-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Bizimle Çalışmak İster misiniz?</h2>
                    <p className="text-primary-100 text-lg mb-8">
                        Bayilik başvurusu veya iş birliği teklifleri için bizimle iletişime geçin.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                                İletişime Geç
                            </Button>
                        </Link>
                        <Link href="/brands">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                Markalarımızı İncele
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Merkez Ofis</h3>
                                <p className="text-slate-600">
                                    Sağlık Mah. Eczacılar Cad. No:123<br />
                                    Şişli, İstanbul 34394<br />
                                    <span className="text-primary-600 font-medium">+90 212 123 45 67</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
