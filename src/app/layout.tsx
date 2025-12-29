import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { LayoutWrapper } from "@/components/layout-wrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Farmavis | Sağlık & Kozmetik Ürünleri",
  description: "Sağlık ve kozmetik sektöründe güvenilir çözüm ortağınız. Foot Doctor, Cire Aseptine ve daha fazla marka ile hizmetinizdeyiz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={cn(inter.variable, "font-sans antialiased bg-slate-50 text-slate-900")}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
