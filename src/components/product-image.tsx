"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ProductImageProps {
    src: string;
    alt: string;
    category: string;
}

export function ProductImage({ src, alt, category }: ProductImageProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="w-80 h-80 bg-white rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden cursor-zoom-in group"
                onClick={() => setIsOpen(true)}
            >
                <div className="absolute top-4 left-4 bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded z-10">
                    {category}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-1">
                    <ZoomIn size={14} />
                    Büyüt
                </div>
                {src ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="320px"
                    />
                ) : (
                    <span className="text-slate-300 font-medium text-xl">{alt} Görseli</span>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
                        onClick={() => setIsOpen(false)}
                    >
                        <button
                            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-3xl aspect-square"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={src || "https://placehold.co/800x800?text=No+Image"}
                                alt={alt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 800px"
                            />
                        </motion.div>
                        <p className="absolute bottom-4 text-white/60 text-sm">
                            Kapatmak için herhangi bir yere tıklayın
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
