import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/button";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
            <div className="text-center max-w-md">
                {/* 404 Visual */}
                <div className="mb-8">
                    <h1 className="text-9xl font-black text-primary-600/20">404</h1>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Sayfa Bulunamadı
                </h2>
                <p className="text-slate-600 mb-8">
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                    Ana sayfaya dönerek devam edebilirsiniz.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto gap-2">
                            <Home size={18} />
                            Ana Sayfaya Dön
                        </Button>
                    </Link>
                    <Link href="/products">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                            <Search size={18} />
                            Ürünleri İncele
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-500">
                        Yardıma mı ihtiyacınız var?{" "}
                        <Link href="/contact" className="text-primary-600 hover:underline">
                            Bize ulaşın
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
