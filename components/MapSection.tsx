"use client";

import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

// Componente MapSection: Sección donde se encuentra el botón y presentación del Mapa
// Sirve para orientar al cliente sobre la ubicación física del hotel.
export default function MapSection() {
  return (
    <section id="mapa" className="py-24 bg-[#0A0E17] relative">
      <div className="absolute inset-x-0 w-full h-[500px] overflow-hidden">
        {/* Placeholder realista del mapa para uso estético */}
        <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-3xl" />
        <div className="w-full h-full bg-slate-900 bg-[size:100px_100px] bg-[image:linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 mt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-dark rounded-3xl p-12 text-center border border-primary/20 shadow-2xl shadow-primary/10"
        >
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <MapPin className="w-8 h-8" />
          </div>
          
          <h2 className="font-heading text-4xl font-bold text-white mb-4">
            Ubicación Exclusiva
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Descubre Vainilla y Descanso, un edén oculto en la naturaleza con una conectividad 
            perfecta. Haz click abajo para abrir la ruta en Google Maps.
          </p>

          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all"
          >
            Abrir Mapa <ExternalLink className="w-4 h-4 ml-1"/>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
