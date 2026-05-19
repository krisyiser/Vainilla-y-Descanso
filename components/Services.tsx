"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Car, Utensils, Heart, Sofa, Eye, ShoppingBag } from 'lucide-react';

const amenities = [
  { icon: <Wifi size={24} />, name: 'Wi-Fi de Alta Velocidad', desc: 'Conectividad inalámbrica en todas las áreas del hotel.' },
  { icon: <Car size={24} />, name: 'Estacionamiento', desc: '$50 por día completo o tarifa de $15 por hora.' },
  { icon: <Sofa size={24} />, name: 'Área de Espera', desc: 'Espacio cómodo y acogedor para tu bienvenida o descanso.' },
  { icon: <Eye size={24} />, name: 'Baños Públicos', desc: 'Instalaciones limpias disponibles en las áreas comunes.' },
  { icon: <Heart size={24} />, name: 'Pet-friendly', desc: 'Aceptamos a tus compañeros de cuatro patas durante tu estancia.' },
  { icon: <ShoppingBag size={24} />, name: 'Boutique Artesanal', desc: 'Venta de productos artesanales referentes a la cultura totonaca.' }
];

export default function Services() {
  return (
    <section className="py-32 bg-bone overflow-hidden">
      <div className="container mx-auto px-6">

        <div className="flex flex-col lg:flex-row items-center gap-20">

          <div className="lg:w-1/3 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
            >
              <div className="w-8 h-px bg-primary" /> Servicios
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-light text-charcoal leading-tight mb-8">
              Comodidad & <br />
              <span className="italic font-medium text-primary">Servicios</span>
            </h2>
            <p className="text-charcoal/50 font-light leading-relaxed mb-8">
              Ofrecemos una variedad de servicios diseñados para que tu estancia en Papantla, Veracruz, sea una excelente experiencia.
            </p>
            <div className="p-5 bg-white rounded-2xl border border-clay/30 inline-block">
              <span className="block text-xs font-bold text-[#A68A64] uppercase tracking-wider mb-1">Métodos de Pago</span>
              <p className="text-xs text-charcoal/60 leading-relaxed font-light">Efectivo, transferencia y tarjetas bancarias (crédito/débito generan un 5% de comisión).</p>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {amenities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 bg-white rounded-[32px] border border-clay/30 hover:border-primary/30 transition-all group flex gap-5 text-left"
              >
                <div className="text-primary group-hover:scale-110 transition-transform duration-500 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-heading font-medium text-charcoal mb-1.5">{item.name}</h3>
                  <p className="text-xs text-charcoal/50 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
