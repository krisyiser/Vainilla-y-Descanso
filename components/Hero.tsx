"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, MapPin, Users } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#F9F7F2]">

      {/* Immersive Nature Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F7F2]/60 via-transparent to-[#F9F7F2]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-left">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-[#E8E4D9]/50 text-xs font-bold uppercase tracking-[0.3em] text-[#A68A64]"
          >
            <MapPin size={12} /> Papantla, Veracruz
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-heading font-light leading-[1.1] text-[#2D2D2D]"
          >
            El arte de <br />
            <span className="italic font-medium text-[#A68A64]">descansar</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-[#2D2D2D]/60 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Descubre un refugio de comodidad y tranquilidad en el corazón de Papantla, Veracruz.
            Suites exclusivas diseñadas para tu descanso.
          </motion.p>

          {/* Floating Availability Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-12"
          >
            <div className="max-w-3xl mx-auto bg-white p-2 rounded-[32px] shadow-2xl shadow-[#2D2D2D]/5 border border-[#E8E4D9]/30 flex flex-col md:flex-row items-center gap-2">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E8E4D9]/50 w-full">
                <button
                  onClick={onOpenBooking}
                  className="flex flex-col items-start px-8 py-4 hover:bg-[#F9F7F2]/50 rounded-2xl transition-colors text-left group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68A64] mb-1">Check-in</span>
                  <span className="text-sm font-medium text-[#2D2D2D]/40 group-hover:text-[#2D2D2D] transition-colors text-left">Añadir fecha</span>
                </button>
                <button
                  onClick={onOpenBooking}
                  className="flex flex-col items-start px-8 py-4 hover:bg-[#F9F7F2]/50 rounded-2xl transition-colors text-left group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68A64] mb-1">Check-out</span>
                  <span className="text-sm font-medium text-[#2D2D2D]/40 group-hover:text-[#2D2D2D] transition-colors text-left">Añadir fecha</span>
                </button>
                <button
                  onClick={onOpenBooking}
                  className="flex flex-col items-start px-8 py-4 hover:bg-[#F9F7F2]/50 rounded-2xl transition-colors text-left group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A68A64] mb-1">Huéspedes</span>
                  <span className="text-sm font-medium text-[#2D2D2D]/40 group-hover:text-[#2D2D2D] transition-colors text-left">¿Cuántos?</span>
                </button>
              </div>
              <button
                onClick={onOpenBooking}
                className="w-full md:w-auto bg-[#A68A64] text-white p-5 rounded-[28px] hover:bg-[#A68A64]/90 transition-all flex items-center justify-center gap-3 font-semibold shadow-lg shadow-[#A68A64]/20 group"
              >
                <Search size={20} className="group-hover:scale-110 transition-transform" />
                <span className="md:hidden">Buscar disponibilidad</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Natural Elements */}
      <div className="absolute bottom-10 left-10 hidden xl:block animate-bounce-slow">
        <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#E8E4D9] transform -rotate-90 origin-left">
          EXPLORA EL PARAÍSO
        </div>
      </div>

    </section>
  );
}
