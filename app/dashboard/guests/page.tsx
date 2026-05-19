"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Loader2, Mail, Phone, MoreHorizontal, User, ChevronRight } from 'lucide-react';

export default function GuestsPage() {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const res = await fetch('/api/v1/guests');
        const data = await res.json();
        setGuests(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setGuests([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGuests();
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
          <h1 className="text-3xl font-heading font-medium text-[#2D2D2D]">Base de Huéspedes</h1>
          <p className="text-sm text-[#8C8C8C] mt-1">Directorio de clientes y fidelización</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {guests.length === 0 ? (
          <div className="col-span-full py-20 text-center border border-dashed border-[#E8E4D9] rounded-[32px] bg-white">
            <p className="text-[#8C8C8C] font-medium">No hay huéspedes registrados aún.</p>
          </div>
        ) : (
          guests.map((guest, i) => (
            <motion.div 
              key={guest.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-8 rounded-[32px] border border-[#E8E4D9] shadow-sm hover:border-[#A68A64]/40 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#F9F7F2] flex items-center justify-center text-[#A68A64] border border-[#E8E4D9]">
                  <User size={24} strokeWidth={1.5} />
                </div>
                <button className="p-2 text-[#8C8C8C] hover:text-[#2D2D2D] transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <h3 className="font-semibold text-xl text-[#2D2D2D] mb-4">{guest.name}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-[#6B6B6B]">
                  <div className="w-8 h-8 rounded-lg bg-[#F9F7F2] flex items-center justify-center text-[#A68A64]">
                    <Mail size={14} />
                  </div>
                  {guest.email}
                </div>
                
                <div className="pt-4 border-t border-[#F2EEE4] flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-widest">Registrado</span>
                    <span className="text-xs font-medium text-[#4A4A4A]">{new Date(guest.created_at).toLocaleDateString('es-MX')}</span>
                  </div>
                  <ChevronRight size={18} className="text-[#E8E4D9] group-hover:text-[#A68A64] transition-colors" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

