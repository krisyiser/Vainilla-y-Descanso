"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BedDouble, CalendarClock, TrendingUp, Search, Plus, 
  ArrowUpRight, User, Coffee, Wifi, MapPin, Loader2
} from 'lucide-react';
import GuestRegistrationModal from '@/components/dashboard/GuestRegistrationModal';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [roomsRes, resRes] = await Promise.all([
          fetch('/api/v1/rooms'),
          fetch('/api/v1/reservations')
        ]);
        const roomsData = await roomsRes.json();
        const resData = await resRes.json();
        setRooms(roomsData);
        setReservations(resData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getGuestForRoom = (roomId: string) => {
    const res = reservations.find(r => r.roomId === roomId);
    return res ? res.guestName : '-';
  };

  const occupiedCount = rooms.filter(r => r.status === 'occupied').length;
  const occupancyRate = rooms.length > 0 ? Math.round((occupiedCount / rooms.length) * 100) : 0;

  const stats = [
    { label: 'Check-ins', value: reservations.length.toString(), trend: 'Total' },
    { label: 'Ocupación', value: `${occupancyRate}%`, trend: 'En vivo' },
    { label: 'Suites', value: rooms.length.toString(), trend: 'Activas' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pb-20 relative">
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[40%] h-[200px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
        <div>
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-primary/50 to-transparent mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-light tracking-tight text-white mb-2">
            Vista <span className="text-gradient-gold font-medium italic pr-2">General</span>
          </h1>
          <p className="text-sm font-light text-gray-500 tracking-wide">Resumen operativo en tiempo real</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={16} strokeWidth={1.5} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="bg-transparent border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/50 transition-elite w-64 font-light text-white"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-full font-medium text-xs tracking-widest uppercase overflow-hidden transition-elite hover:bg-[#EAEAEA]"
          >
            <Plus size={16} strokeWidth={2} className="group-hover:rotate-90 transition-elite" /> Nuevo Registro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
        {/* Left Column: Minimalist Stats */}
        <div className="lg:col-span-1 space-y-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] flex flex-col gap-4 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-elite" />
              <div className="flex justify-between items-center relative z-10">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500">{stat.label}</span>
                <span className="text-[9px] font-medium text-primary/70 uppercase tracking-widest">{stat.trend}</span>
              </div>
              <span className="font-heading text-4xl font-light text-white tracking-tight relative z-10">{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Center: Elegant Room Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {rooms.map((room, i) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 border border-white/5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.03] transition-elite cursor-pointer flex flex-col justify-between min-h-[220px] backdrop-blur-sm hover:border-primary/20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-elite" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-gray-500 mb-3 block">{room.type} Suite</span>
                    <h3 className="font-heading font-light text-xl text-white tracking-tight group-hover:text-primary transition-elite">{room.name}</h3>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shadow-[0_0_10px] ${
                    room.status === 'available' ? 'bg-green-500/80 shadow-green-500/50' :
                    room.status === 'occupied' ? 'bg-primary/80 shadow-primary/50' :
                    room.status === 'cleaning' ? 'bg-amber-500/80 shadow-amber-500/50' :
                    'bg-red-500/80 shadow-red-500/50'
                  }`} />
                </div>

                <div className="mt-8 space-y-4 relative z-10 border-t border-white/5 pt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-500 mb-1 block">Huésped</span>
                      <span className="text-sm font-light text-white/90">{getGuestForRoom(room.id)}</span>
                    </div>
                    <ArrowUpRight size={18} strokeWidth={1} className="text-gray-500 group-hover:text-primary transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <GuestRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
