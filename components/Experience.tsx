"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Utensils, Car, Briefcase, ChevronRight, Clock, Star } from 'lucide-react';

interface ExperienceItem {
  title: string;
  time: string;
  price?: string;
  icon: React.ReactNode;
  details?: string[];
  subsections?: { label: string; text: string }[];
  items?: { label: string; text: string }[];
  bg: string;
  accent: string;
}

const experiencesData: ExperienceItem[] = [
  {
    title: "Desayuno Gourmet",
    time: "8:00 AM - 12:00 PM",
    price: "$189 p/p",
    icon: <Utensils />,
    details: [
      "Café y Pan artesanal",
      "Jugo natural y Fruta del día",
      "Platillo: Chilaquiles, huevo, frijoles"
    ],
    bg: "bg-orange-500/5",
    accent: "text-orange-500"
  },
  {
    title: "Área Climatizada",
    time: "8:00 AM - 11:00 PM",
    icon: <Briefcase />,
    subsections: [
      { label: "Mañana", text: "Área de Desayunos" },
      { label: "Tarde", text: "Juntas y Conferencias" },
      { label: "Noche", text: "Exclusivo Cafe-Bar" }
    ],
    bg: "bg-blue-500/5",
    accent: "text-blue-400"
  },
  {
    title: "Servicios Extra",
    time: "Disponibles 24/7",
    icon: <Star />,
    items: [
      { label: "Parking", text: "$50 día / $15 h" },
      { label: "Day Pass", text: "$100 Full Access" }
    ],
    bg: "bg-primary/5",
    accent: "text-primary"
  }
];

export default function Experience() {
  return (
    <section id="experiencia" className="py-24 bg-[#0A0E17] relative overflow-hidden">
      {/* Decorative circles for mobile texture */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block"
          >
            Servicios Exclusivos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Experiencia <br className="md:hidden" /> Completa
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experiencesData.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-[2rem] border border-white/5 ${exp.bg} flex flex-col relative group overflow-hidden`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${exp.accent}`}>
                  {React.cloneElement(exp.icon as React.ReactElement, { size: 24 })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <Clock size={10} /> {exp.time}
                  </div>
                </div>
              </div>

              {exp.details && (
                <div className="space-y-3 mb-6 flex-grow">
                  {exp.details.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className={`w-1 h-1 rounded-full ${exp.accent.replace('text', 'bg')}`}></div>
                      {item}
                    </div>
                  ))}
                </div>
              )}

              {exp.subsections && (
                <div className="grid grid-cols-3 gap-2 mb-6 flex-grow">
                  {exp.subsections.map((sub, i) => (
                    <div key={i} className="text-center p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className={`text-[9px] font-bold block mb-1 uppercase tracking-tighter ${exp.accent}`}>{sub.label}</span>
                      <p className="text-[10px] text-gray-400 leading-tight">{sub.text.split(' ')[0]}</p>
                    </div>
                  ))}
                </div>
              )}

              {exp.items && (
                <div className="space-y-2 mb-6 flex-grow">
                  {exp.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                      <span className="text-xs text-white font-bold">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                {exp.price ? (
                  <span className="text-lg font-black text-white">{exp.price}</span>
                ) : (
                  <span className="text-xs font-bold text-gray-500 italic">Consultar disponibilidad</span>
                )}
                <button className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform ${exp.accent}`}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
