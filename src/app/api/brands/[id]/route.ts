import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const db = await getDb();
        const brand = db.brands.find(b => b.id === id);

        if (!brand) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }

        return NextResponse.json(brand);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const db = await getDb();

        const index = db.brands.findIndex(b => b.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }

        const updatedBrand = {
            ...db.brands[index],
            ...body,
            id: id
        };

        db.brands[index] = updatedBrand;
        await saveDb(db);

        return NextResponse.json(updatedBrand);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const db = await getDb();
        const initialLength = db.brands.length;

        db.brands = db.brands.filter(b => b.id !== id);

        if (db.brands.length === initialLength) {
            return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
        }

        await saveDb(db);

        return NextResponse.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
