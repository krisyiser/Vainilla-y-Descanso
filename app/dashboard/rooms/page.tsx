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
        setRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
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
          <h1 className="text-3xl font-heading font-medium text-[#2D2D2D]">Gestión de Suites</h1>
          <p className="text-sm text-[#8C8C8C] mt-1">Inventario y disponibilidad de habitaciones</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#E8E4D9] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F9F7F2] border-b border-[#E8E4D9]">
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">ID</th>
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Nombre de Suite</th>
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Categoría</th>
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Estado Actual</th>
                <th className="text-left py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Precio Noche</th>
                <th className="text-right py-6 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EEE4]">
              {rooms.map((room, i) => (
                <motion.tr 
                  key={room.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-[#F9F7F2]/50 transition-colors group"
                >
                  <td className="py-6 px-8 text-sm font-bold text-[#A68A64]">{room.id}</td>
                  <td className="py-6 px-8 text-sm font-semibold text-[#2D2D2D]">{room.name}</td>
                  <td className="py-6 px-8 text-sm font-medium text-[#6B6B6B]">{room.type}</td>
                  <td className="py-6 px-8">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                      room.status === 'available' ? 'border-[#8E9B8E]/30 text-[#8E9B8E] bg-[#8E9B8E]/5' :
                      room.status === 'occupied' ? 'border-[#A68A64]/30 text-[#A68A64] bg-[#A68A64]/5' :
                      'border-[#C2A88D]/30 text-[#C2A88D] bg-[#C2A88D]/5'
                    }`}>
                      {room.status === 'available' ? 'Disponible' : room.status === 'occupied' ? 'Ocupada' : 'Limpieza'}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-sm font-semibold text-[#2D2D2D]">${room.price.toLocaleString()}</td>
                  <td className="py-6 px-8 text-right">
                    <button className="p-2 text-[#8C8C8C] hover:text-[#2D2D2D] transition-colors rounded-lg hover:bg-white border border-transparent hover:border-[#E8E4D9]">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

