"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    if (isAdminPage) {
        // Admin pages: no navbar, footer, or scroll-to-top
        return <>{children}</>;
    }

    // Public pages: show navbar, footer, and scroll-to-top
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20">
                {children}
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}
