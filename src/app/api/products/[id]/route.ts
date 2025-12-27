import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const db = await getDb();
        const product = db.products.find(p => p.id === id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const db = await getDb();

        const index = db.products.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const updatedProduct = {
            ...db.products[index],
            ...body,
            id: id // Ensure ID doesn't change
        };

        db.products[index] = updatedProduct;
        await saveDb(db);

        return NextResponse.json(updatedProduct);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const db = await getDb();
        const initialLength = db.products.length;

        db.products = db.products.filter(p => p.id !== id);

        if (db.products.length === initialLength) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        await saveDb(db);

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
