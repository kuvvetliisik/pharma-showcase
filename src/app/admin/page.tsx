import {
    Package,
    Tags,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Mail
} from "lucide-react";
import { getDb } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const db = await getDb();

    // Get real stats from database
    const totalProducts = db.products.length;
    const totalBrands = db.brands.length;

    // Get unread message count
    const unreadMessages = db.messages?.filter(m => !m.read).length || 0;

    // Get latest 5 products (reversed for newest first)
    const recentProducts = [...db.products].reverse().slice(0, 5);

    // Calculate category count
    const categories = new Set(db.products.map(p => p.category));
    const totalCategories = categories.size;

    const stats = [
        {
            title: "Toplam Ürün",
            value: totalProducts,
            description: "Kayıtlı ürün sayısı",
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50",
            href: "/admin/products"
        },
        {
            title: "Toplam Marka",
            value: totalBrands,
            description: "Aktif marka sayısı",
            icon: Tags,
            color: "text-purple-600",
            bg: "bg-purple-50",
            href: "/admin/brands"
        },
        {
            title: "Kategori Sayısı",
            value: totalCategories,
            description: "Farklı kategori",
            icon: TrendingUp,
            color: "text-orange-600",
            bg: "bg-orange-50",
            href: "/admin/products"
        },
        {
            title: "Mesajlar",
            value: unreadMessages,
            description: "Okunmamış mesaj",
            icon: Mail,
            color: "text-green-600",
            bg: "bg-green-50",
            href: "/admin/messages"
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500">Sitenizin genel durumuna hızlı bir bakış.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={index} href={stat.href} className="block">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                                    <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                {/* Recent Products */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Son Eklenen Ürünler</h3>
                        <Link href="/admin/products" className="text-sm text-primary-600 font-medium hover:underline">
                            Tümünü Gör
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentProducts.length > 0 ? (
                            recentProducts.map((product) => (
                                <Link key={product.id} href={`/admin/products/${product.id}`} className="block">
                                    <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                        <div className="h-12 w-12 rounded-lg bg-slate-100 flex-shrink-0 relative overflow-hidden border border-slate-200">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={product.image || "https://placehold.co/100x100?text=No+Img"}
                                                alt={product.name}
                                                className="w-full h-full object-contain p-1"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-slate-900 truncate">{product.name}</h4>
                                            <p className="text-xs text-slate-500 truncate">{product.category}</p>
                                        </div>
                                        <div className="text-xs text-slate-400 flex items-center">
                                            <Clock size={12} className="mr-1" />
                                            Yeni
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-8 text-center text-slate-500">
                                <p>Henüz ürün eklenmemiş.</p>
                                <Link href="/admin/products/new" className="text-primary-600 hover:underline text-sm mt-2 inline-block">
                                    İlk ürünü ekle →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Hızlı Görevler</h3>
                    <div className="space-y-3">
                        <Link href="/admin/products/new" className="block">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary-200 hover:bg-primary-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Package size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-primary-800">Yeni Ürün Ekle</span>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-primary-500" />
                            </div>
                        </Link>

                        <Link href="/admin/brands/new" className="block">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-purple-200 hover:bg-purple-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                        <Tags size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-purple-800">Yeni Marka Tanımla</span>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-purple-500" />
                            </div>
                        </Link>

                        <Link href="/admin/messages" className="block">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-green-200 hover:bg-green-50 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                        <Mail size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-green-800">Mesajları Görüntüle</span>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-green-500" />
                            </div>
                        </Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <h3 className="font-bold text-slate-800 mb-2">Sistem Durumu</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Sunucu</span>
                                <span className="text-green-600 font-medium">Aktif</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Veritabanı</span>
                                <span className="text-green-600 font-medium">Bağlı (Local JSON)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Toplam Kayıt</span>
                                <span className="text-slate-700">{totalProducts + totalBrands} adet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
