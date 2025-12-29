import { NextResponse } from "next/server";
import { getDb, saveDb, getSubjectLabel } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate body content
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: "Eksik bilgi gönderildi." },
                { status: 400 }
            );
        }

        const db = await getDb();

        // Create new message
        const newMessage = {
            id: `msg-${Date.now()}`,
            name: body.name,
            email: body.email,
            phone: body.phone || "",
            subject: body.subject || "genel",
            subjectLabel: getSubjectLabel(body.subject || "genel"),
            message: body.message,
            date: new Date().toISOString(),
            read: false
        };

        db.messages.push(newMessage);
        await saveDb(db);

        console.log("New message saved:", newMessage.id);

        return NextResponse.json({ success: true, message: "Mesajınız başarıyla alındı." });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu." },
            { status: 500 }
        );
    }
}
