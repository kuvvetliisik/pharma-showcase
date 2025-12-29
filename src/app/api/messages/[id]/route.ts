import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

// GET single message
export async function GET(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const db = await getDb();
        const message = db.messages.find(m => m.id === id);

        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        return NextResponse.json(message);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT - Update message (mark as read/unread)
export async function PUT(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const db = await getDb();

        const index = db.messages.findIndex(m => m.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        db.messages[index] = {
            ...db.messages[index],
            ...body,
            id: id
        };

        await saveDb(db);

        return NextResponse.json(db.messages[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE message
export async function DELETE(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const db = await getDb();
        const initialLength = db.messages.length;

        db.messages = db.messages.filter(m => m.id !== id);

        if (db.messages.length === initialLength) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        await saveDb(db);

        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
