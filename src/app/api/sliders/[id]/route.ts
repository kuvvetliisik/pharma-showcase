import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

// GET single slider
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = await getDb();
        const slider = (db.sliders || []).find(s => s.id === id);

        if (!slider) {
            return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
        }

        return NextResponse.json(slider);
    } catch (error) {
        console.error('Error fetching slider:', error);
        return NextResponse.json({ error: 'Failed to fetch slider' }, { status: 500 });
    }
}

// PUT update slider
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const db = await getDb();

        if (!db.sliders) {
            db.sliders = [];
        }

        const index = db.sliders.findIndex(s => s.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
        }

        db.sliders[index] = {
            ...db.sliders[index],
            ...body,
            id // Preserve original ID
        };

        await saveDb(db);
        return NextResponse.json(db.sliders[index]);
    } catch (error) {
        console.error('Error updating slider:', error);
        return NextResponse.json({ error: 'Failed to update slider' }, { status: 500 });
    }
}

// DELETE slider
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const db = await getDb();

        if (!db.sliders) {
            return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
        }

        const index = db.sliders.findIndex(s => s.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Slider not found' }, { status: 404 });
        }

        db.sliders.splice(index, 1);
        await saveDb(db);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting slider:', error);
        return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 });
    }
}
