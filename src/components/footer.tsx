import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <img
                                src="/logo.png"
                                alt="Farmavis"
                                className="h-20 w-auto mix-blend-lighten"
                            />
                        </Link>
                        <p className="text-slate-400 max-w-md mb-6 leading-relaxed">
                            Sağlık ve kozmetik sektöründe güvenilir çözüm ortağınız.
                            Foot Doctor, Cire Aseptine ve premium markalarla kaliteli ürünleri sizlerle buluşturuyoruz.
                        </p>
                        <div className="flex space-x-3">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="p-2.5 bg-slate-800/80 rounded-xl hover:bg-gradient-to-r hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-105">
                                <Instagram size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="p-2.5 bg-slate-800/80 rounded-xl hover:bg-gradient-to-r hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-105">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="p-2.5 bg-slate-800/80 rounded-xl hover:bg-gradient-to-r hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-105">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
                            Hızlı Bağlantılar
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-slate-400 hover:text-secondary-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 transition-all duration-300" />
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li>
                                <Link href="/brands" className="text-slate-400 hover:text-secondary-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 transition-all duration-300" />
                                    Markalar
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-slate-400 hover:text-secondary-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 transition-all duration-300" />
                                    Ürünler
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-secondary-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 transition-all duration-300" />
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-400 hover:text-secondary-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-secondary-500 transition-all duration-300" />
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
                            İletişim
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="p-2 bg-primary-500/10 rounded-lg">
                                    <MapPin size={18} className="text-primary-400" />
                                </div>
                                <span className="text-slate-400">
                                    Sağlık Mah. Eczacılar Cad. No:123<br />Şişli, İstanbul
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-2 bg-secondary-500/10 rounded-lg">
                                    <Phone size={18} className="text-secondary-400" />
                                </div>
                                <a href="tel:+902121234567" className="text-slate-400 hover:text-secondary-400 transition-colors">
                                    +90 212 123 45 67
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-2 bg-primary-500/10 rounded-lg">
                                    <Mail size={18} className="text-primary-400" />
                                </div>
                                <a href="mailto:info@farmavis.com" className="text-slate-400 hover:text-primary-400 transition-colors">
                                    info@farmavis.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Farmavis. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/contact" className="hover:text-primary-400 transition-colors">Gizlilik Politikası</Link>
                        <Link href="/contact" className="hover:text-primary-400 transition-colors">Kullanım Şartları</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
