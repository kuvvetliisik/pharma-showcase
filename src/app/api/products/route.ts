import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const db = await getDb();
        const { searchParams } = new URL(request.url);

        const category = searchParams.get('category');
        const brandId = searchParams.get('brandId');
        const query = searchParams.get('q');

        let filteredProducts = db.products;

        if (category && category !== 'Tümü') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }

        if (brandId) {
            filteredProducts = filteredProducts.filter(p => p.brandId === brandId);
        }

        if (query) {
            const lowerQuery = query.toLowerCase();
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery)
            );
        }

        return NextResponse.json(filteredProducts);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.brandId) {
            return NextResponse.json({ error: 'Name and Brand ID are required' }, { status: 400 });
        }

        const db = await getDb();

        const newProduct = {
            id: crypto.randomUUID(),
            ...body,
            // Ensure these fields exist even if empty
            category: body.category || "Genel",
            description: body.description || "",
            image: body.image || "https://placehold.co/600x400?text=No+Image"
        };

        db.products.push(newProduct);
        await saveDb(db);

        // Clear cache for products page
        try {
            const { revalidatePath } = await import('next/cache');
            revalidatePath('/products');
            revalidatePath('/admin/products');
        } catch (e) {
            console.error("Revalidation failed", e);
        }

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
