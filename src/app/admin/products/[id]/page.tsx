import { ProductForm } from "@/components/admin/product-form";
import { getDb } from "@/lib/db";

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: RouteContext) {
    const { id } = await params;
    const db = await getDb();
    const product = db.products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Ürün Bulunamadı</h2>
                <p className="text-slate-500">Aradığınız ürün silinmiş veya mevcut değil.</p>
            </div>
        );
    }

    // Convert to form compatible values
    const initialData = {
        id: product.id,
        name: product.name,
        brandId: product.brandId,
        category: product.category,
        description: product.description,
        image: product.image,
        price: "0",
        stock: "100"
    };

    return (
        <ProductForm
            initialData={initialData}
            buttonText="Güncelle"
            isEdit
        />
    );
}
