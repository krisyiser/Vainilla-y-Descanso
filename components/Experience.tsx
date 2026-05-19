"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Coffee, TreePine, Clock, Ticket } from 'lucide-react';
import Image from 'next/image';

const areas = [
  {
    id: 'alberca',
    title: 'Alberca con Chapoteadero',
    icon: <Waves size={24} />,
    desc: 'Un oasis de agua cristalina ideal para toda la familia. Contamos con acceso Day Pass para visitantes externos.',
    details: [
      'Day Pass: $100 MXN por persona',
      'Incluye toalla limpia de cortesía',
      'Uso completo de baños, regaderas, terrazas, restaurante y café-bar.'
    ],
    image: '/pool.jpg'
  },
  {
    id: 'cafe-bar',
    title: 'Salón Climatizado & Café-Bar',
    icon: <Coffee size={24} />,
    desc: 'Espacio multifuncional climatizado con capacidad para 30 personas adaptándose a tus necesidades del día:',
    details: [
      '8:00 AM a 12:00 PM: Servicio de Desayunos ($189 p/p).',
      '12:00 PM a 6:00 PM: Renta para juntas de trabajo, conferencias y eventos privados.',
      '6:00 PM a 11:00 PM: Café-Bar con ambiente selecto y relajado.'
    ],
    image: '/restaurant.jpg'
  },
  {
    id: 'terrazas',
    title: 'Terrazas & Áreas Comunes',
    icon: <TreePine size={24} />,
    desc: 'Espacios al aire libre, diseñados para la relajación y contemplación en Papantla.',
    details: [
      'Ubicación privilegiada con excelente vista.',
      'Mobiliario exterior confortable.',
      'Ambiente tranquilo y fresco las 24 horas del día.'
    ],
    image: '/terrace.jpg'
  }
];

export default function Experience() {
  const [activeArea, setActiveArea] = useState('alberca');
  const activeData = areas.find(a => a.id === activeArea) || areas[0];

  return (
    <section id="experiencias" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">

        <div className="max-w-3xl mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            <div className="w-8 h-px bg-primary" /> Instalaciones del Hotel
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal leading-tight">
            Alberca, Café-Bar & <br />
            <span className="italic font-medium text-primary">Nuestras Terrazas</span>
          </h2>
          <p className="text-charcoal/50 font-light leading-relaxed mt-4">
            Disfruta de nuestros espacios diseñados para complementar tu estancia con comodidad, recreación y productividad.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-clay/20 pb-4 justify-start">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setActiveArea(area.id)}
              className={`flex items-center gap-2.5 px-6 py-4.5 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all ${activeArea === area.id
                  ? 'bg-charcoal text-white shadow-lg'
                  : 'bg-bone text-charcoal hover:bg-clay/20'
                }`}
            >
              {area.icon}
              <span>{area.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Info */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h3 className="text-3xl font-heading font-medium text-charcoal">{activeData.title}</h3>
              <p className="text-sm text-charcoal/60 leading-relaxed font-light">{activeData.desc}</p>
            </div>

            <div className="space-y-3 bg-[#F9F7F2] p-6 rounded-2xl border border-[#E8E4D9]">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#A68A64]">Detalles Importantes</h5>
              <ul className="space-y-2">
                {activeData.details.map((detail, idx) => (
                  <li key={idx} className="text-xs text-charcoal/70 leading-relaxed font-medium flex gap-2 items-start">
                    <span className="text-primary shrink-0 mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Graphic/Image display */}
          <div className="lg:col-span-7 relative h-[450px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src={activeData.image}
              alt={activeData.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
