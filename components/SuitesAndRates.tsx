"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, MapPin, Users, ArrowRight } from 'lucide-react';

interface Room {
  name: string;
  location: string;
  capacity: string;
  price: number;
  breakfast: string;
}

interface Season {
  name: string;
  description: string;
  rooms: Room[];
}

const ratesData: Record<string, Season> = {
  alta: {
    name: "Vacaciones / Sábados",
    description: "Temporada de alta demanda. Experiencia con desayuno gourmet incluido.",
    rooms: [
      { name: "Moros y Cristianos", location: "Planta Baja (PB)", capacity: "3-6 pers", price: 2800, breakfast: "Incluido" },
      { name: "El Volador", location: "Planta Baja (PB)", capacity: "2-4 pers", price: 1950, breakfast: "Incluido" },
      { name: "Santiagueros", location: "Planta Alta (PA)", capacity: "2-4 pers", price: 1950, breakfast: "Incluido" },
      { name: "Guagua", location: "Planta Alta (PA)", capacity: "1-2 pers", price: 1400, breakfast: "Incluido" },
      { name: "Negritos", location: "Planta Alta (PA)", capacity: "1-2 pers", price: 1400, breakfast: "Incluido" },
    ]
  },
  baja: {
    name: "Jueves a Domingo",
    description: "Estancia serena de fin de semana (excluye sábados). Sin alimentos incluidos.",
    rooms: [
      { name: "Moros y Cristianos", location: "Planta Baja (PB)", capacity: "3-6 pers", price: 2300, breakfast: "No incluye" },
      { name: "El Volador", location: "Planta Baja (PB)", capacity: "2-4 pers", price: 1600, breakfast: "No incluye" },
      { name: "Santiagueros", location: "Planta Alta (PA)", capacity: "2-4 pers", price: 1600, breakfast: "No incluye" },
      { name: "Guagua", location: "Planta Alta (PA)", capacity: "1-2 pers", price: 1100, breakfast: "No incluye" },
      { name: "Negritos", location: "Planta Alta (PA)", capacity: "1-2 pers", price: 1100, breakfast: "No incluye" },
    ]
  },
  semana: {
    name: "Lunes a Miércoles",
    description: "Tarifa corporativa y de media semana. Estancia sin alimentos.",
    rooms: [
      { name: "Moros y Cristianos", location: "Planta Baja (PB)", capacity: "3-6 pers", price: 1900, breakfast: "No incluye" },
      { name: "El Volador", location: "Planta Baja (PB)", capacity: "2-4 pers", price: 1200, breakfast: "No incluye" },
      { name: "Santiagueros", location: "Planta Alta (PA)", capacity: "2-4 pers", price: 1200, breakfast: "No incluye" },
      { name: "Guagua", location: "Planta Alta (PA)", capacity: "1-2 pers", price: 900, breakfast: "No incluye" },
      { name: "Negritos", location: "Planta Alta (PA)", capacity: "1-2 pers", price: 900, breakfast: "No incluye" },
    ]
  }
};

export default function SuitesAndRates() {
  const [activeTab, setActiveTab] = useState<string>('alta');
  const currentSeason = ratesData[activeTab];

  return (
    <section id="tarifas" className="py-32 bg-[#090A0F] relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 flex flex-col items-center">
          <div className="w-px h-12 bg-primary/30 mb-6" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl md:text-6xl font-light text-white mb-6 tracking-tight"
          >
            Colección de Suites
          </motion.h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-light tracking-wide leading-relaxed">
            Refugios privados diseñados meticulosamente. Cada suite ofrece un diálogo entre el lujo contemporáneo y la serenidad natural.
          </p>
        </div>

        {/* Minimalist Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-16 border-b border-white/5 pb-4">
          {Object.entries(ratesData).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative px-4 py-2 text-xs md:text-sm uppercase tracking-[0.2em] transition-elite ${
                activeTab === key 
                ? 'text-primary' 
                : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {value.name}
              {activeTab === key && (
                <motion.div 
                  layoutId="activeTabLine"
                  className="absolute -bottom-4 left-0 right-0 h-px bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
          key={activeTab + "-desc"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center text-xs font-light text-gray-400 tracking-wide mb-16 italic"
        >
          {currentSeason.description}
        </motion.div>

        {/* Editorial Table Layout (Desktop & Tablet) */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`table-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="grid grid-cols-12 gap-4 pb-6 border-b border-white/10 text-[9px] uppercase tracking-[0.3em] text-gray-500 font-medium">
                <div className="col-span-4">Suite</div>
                <div className="col-span-3">Detalles</div>
                <div className="col-span-3">Servicios</div>
                <div className="col-span-2 text-right">Inversión</div>
              </div>
              
              <div className="divide-y divide-white/5">
                {currentSeason.rooms.map((room, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 py-8 items-center group transition-elite hover:bg-white/[0.02]">
                    <div className="col-span-4">
                      <h3 className="text-xl md:text-2xl font-light text-white tracking-tight">{room.name}</h3>
                    </div>
                    <div className="col-span-3 flex flex-col gap-2">
                      <span className="flex items-center gap-2 text-xs text-gray-400 font-light"><MapPin size={12} className="text-primary/50" /> {room.location}</span>
                      <span className="flex items-center gap-2 text-xs text-gray-400 font-light"><Users size={12} className="text-primary/50" /> {room.capacity}</span>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <span className={`text-xs font-light flex items-center gap-2 ${
                        room.breakfast.toLowerCase().includes('no') 
                        ? 'text-gray-500' 
                        : 'text-primary/80'
                      }`}>
                        {room.breakfast.toLowerCase().includes('no') ? null : <Coffee size={12} />}
                        {room.breakfast}
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-2xl font-light text-white">${room.price}</span>
                      <span className="block text-[9px] text-gray-500 uppercase tracking-widest mt-1">/ noche</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Editorial Mobile Cards */}
        <div className="md:hidden space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
            >
              {currentSeason.rooms.map((room, i) => (
                <div key={i} className="p-6 border-b border-white/5 last:border-0 relative group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-light text-white tracking-tight">{room.name}</h3>
                    <div className="text-right">
                      <span className="text-xl font-light text-white">${room.price}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="space-y-3">
                      <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-medium"><MapPin size={12} /> Ubicación</span>
                      <p className="text-xs text-gray-300 font-light">{room.location}</p>
                    </div>
                    <div className="space-y-3">
                      <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-medium"><Coffee size={12} /> Alimentos</span>
                      <p className={`text-xs font-light ${room.breakfast.toLowerCase().includes('no') ? 'text-gray-500' : 'text-primary/80'}`}>{room.breakfast}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Policies - Minimalist Text */}
        <div className="mt-24 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-medium">Huésped Adicional</h4>
            <p className="text-sm font-light text-gray-300">Inversión de $250 MXN por noche.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-medium">Transacciones</h4>
            <p className="text-sm font-light text-gray-300">Efectivo, Transferencia o Tarjeta (+5%).</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-medium">Tiempos de Servicio</h4>
            <p className="text-sm font-light text-gray-300">Check-in 14:00 hrs / Check-out 12:00 hrs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
