"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bed, Users, Check, Wind, Coffee, Bath, CreditCard, Clock, Coffee as BreakfastIcon } from 'lucide-react';
import Image from 'next/image';

interface Suite {
  id: string;
  name: string;
  type: string;
  capacity: string;
  price: number;
  features: string[];
  image: string;
}

interface Props {
  suite: Suite | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}

export default function SuiteDetailModal({ suite, isOpen, onClose, onBook }: Props) {
  if (!suite) return null;

  const distribution = suite.id === '101' 
    ? 'Dos recámaras' 
    : suite.id === '202' || suite.id === '203' 
      ? 'Cama Queen' 
      : 'Cama King + Sofá cama';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl border border-clay/30 flex flex-col lg:flex-row h-full max-h-[90vh] text-left"
          >
            {/* Image Section */}
            <div className="lg:w-1/2 relative h-64 lg:h-full shrink-0">
              <Image 
                src={suite.image} 
                alt={suite.name} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
              <button 
                onClick={onClose}
                className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white transition-colors hover:text-charcoal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col overflow-y-auto custom-scrollbar-light">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-2 block">Estancia Boutique</span>
                <h2 className="text-3xl md:text-4xl font-heading font-light text-charcoal leading-tight">Suite {suite.name}</h2>
                <p className="text-md text-charcoal/40 font-light mt-2 italic">{suite.type}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8 border-y border-clay/30 py-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-charcoal/30 uppercase tracking-widest">Capacidad</span>
                  <div className="flex items-center gap-1.5 text-charcoal font-medium text-xs md:text-sm">
                    <Users size={15} className="text-primary" /> {suite.capacity}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold text-charcoal/30 uppercase tracking-widest">Distribución</span>
                  <div className="flex items-center gap-1.5 text-charcoal font-medium text-xs md:text-sm">
                    <Bed size={15} className="text-primary" /> {distribution}
                  </div>
                </div>
              </div>

              {/* Horarios e Información Operativa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-[#F9F7F2] p-5 rounded-2xl border border-[#E8E4D9]">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#A68A64] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-charcoal">Horarios de Estancia</h5>
                    <p className="text-xs text-charcoal/60 mt-1">Check-in: 2:00 PM • Check-out: 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BreakfastIcon size={18} className="text-[#A68A64] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-charcoal">Desayuno Opcional</h5>
                    <p className="text-xs text-charcoal/60 mt-1">8:00 AM a 12:00 PM ($189 MXN p/p). Incluye: café, pan, jugo natural, fruta del día y platillo principal (chilaquiles rojos, huevo al gusto, frijoles refritos).</p>
                  </div>
                </div>
              </div>

              {/* Amenidades */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-4">Servicios Incluidos</h4>
                <div className="grid grid-cols-2 gap-3">
                  {suite.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-charcoal/60 font-light">
                      <div className="w-5 h-5 rounded-full bg-bone flex items-center justify-center text-primary shrink-0">
                        <Check size={10} />
                      </div>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reglas de Pago y Adicionales */}
              <div className="mb-8 border-t border-clay/30 pt-6 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-charcoal/50 leading-relaxed font-light">
                  <CreditCard size={14} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>Formas de Pago:</strong> Efectivo, transferencia y tarjetas (crédito/débito generan 5% de comisión).</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-charcoal/50 font-light">
                  <Users size={14} className="text-primary shrink-0" />
                  <span><strong>Persona Extra:</strong> $250 MXN por noche.</span>
                </div>
              </div>

              {/* Botón y Resumen */}
              <div className="mt-auto pt-6 border-t border-clay/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="block text-[10px] font-bold text-primary uppercase tracking-widest">Tarifa Hoy</span>
                  <span className="text-3xl font-heading font-medium text-charcoal">${suite.price}</span>
                  <span className="text-xs text-charcoal/40 ml-1">MXN / noche *</span>
                </div>
                <button 
                  onClick={() => {
                    onClose();
                    onBook();
                  }}
                  className="w-full sm:w-auto px-10 py-4.5 bg-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl shadow-charcoal/10"
                >
                  Reservar ahora
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
