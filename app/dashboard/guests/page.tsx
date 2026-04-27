"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Loader2, Mail, Phone, MoreHorizontal, User } from 'lucide-react';

export default function GuestsPage() {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const res = await fetch('/api/v1/guests');
        const data = await res.json();
        setGuests(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchGuests();
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
            Base de <span className="text-gradient-gold font-medium italic pr-2">Huéspedes</span>
          </h1>
          <p className="text-sm font-light text-gray-500 tracking-wide">Directorio de clientes y fidelización</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {guests.length === 0 ? (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500 font-light">No hay huéspedes registrados aún.</p>
          </div>
        ) : (
          guests.map((guest, i) => (
            <motion.div 
              key={guest.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] transition-elite group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/5">
                  <User size={20} strokeWidth={1.5} />
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <MoreHorizontal size={18} strokeWidth={1.5} />
                </button>
              </div>
              <h3 className="font-medium text-lg text-white mb-4">{guest.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm font-light text-gray-500">
                  <Mail size={14} className="text-primary/50" />
                  {guest.email}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 mt-4">
                  Registrado: {new Date(guest.created_at).toLocaleDateString('es-MX')}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
