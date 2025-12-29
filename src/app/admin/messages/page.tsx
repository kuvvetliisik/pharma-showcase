"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Search,
    Trash2,
    Mail,
    MailOpen,
    CheckCircle2,
    Clock,
    Loader2,
    RefreshCw,
    Inbox
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    subjectLabel: string;
    message: string;
    date: string;
    read: boolean;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "unread">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

    const fetchMessages = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/messages?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                toast.error("Mesajlar yüklenemedi.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Sunucu hatası.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // Filter messages
    const filteredMessages = messages.filter(msg => {
        const matchesFilter = filter === "all" || (filter === "unread" && !msg.read);
        const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.subjectLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const unreadCount = messages.filter(m => !m.read).length;

    const handleDelete = async (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();

        try {
            const response = await fetch(`/api/messages/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success("Mesaj silindi.");
                setMessages(prev => prev.filter(m => m.id !== id));
                if (selectedMessageId === id) setSelectedMessageId(null);
            } else {
                toast.error("Silinemedi.");
            }
        } catch (error) {
            toast.error("Bir hata oluştu.");
        }
    };

    const handleToggleRead = async (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();

        const message = messages.find(m => m.id === id);
        if (!message) return;

        try {
            const response = await fetch(`/api/messages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ read: !message.read }),
            });

            if (response.ok) {
                setMessages(prev => prev.map(m => m.id === id ? { ...m, read: !m.read } : m));
            }
        } catch (error) {
            console.error("Toggle read error:", error);
        }
    };

    const handleSelectMessage = async (id: string) => {
        setSelectedMessageId(id);
        // Mark as read when opened
        const msg = messages.find(m => m.id === id);
        if (msg && !msg.read) {
            await handleToggleRead(id);
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return "Az önce";
        if (diffHours < 24) return `${diffHours} saat önce`;
        if (diffDays === 1) return "Dün";
        if (diffDays < 7) return `${diffDays} gün önce`;
        return date.toLocaleDateString('tr-TR');
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Mesajlar</h1>
                    <p className="text-slate-500">Gelen kutusu ({unreadCount} okunmamış)</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchMessages}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                        title="Yenile"
                    >
                        <RefreshCw size={18} />
                    </button>
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
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                                <Loader2 size={24} className="animate-spin mb-2" />
                                <p className="text-sm">Yükleniyor...</p>
                            </div>
                        ) : filteredMessages.length > 0 ? (
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
                                        <span className="text-xs text-slate-500 whitespace-nowrap">{formatDate(msg.date)}</span>
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
                                <Inbox size={32} className="mx-auto mb-3 text-slate-300" />
                                <p>Mesaj bulunamadı.</p>
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} className="text-primary-600 hover:underline mt-2">
                                        Aramayı temizle
                                    </button>
                                )}
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
                                        ← Geri Dön
                                    </button>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", getSubjectColor(selectedMessage.subject))}>
                                            {selectedMessage.subjectLabel}
                                        </span>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <Clock size={12} /> {formatDate(selectedMessage.date)}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-1">{selectedMessage.subjectLabel} <span className="text-slate-400 font-normal text-base">konulu mesaj</span></h2>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <span className="font-semibold text-slate-900">{selectedMessage.name}</span>
                                        <span>&lt;{selectedMessage.email}&gt;</span>
                                    </div>
                                    {selectedMessage.phone && (
                                        <div className="text-sm text-slate-500 mt-1">
                                            Tel: <span className="font-mono text-slate-600">{selectedMessage.phone}</span>
                                        </div>
                                    )}
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

                            {/* Detail Footer */}
                            <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto">
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">Hızlı İşlemler</h4>
                                <div className="flex gap-3">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subjectLabel}`}
                                        className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:border-primary-300 hover:text-primary-700 transition-colors text-center flex items-center justify-center gap-2"
                                    >
                                        <Mail size={16} />
                                        E-posta ile yanıtla
                                    </a>
                                    <button
                                        onClick={() => handleToggleRead(selectedMessage.id)}
                                        className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:border-green-300 hover:text-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 size={16} />
                                        {selectedMessage.read ? "Okunmadı işaretle" : "Okundu işaretle"}
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
