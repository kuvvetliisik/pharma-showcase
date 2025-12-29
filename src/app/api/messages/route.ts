import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET all messages
export async function GET(request: Request) {
    try {
        const db = await getDb();
        // Return messages sorted by date (newest first)
        const sortedMessages = [...db.messages].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return NextResponse.json(sortedMessages);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
