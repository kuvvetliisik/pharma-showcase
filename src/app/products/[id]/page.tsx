import { getDb } from "@/lib/db";
import { brands } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { ArrowLeft, Check, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: RouteContext) {
    const { id } = await params;
    const db = await getDb();

    const product = db.products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const brand = brands.find((b) => b.id === product.brandId);
    const similarProducts = db.products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link href="/products" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Ürünlere Dön
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12">
                        {/* Image Section */}
                        <div className="bg-slate-50 p-12 flex items-center justify-center min-h-[400px] border-b md:border-b-0 md:border-r border-slate-100">
                            <div className="w-80 h-80 bg-white rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
                                <div className="absolute top-4 left-4 bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded z-10">
                                    {product.category}
                                </div>
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="320px"
                                    />
                                ) : (
                                    <span className="text-slate-300 font-medium text-xl">{product.name} Görseli</span>
                                )}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                {brand && (
                                    <Link href={`/brands/${brand.id}`} className="inline-flex items-center gap-2 mb-2 group">
                                        <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">B</span>
                                        <span className="text-slate-500 font-medium group-hover:text-primary-600 transition-colors">{brand.name}</span>
                                    </Link>
                                )}
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{product.name}</h1>
                                <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                        <Check size={18} />
                                    </div>
                                    <span>Stokta Var</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <span>Orijinal Ürün</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <Truck size={18} />
                                    </div>
                                    <span>Hızlı Teslimat</span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-auto">
                                <Link href="/contact" className="flex-1">
                                    <Button size="lg" className="w-full">Detaylı Bilgi Al</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Benzer Ürünler</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {similarProducts.map((p) => (
                            <Link key={p.id} href={`/products/${p.id}`} className="group">
                                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="aspect-square bg-slate-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                                        {p.image ? (
                                            <Image
                                                src={p.image}
                                                alt={p.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, 25vw"
                                            />
                                        ) : (
                                            <span className="text-xs text-slate-400">{p.name}</span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary-600 transition-colors">{p.name}</h3>
                                    <p className="text-xs text-slate-500">{p.category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
