import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate body content (basic check)
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: "Eksik bilgi gönderildi." },
                { status: 400 }
            );
        }

        // Simulate backend processing (e.g. sending email, saving to DB)
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Form submission received:", body);

        return NextResponse.json({ success: true, message: "Mesajınız başarıyla alındı." });
    } catch (error) {
        return NextResponse.json(
            { error: "Bir hata oluştu." },
            { status: 500 }
        );
    }
}
