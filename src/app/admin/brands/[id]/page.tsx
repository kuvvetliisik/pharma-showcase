import { BrandForm } from "@/components/admin/brand-form";
import { getDb } from "@/lib/db";

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

export default async function EditBrandPage({ params }: RouteContext) {
    const { id } = await params;
    const db = await getDb();
    const brand = db.brands.find(b => b.id === id);

    if (!brand) {
        return (
            <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Marka Bulunamadı</h2>
                <p className="text-slate-500">Aradığınız marka silinmiş veya mevcut değil.</p>
            </div>
        );
    }

    const initialData = {
        id: brand.id,
        name: brand.name,
        description: brand.description,
        logo: brand.logo || "",
    };

    return (
        <BrandForm
            initialData={initialData}
            buttonText="Güncelle"
            isEdit
        />
    );
}
