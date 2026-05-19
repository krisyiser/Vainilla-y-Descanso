"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Loader2, MoreHorizontal, User, Bed, ChevronRight } from 'lucide-react';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await fetch('/api/v1/reservations');
        const data = await res.json();
        setReservations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#A68A64]" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-medium text-[#2D2D2D]">Calendario de Estancias</h1>
          <p className="text-sm text-[#8C8C8C] mt-1">Registro de entradas y salidas programadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reservations.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#E8E4D9] rounded-[32px] bg-white">
            <p className="text-[#8C8C8C] font-medium">No hay reservaciones registradas aún.</p>
          </div>
        ) : (
          reservations.map((res, i) => (
            <motion.div 
              key={res.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 bg-white border border-[#E8E4D9] rounded-2xl flex items-center justify-between group hover:border-[#A68A64]/40 transition-all shadow-sm"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#F9F7F2] flex items-center justify-center text-[#A68A64] border border-[#E8E4D9]">
                  <CalendarCheck size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D2D2D] text-lg">{res.guestName}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-2 text-[10px] text-[#A68A64] font-bold uppercase tracking-widest bg-[#F9F7F2] px-2 py-0.5 rounded-md"><Bed size={12} /> Suite {res.roomId}</span>
                    <span className="text-[10px] text-[#8C8C8C] font-bold uppercase tracking-widest">•</span>
                    <span className="text-xs text-[#6B6B6B] font-medium italic">{res.dates}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-3 text-[#8C8C8C] hover:text-[#2D2D2D] bg-[#F9F7F2] rounded-xl transition-colors">
                  <MoreHorizontal size={20} />
                </button>
                <ChevronRight size={20} className="text-[#E8E4D9] group-hover:text-[#A68A64] transition-colors" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

