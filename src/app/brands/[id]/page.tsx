import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button";

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

export default async function BrandDetailPage({ params }: RouteContext) {
    const { id } = await params;
    const db = await getDb();

    const brand = db.brands.find((b) => b.id === id);

    if (!brand) {
        notFound();
    }

    const brandProducts = db.products.filter((p) => p.brandId === brand.id);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Brand Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link href="/brands" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Tüm Markalar
                    </Link>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-32 h-32 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden p-2 border border-slate-200">
                            {brand.logo ? (
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <span className="font-bold text-slate-400">{brand.name}</span>
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{brand.name}</h1>
                            <p className="text-xl text-slate-600 max-w-2xl">{brand.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">{brand.name} Ürünleri ({brandProducts.length})</h2>

                {brandProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {brandProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center">
                                    {product.image ? (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    ) : (
                                        <span className="text-slate-400">Ürün Görseli</span>
                                    )}
                                </div>

                                <div className="p-5">
                                    <div className="bg-primary-50 text-primary-700 text-xs font-semibold px-2 py-1 rounded w-fit mb-3">
                                        {product.category}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    <Link href={`/products/${product.id}`} className="block">
                                        <Button variant="outline" size="sm" className="w-full">İncele</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                        <p className="text-slate-500">Bu markaya ait henüz ürün bulunmamaktadır.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
