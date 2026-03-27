"use client";

import { motion } from 'framer-motion';
import { Phone, ChevronDown } from 'lucide-react';

// Componente Hero: Sección principal (Header). Muestra la imagen de fondo (Hero) 
// y el título principal invitando al usuario a reservar.
export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Fondo y superposiciones */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0A0E17]" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 block"
        >
          Boutique Hotel Premium
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
        >
          Tu Refugio de <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-primary">
            Paz y Elegancia
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Un escape de lujo diseñado para ofrecerte el descanso absoluto. Descubre Vainilla y Descanso, un lugar donde cada detalle importa.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="tel:+521234567890" className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
            <Phone className="w-5 h-5"/> Reservar Ahora
          </a>
          <a href="https://airbnb.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 glass text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
            Ver en Airbnb
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"
      >
        <ChevronDown className="w-8 h-8 opacity-50" />
      </motion.div>
    </section>
  );
}
