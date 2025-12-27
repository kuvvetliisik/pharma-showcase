"use client";

import { Bell, Search, User } from "lucide-react";

export function AdminHeader() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Admin panelinde ara..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-1"></div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-semibold text-slate-700">Admin User</div>
                        <div className="text-xs text-slate-500">Yönetici</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center border-2 border-white shadow-sm">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}
