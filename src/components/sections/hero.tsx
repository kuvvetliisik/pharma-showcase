"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/button";
import Link from "next/link";
import { ArrowRight, Shield, Truck, Award, HeartPulse } from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";

export function HeroSection() {
    const features = [
        { icon: Shield, text: "Güvenilir Markalar" },
        { icon: Truck, text: "Hızlı Teslimat" },
        { icon: Award, text: "Kalite Garantisi" },
        { icon: HeartPulse, text: "Sağlık Odaklı" },
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/30 to-secondary-50/40">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-secondary-400/20 to-secondary-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 pb-16">
                {/* Top Section with Title and Slider */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                    {/* Left: Text Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-100 shadow-sm mb-6"
                        >
                            <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-primary-700">Sağlık & Kozmetik Distribütörü</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                                <span className="text-slate-900">Sağlık & Güzellik için</span>
                                <br />
                                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                                    Güvenilir Çözümler
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-slate-600 mb-8 leading-relaxed"
                        >
                            Foot Doctor, Cire Aseptine ve birçok premium marka ile
                            sağlık ve kozmetik sektöründe güvenilir iş ortağınız.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
                        >
                            <Link href="/products">
                                <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/25">
                                    Ürünleri İncele <ArrowRight size={20} />
                                </Button>
                            </Link>
                            <Link href="/brands">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-primary-200 text-primary-700 hover:bg-primary-50">
                                    Markalarımız
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Slider */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <HeroSlider />
                    </motion.div>
                </div>

                {/* Feature Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.text}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm"
                        >
                            <feature.icon size={18} className="text-secondary-600" />
                            <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
