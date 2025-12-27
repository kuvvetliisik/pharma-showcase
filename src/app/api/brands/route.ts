import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const db = await getDb();
        return NextResponse.json(db.brands);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json({ error: 'Brand name is required' }, { status: 400 });
        }

        const db = await getDb();

        const newBrand = {
            id: `b${Date.now()}`,
            name: body.name,
            description: body.description || "",
            logo: body.logo || "https://placehold.co/200x100?text=Brand+Logo"
        };

        db.brands.push(newBrand);
        await saveDb(db);

        return NextResponse.json(newBrand, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
