import { Suspense } from "react";
import { getDb } from "@/lib/db";
import { ProductsClient } from "@/components/products-client";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Ürünlerimiz - Ecza Deposu",
    description: "Cilt bakımı, güneş ürünleri, vitaminler ve daha fazlası. 1000'den fazla ürün çeşidimizi keşfedin.",
    openGraph: {
        title: "Ürünlerimiz - Ecza Deposu",
        description: "Cilt bakımı, güneş ürünleri, vitaminler ve daha fazlası.",
    }
};

export default async function ProductsPage() {
    // Direct DB access (Server Component)
    const db = await getDb();

    // Sort products by newness (assuming newer products are improved/added later, or reverse list)
    // If no timestamp, we can just reverse to show latest added first if they are appended
    const products = [...db.products].reverse();

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <Suspense fallback={
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            }>
                <ProductsClient initialProducts={products} />
            </Suspense>
        </div>
    );
}
