import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb, Slider } from '@/lib/db';

// GET all sliders
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const all = searchParams.get('all') === 'true';

        const db = await getDb();
        let sliders = db.sliders || [];

        // If not admin request, filter only active sliders
        if (!all) {
            sliders = sliders.filter(s => s.active);
        }

        sliders = sliders.sort((a, b) => a.order - b.order);
        return NextResponse.json(sliders);
    } catch (error) {
        console.error('Error fetching sliders:', error);
        return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 });
    }
}

// POST new slider
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const db = await getDb();

        if (!db.sliders) {
            db.sliders = [];
        }

        const newSlider: Slider = {
            id: `slider-${Date.now()}`,
            image: body.image,
            order: db.sliders.length + 1,
            active: true
        };

        db.sliders.push(newSlider);
        await saveDb(db);

        return NextResponse.json(newSlider, { status: 201 });
    } catch (error) {
        console.error('Error creating slider:', error);
        return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 });
    }
}
