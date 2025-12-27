"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 to-slate-50">
            {/* Decorative Circles */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl mix-blend-multiply filter animate-blob" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-secondary-200/30 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl mix-blend-multiply filter animate-blob animation-delay-4000" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                            Sağlık İçin <span className="text-primary-600">Güvenilir</span> <br />
                            <span className="text-secondary-600">Çözüm Ortağınız</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed"
                    >
                        Ecza Deposu olarak, en kaliteli medikal markaları ve geniş ürün yelpazemizle
                        eczanelerinizin en güçlü destekçisiyiz. Hızlı teslimat ve güvenilir hizmet.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="#products">
                            <Button size="lg" className="w-full sm:w-auto gap-2">
                                Ürünleri İncele <ArrowRight size={18} />
                            </Button>
                        </Link>
                        <Link href="#contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Bize Ulaşın
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
