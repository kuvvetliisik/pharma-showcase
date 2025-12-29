"use client";

import { useEffect } from "react";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/button";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application Error:", error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="text-center max-w-md">
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle size={40} className="text-red-600" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Bir Hata Oluştu
                </h2>
                <p className="text-slate-600 mb-8">
                    Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin
                    veya ana sayfaya dönün.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        size="lg"
                        onClick={reset}
                        className="w-full sm:w-auto gap-2"
                    >
                        <RefreshCw size={18} />
                        Tekrar Dene
                    </Button>
                    <Link href="/">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                            <Home size={18} />
                            Ana Sayfaya Dön
                        </Button>
                    </Link>
                </div>

                {error.digest && (
                    <p className="mt-8 text-xs text-slate-400">
                        Hata Kodu: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}
