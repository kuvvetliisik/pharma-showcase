import { HeroSection } from "@/components/sections/hero";
import { BrandsSection } from "@/components/sections/brands-section";
import { ProductsSection } from "@/components/sections/products-section";
import { getDb } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const db = await getDb();
  // Get latest 4 products
  const products = [...db.products].reverse();

  return (
    <div className="flex flex-col">
      <HeroSection />
      <BrandsSection />
      <ProductsSection products={products} />

      {/* Contact Teaser */}
      <section id="contact" className="py-24 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bayimiz Olmak İster misiniz?</h2>
          <p className="text-primary-100 text-lg mb-8">
            Geniş ürün yelpazemiz ve avantajlı koşullarımızdan yararlanmak için hemen iletişime geçin.
          </p>
          <Link href="/contact" className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-primary-50 transition-colors">
            İletişim Formunu Doldur
          </Link>
        </div>
      </section>
    </div>
  );
}
