import {
    Package,
    Tags,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock
} from "lucide-react";
import { products, brands } from "@/lib/data";

export default function AdminDashboard() {
    // Calculate simple stats
    const totalProducts = products.length;
    const totalBrands = brands.length;
    // Mock data for other stats
    const activeUsers = 12;
    const weeklyViews = 1254;

    const stats = [
        {
            title: "Toplam Ürün",
            value: totalProducts,
            change: "+12%",
            trend: "up",
            icon: Package,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Toplam Marka",
            value: totalBrands,
            change: "+2",
            trend: "up",
            icon: Tags,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Aktif Ziyaretçi",
            value: activeUsers,
            change: "-5%",
            trend: "down",
            icon: Users,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Haftalık Görüntülenme",
            value: weeklyViews,
            change: "+24%",
            trend: "up",
            icon: TrendingUp,
            color: "text-orange-600",
            bg: "bg-orange-50"
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
                        <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                                <div className={`flex items-center text-xs mt-2 font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-500"}`}>
                                    {stat.trend === "up" ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                                    {stat.change}
                                    <span className="text-slate-400 ml-1 font-normal">geçen haftaya göre</span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <Icon size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                {/* Recent Products */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Son Eklenen Ürünler</h3>
                        <button className="text-sm text-primary-600 font-medium hover:underline">Tümünü Gör</button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                <div className="h-12 w-12 rounded-lg bg-slate-100 flex-shrink-0 relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
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
                        ))}
                    </div>
                </div>

                {/* Quick Actions or System Status */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Hızlı Görevler</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary-200 hover:bg-primary-50 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Package size={16} />
                                </div>
                                <span className="text-sm font-medium text-slate-700 group-hover:text-primary-800">Yeni Ürün Ekle</span>
                            </div>
                            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-primary-500" />
                        </div>

                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-primary-200 hover:bg-primary-50 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                                    <Tags size={16} />
                                </div>
                                <span className="text-sm font-medium text-slate-700 group-hover:text-primary-800">Yeni Marka Tanımla</span>
                            </div>
                            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-primary-500" />
                        </div>
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
                                <span className="text-slate-500">Son Güncelleme</span>
                                <span className="text-slate-700">Şimdi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
