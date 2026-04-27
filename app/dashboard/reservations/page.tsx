"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Loader2, MoreHorizontal, User, Bed } from 'lucide-react';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await fetch('/api/v1/reservations');
        const data = await res.json();
        setReservations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary/50 to-transparent mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-light tracking-tight text-white mb-2">
            Calendario de <span className="text-gradient-gold font-medium italic pr-2">Estancias</span>
          </h1>
          <p className="text-sm font-light text-gray-500 tracking-wide">Registro histórico y futuro de reservaciones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reservations.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500 font-light">No hay reservaciones registradas aún.</p>
          </div>
        ) : (
          reservations.map((res, i) => (
            <motion.div 
              key={res.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 border border-white/5 rounded-2xl bg-white/[0.01] flex items-center justify-between group hover:bg-white/[0.03] transition-elite"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                  <CalendarCheck size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-medium text-white">{res.guestName}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-widest"><Bed size={12} /> Suite {res.roomId}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">•</span>
                    <span className="text-[10px] text-gray-400 font-medium">{res.dates}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <MoreHorizontal size={18} strokeWidth={1.5} />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
