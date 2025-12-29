"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
    title: string;
    text: string;
}

export function ShareButton({ title, text }: ShareButtonProps) {
    const handleShare = async () => {
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: window.location.href,
                });
            } catch (error) {
                // User cancelled or error
                console.log("Share cancelled");
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link kopyalandı!");
            } catch {
                console.error("Could not copy");
            }
        }
    };

    return (
        <button
            className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Paylaş"
            onClick={handleShare}
        >
            <Share2 size={20} className="text-slate-500" />
        </button>
    );
}
