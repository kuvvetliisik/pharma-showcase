"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    Tags,
    MessageSquare,
    Settings,
    LogOut,
    Home,
    Images
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard
    },
    {
        title: "Slider",
        href: "/admin/sliders",
        icon: Images
    },
    {
        title: "Ürünler",
        href: "/admin/products",
        icon: Package
    },
    {
        title: "Markalar",
        href: "/admin/brands",
        icon: Tags
    },
    {
        title: "Mesajlar",
        href: "/admin/messages",
        icon: MessageSquare
    },
    {
        title: "Ayarlar",
        href: "/admin/settings",
        icon: Settings
    }
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 border-b border-slate-800">
                <Link href="/admin" className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    Ecza<span className="text-primary-500">Admin</span>
                </Link>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary-600 text-white shadow-md shadow-primary-900/20"
                                    : "hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <Icon size={20} />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <Home size={20} />
                        Siteye Dön
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors">
                        <LogOut size={20} />
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </aside>
    );
}
