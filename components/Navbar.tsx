"use client";

import { motion } from 'framer-motion';
import { Phone, MapPin, Building, Menu } from 'lucide-react';
import Link from 'next/link';

// Componente Navbar: Menú de navegación principal con diseño glassmorphism.
// Incluye botones rápidos para reservar llamadas y la ubicación.
export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass-dark py-4 px-6 md:px-12 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <Building className="text-primary w-8 h-8" />
        <span className="font-heading font-bold text-xl tracking-wide text-white">
          Vainilla & Descanso
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="#servicios" className="text-gray-300 hover:text-white transition-colors">
          Servicios
        </Link>
        <Link href="#mapa" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
          <MapPin className="w-4 h-4" /> Mapa
        </Link>
        <a 
          href="https://airbnb.com" 
          target="_blank" 
          rel="noreferrer"
          className="text-primary hover:text-white transition-colors font-medium border border-primary/50 px-4 py-2 rounded-full hover:bg-primary/20"
        >
          Airbnb
        </a>
        <a 
          href="tel:+521234567890" 
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all"
        >
          <Phone className="w-4 h-4" /> Llamar y Reservar
        </a>
      </div>
      
      {/* Menu mobile */}
      <button className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </button>
    </motion.nav>
  );
}
