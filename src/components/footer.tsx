import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Ecza<span className="text-primary-500">Deposu</span>
                        </h3>
                        <p className="text-slate-400 max-w-sm">
                            Sağlık sektöründe güvenilir çözüm ortağınız. En kaliteli markaları ve ürünleri eczanelerle buluşturuyoruz.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Hızlı Bağlantılar</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-primary-400 transition-colors">Ana Sayfa</Link></li>
                            <li><Link href="#brands" className="hover:text-primary-400 transition-colors">Markalar</Link></li>
                            <li><Link href="#products" className="hover:text-primary-400 transition-colors">Ürünler</Link></li>
                            <li><Link href="#contact" className="hover:text-primary-400 transition-colors">İletişim</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Bize Ulaşın</h4>
                        <p className="mb-2">info@eczadeposu.com</p>
                        <p className="mb-4">+90 212 123 45 67</p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-primary-400"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-primary-400"><Linkedin size={20} /></Link>
                            <Link href="#" className="hover:text-primary-400"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-primary-400"><Facebook size={20} /></Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} Ecza Deposu. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
}
