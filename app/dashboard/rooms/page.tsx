"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Plus, Search, Filter, MoreHorizontal, Loader2 } from 'lucide-react';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch('/api/v1/rooms');
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
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
            Gestión de <span className="text-gradient-gold font-medium italic pr-2">Suites</span>
          </h1>
          <p className="text-sm font-light text-gray-500 tracking-wide">Inventario y estado de habitaciones</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-6 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">ID</th>
              <th className="text-left py-6 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">Nombre</th>
              <th className="text-left py-6 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">Tipo</th>
              <th className="text-left py-6 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">Estado</th>
              <th className="text-left py-6 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">Precio</th>
              <th className="text-right py-6 px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, i) => (
              <motion.tr 
                key={room.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-elite group"
              >
                <td className="py-6 px-4 text-sm font-light text-white/50">{room.id}</td>
                <td className="py-6 px-4 text-sm font-medium text-white">{room.name}</td>
                <td className="py-6 px-4 text-sm font-light text-gray-400">{room.type}</td>
                <td className="py-6 px-4">
                  <span className={`text-[9px] font-medium uppercase tracking-widest px-3 py-1 rounded-full border ${
                    room.status === 'available' ? 'border-green-500/20 text-green-500 bg-green-500/5' :
                    room.status === 'occupied' ? 'border-primary/20 text-primary bg-primary/5' :
                    'border-amber-500/20 text-amber-500 bg-amber-500/5'
                  }`}>
                    {room.status === 'available' ? 'Disponible' : room.status === 'occupied' ? 'Ocupada' : 'Limpieza'}
                  </span>
                </td>
                <td className="py-6 px-4 text-sm font-light text-white">${room.price}</td>
                <td className="py-6 px-4 text-right">
                  <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
