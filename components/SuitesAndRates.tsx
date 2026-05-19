"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Check, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const suites = [
  {
    id: '101',
    name: 'Moros y Cristianos',
    type: 'Planta Baja (PB)',
    capacity: '3 a 6 personas',
    image: '/Moros y cristianos.png',
    features: ['Dos recámaras', 'Baño completo', 'Cocineta equipada', 'WiFi', 'Aire acondicionado', 'Frigobar & Cafetera']
  },
  {
    id: '102',
    name: 'El Volador',
    type: 'Planta Baja (PB)',
    capacity: '2 a 4 personas',
    image: '/El volador.png',
    features: ['Cama King size', 'Sofá cama', 'Baño completo', 'WiFi', 'Aire acondicionado', 'Frigobar & Cafetera']
  },
  {
    id: '201',
    name: 'Santiagueros',
    type: 'Planta Alta (PA)',
    capacity: '2 a 4 personas',
    image: '/Santiagueros.png',
    features: ['Cama king size', 'Sofá cama', 'Baño completo', 'WiFi', 'Aire acondicionado', 'Frigobar & Cafetera']
  },
  {
    id: '202',
    name: 'Guaguas',
    type: 'Planta Alta (PA)',
    capacity: '1 a 2 personas',
    image: '/Guaguas.png',
    features: ['Cama Queen size', 'Baño completo', 'Cocineta equipada', 'WiFi', 'Aire acondicionado', 'Frigobar & Cafetera']
  },
  {
    id: '203',
    name: 'Negritos',
    type: 'Planta Alta (PA)',
    capacity: '1 a 2 personas',
    image: '/Negritos.png',
    features: ['Cama Queen size', 'Baño completo', 'WiFi', 'Aire acondicionado', 'Frigobar & Cafetera']
  }
];

const getTodayPriceInfo = (suiteId: string) => {
  const day = new Date().getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
  let category: 'weekday' | 'weekend' | 'high' = 'weekend';
  let dayName = 'Jueves a Domingo';

  if (day >= 1 && day <= 3) {
    category = 'weekday';
    dayName = 'Lunes a Miércoles';
  } else if (day === 6) {
    category = 'high';
    dayName = 'Sábado';
  }

  const prices: Record<string, { weekday: number, weekend: number, high: number, breakfasts?: number }> = {
    '101': { weekday: 1900, weekend: 2300, high: 2800, breakfasts: 3 },
    '102': { weekday: 1200, weekend: 1600, high: 1950, breakfasts: 2 },
    '201': { weekday: 1200, weekend: 1600, high: 1950, breakfasts: 2 },
    '202': { weekday: 900, weekend: 1100, high: 1400, breakfasts: 1 },
    '203': { weekday: 900, weekend: 1100, high: 1400, breakfasts: 1 },
  };

  const info = prices[suiteId];
  if (!info) return { price: 0, desc: 'Tarifa Dinámica' };

  const price = info[category];
  const hasBreakfast = category === 'high';
  const desc = hasBreakfast
    ? `Tarifa para hoy (${dayName}) • Incluye ${info.breakfasts} desayuno(s)`
    : `Tarifa para hoy (${dayName}) • No incluye desayuno`;

  return { price, desc };
};

interface Props {
  onOpenSuite: (suite: any) => void;
}

export default function SuitesAndRates({ onOpenSuite }: Props) {
  return (
    <section id="suites" className="py-32 bg-white">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            <div className="w-8 h-px bg-primary" /> Alojamientos & Tarifas
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-light text-charcoal leading-tight mb-6"
          >
            Nuestras Suites <br />
          </motion.h2>
          <p className="text-charcoal/50 font-light text-lg mb-8">
            El hotel cuenta con 5 exclusivas suites equipadas con camas queen y King size, clima, pantalla de 55", frigobar, cafetera, microondas, agua caliente/fría y cocineta.
          </p>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {suites.map((suite, i) => {
            const todayPrice = getTodayPriceInfo(suite.id);
            return (
              <motion.div
                key={suite.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onOpenSuite({ ...suite, price: todayPrice.price })}
              >
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-8 shadow-2xl shadow-charcoal/5 group-hover:shadow-charcoal/10 transition-all duration-700">
                  <Image
                    src={suite.image}
                    alt={suite.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-charcoal shadow-sm">
                      {suite.type}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-end">
                    <div className="text-left">
                      <h3 className="text-2xl font-heading font-medium text-charcoal">{suite.name}</h3>
                      <div className="flex gap-4 mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest"><Users size={12} /> {suite.capacity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-bold text-primary uppercase tracking-widest">Tarifa Hoy</span>
                      <span className="text-2xl font-heading font-medium text-charcoal">${todayPrice.price}</span>
                      <span className="text-xs text-charcoal/40">/noche</span>
                    </div>
                  </div>

                  <div className="text-[10px] font-semibold text-primary uppercase tracking-wide text-left">
                    {todayPrice.desc}
                  </div>
                  <div className="text-[9px] text-charcoal/40 text-left uppercase tracking-wider">
                    * Se aplica tarifa dinámica según la temporada.
                  </div>

                  <div className="pt-6 border-t border-clay/30 flex flex-wrap gap-2 text-left">
                    {suite.features.map((feature, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-bone rounded-full text-[10px] font-medium text-charcoal/60">
                        <Check size={10} className="text-primary" /> {feature}
                      </span>
                    ))}
                  </div>

                  <button
                    className="w-full mt-6 py-4 bg-charcoal text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    Explorar Suite <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
