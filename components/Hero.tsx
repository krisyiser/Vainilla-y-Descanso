"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero({ onOpenBooking }: { onOpenBooking?: () => void }) {
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[hsl(var(--background))]">
      {/* Ultra-Premium Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero.jpg" 
          alt="Vainilla y Descanso Hero" 
          fill 
          priority
          className="object-cover opacity-50 scale-105 transition-elite"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090A0F]/95 via-[#090A0F]/60 to-[#090A0F]" />
        
        {/* Subtle, elegant light washes instead of harsh neon pulses */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-primary/5 rounded-[100%] blur-[120px]" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col items-center gap-4"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
          <span className="text-primary/80 font-medium tracking-[0.4em] uppercase text-[9px] md:text-[11px]">
            The Art of Pure Hospitality
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-5xl md:text-8xl lg:text-9xl font-light text-white mb-8 leading-[1.1] tracking-[-0.04em]"
        >
          Experiencia <br/>
          <span className="text-gradient-gold font-medium italic pr-4">
            Atemporal
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-gray-400/90 text-base md:text-xl max-w-2xl mx-auto mb-16 font-light leading-relaxed tracking-wide"
        >
          Descubra un santuario de elegancia discreta y confort absoluto en el corazón de la cultura Totonaca.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto px-4"
        >
          <button 
            onClick={onOpenBooking}
            className="group relative flex items-center justify-center gap-3 bg-white text-black px-12 py-5 rounded-full font-medium text-sm tracking-widest uppercase overflow-hidden transition-elite hover:bg-[#EAEAEA]"
          >
            Reservar Suite
          </button>
          
          <button 
            className="group flex items-center justify-center gap-3 text-white/80 px-8 py-5 rounded-full font-medium text-sm tracking-widest uppercase hover:text-white transition-elite"
          >
            Explorar Galería 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-elite opacity-50 group-hover:opacity-100" />
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/50">Descubrir</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

