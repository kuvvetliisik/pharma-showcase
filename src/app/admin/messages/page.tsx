"use client";

import { useState } from "react";
import {
    Search,
    Trash2,
    Mail,
    MailOpen,
    CheckCircle2,
    Clock,
    MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const initialMessages = [
    {
        id: "msg-1",
        name: "Ahmet Yılmaz",
        email: "ahmet@ornek.com",
        phone: "0532 555 12 34",
        subject: "bayilik",
        subjectLabel: "Bayilik Başvurusu",
        message: "Merhaba, İstanbul Anadolu yakasında yeni açacağım eczane için bayilik şartlarınızı öğrenmek istiyorum. Dönüş yaparsanız sevinirim.",
        date: "2 saat önce",
        read: false,
    },
    {
        id: "msg-2",
        name: "Ayşe Kaya",
        email: "ayse@eczane.com",
        phone: "0555 123 45 67",
        subject: "urun-bilgisi",
        subjectLabel: "Ürün Bilgisi Talebi",
        message: "Cire Aseptine ürünlerinizin toplu alım fiyat listesini gönderebilir misiniz? Özellikle güneş kremleri ile ilgileniyoruz.",
        date: "Dün",
        read: true,
    },
    {
        id: "msg-3",
        name: "Mehmet Demir",
        email: "mehmet@mail.com",
        phone: "0505 987 65 43",
        subject: "genel",
        subjectLabel: "Genel Bilgi",
        message: "Web sitenizdeki bazı ürün görselleri yüklenmiyor, bilgi vermek istedim.",
        date: "2 gün önce",
        read: true,
    },
    {
        id: "msg-4",
        name: "Zeynep Çelik",
        email: "zeynep@celik.com",
        phone: "0544 333 22 11",
        subject: "sikayet",
        subjectLabel: "Şikayet / Öneri",
        message: "Geçen hafta verdiğim siparişin kargosu hala ulaşmadı. Konuyla ilgili acil destek bekliyorum.",
        date: "3 gün önce",
        read: false,
    },
    {
        id: "msg-5",
        name: "Caner Erkin",
        email: "caner@gs.com",
        phone: "0533 444 55 66",
        subject: "bayilik",
        subjectLabel: "Bayilik Başvurusu",
        message: "İzmir bölgesinde dağıtım ağınıza katılmak istiyoruz. Detayları görüşmek için randevu talep ediyorum.",
        date: "1 hafta önce",
        read: true,
    }
];

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [filter, setFilter] = useState<"all" | "unread">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

    // Filter messages
    const filteredMessages = messages.filter(msg => {
        const matchesFilter = filter === "all" || (filter === "unread" && !msg.read);
        const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.subjectLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const unreadCount = messages.filter(m => !m.read).length;

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
            setMessages(prev => prev.filter(m => m.id !== id));
            if (selectedMessageId === id) setSelectedMessageId(null);
        }
    };

    const handleToggleRead = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setMessages(prev => prev.map(m => m.id === id ? { ...m, read: !m.read } : m));
    };

    const handleSelectMessage = (id: string) => {
        setSelectedMessageId(id);
        // Mark as read when opened
        const msg = messages.find(m => m.id === id);
        if (msg && !msg.read) {
            handleToggleRead(id);
        }
    };

    const selectedMessage = messages.find(m => m.id === selectedMessageId);

    const getSubjectColor = (subject: string) => {
        switch (subject) {
            case "bayilik": return "bg-blue-100 text-blue-700";
            case "sikayet": return "bg-red-100 text-red-700";
            case "urun-bilgisi": return "bg-green-100 text-green-700";
            default: return "bg-slate-100 text-slate-700";
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Mesajlar</h1>
                    <p className="text-slate-500">Gelen kutusu ({unreadCount} okunmamış)</p>
                </div>
                <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                    <button
                        onClick={() => setFilter("all")}
                        className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", filter === "all" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700")}
                    >
                        Tümü
                    </button>
                    <button
                        onClick={() => setFilter("unread")}
                        className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", filter === "unread" ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700")}
                    >
                        Okunmamış
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex">
                {/* Message List */}
                <div className={cn("w-full md:w-1/3 border-r border-slate-200 flex flex-col", selectedMessageId ? "hidden md:flex" : "flex")}>
                    <div className="p-4 border-b border-slate-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Mesajlarda ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                        {filteredMessages.length > 0 ? (
                            filteredMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    onClick={() => handleSelectMessage(msg.id)}
                                    className={cn(
                                        "p-4 cursor-pointer hover:bg-slate-50 transition-colors relative group",
                                        selectedMessageId === msg.id ? "bg-primary-50 hover:bg-primary-50" : "",
                                        !msg.read ? "bg-slate-50/50" : ""
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={cn("text-sm text-slate-900 truncate pr-2", !msg.read ? "font-bold" : "font-medium")}>
                                            {msg.name}
                                        </h4>
                                        <span className="text-xs text-slate-500 whitespace-nowrap">{msg.date}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mb-2 truncate">{msg.subjectLabel}</p>
                                    <p className="text-xs text-slate-500 line-clamp-2">{msg.message}</p>

                                    {!msg.read && (
                                        <span className="absolute top-4 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                                    )}

                                    <div className="absolute right-2 bottom-2 hidden group-hover:flex gap-1">
                                        <button
                                            onClick={(e) => handleToggleRead(msg.id, e)}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full bg-white shadow-sm border border-slate-100"
                                            title={msg.read ? "Okunmadı işaretle" : "Okundu işaretle"}
                                        >
                                            {msg.read ? <Mail size={14} /> : <MailOpen size={14} />}
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(msg.id, e)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full bg-white shadow-sm border border-slate-100"
                                            title="Sil"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-slate-500 text-sm">
                                Mesaj bulunamadı.
                            </div>
                        )}
                    </div>
                </div>

                {/* Message Detail */}
                <div className={cn("flex-1 bg-white flex-col", selectedMessageId ? "flex" : "hidden md:flex")}>
                    {selectedMessage ? (
                        <>
                            {/* Detail Header */}
                            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                                <div>
                                    <button
                                        onClick={() => setSelectedMessageId(null)}
                                        className="md:hidden text-slate-500 hover:text-slate-800 mb-4 flex items-center gap-1 text-sm"
                                    >
                                        &larr; Geri Dön
                                    </button>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", getSubjectColor(selectedMessage.subject))}>
                                            {selectedMessage.subjectLabel}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock size={12} /> {selectedMessage.date}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-1">{selectedMessage.subjectLabel} <span className="text-slate-400 font-normal text-base">konulu mesaj</span></h2>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <span className="font-semibold text-slate-900">{selectedMessage.name}</span>
                                        <span>&lt;{selectedMessage.email}&gt;</span>
                                    </div>
                                    <div className="text-sm text-slate-500 mt-1">
                                        Tel: <span className="font-mono text-slate-600">{selectedMessage.phone}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleToggleRead(selectedMessage.id)}
                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200"
                                        title={selectedMessage.read ? "Okunmadı olarak işaretle" : "Okundu olarak işaretle"}
                                    >
                                        {selectedMessage.read ? <Mail size={18} /> : <MailOpen size={18} />}
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(selectedMessage.id, e)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200"
                                        title="Sil"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Detail Content */}
                            <div className="p-8 overflow-y-auto flex-1 text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {selectedMessage.message}
                            </div>

                            {/* Detail Footer (Reply) */}
                            <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto">
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">Hızlı Cevap Ver</h4>
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:border-primary-300 hover:text-primary-700 transition-colors text-left flex items-center gap-2">
                                        <Mail size={16} />
                                        E-posta ile yanıtla
                                    </button>
                                    <button className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors text-left flex items-center gap-2">
                                        <CheckCircle2 size={16} />
                                        İşleme alındı olarak işaretle
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                <MailOpen size={32} />
                            </div>
                            <p className="text-lg font-medium text-slate-500">Bir mesaj seçin</p>
                            <p className="text-sm max-w-xs text-center mt-2">
                                İçeriğini görüntülemek için sol listeden bir mesaja tıklayın.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
