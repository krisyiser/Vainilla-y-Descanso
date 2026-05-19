"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, BedDouble, CalendarClock, TrendingUp, Search, Plus, 
  ArrowUpRight, User, Coffee, Wifi, MapPin, Loader2, ChevronRight
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
        
        setRooms(Array.isArray(roomsData) ? roomsData : []);
        setReservations(Array.isArray(resData) ? resData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setRooms([]);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getGuestForRoom = (roomId: string) => {
    if (!Array.isArray(reservations)) return '-';
    const res = reservations.find(r => r.roomId === roomId);
    return res ? res.guestName : '-';
  };

  const occupiedCount = Array.isArray(rooms) ? rooms.filter(r => r.status === 'occupied').length : 0;
  const occupancyRate = rooms.length > 0 ? Math.round((occupiedCount / rooms.length) * 100) : 0;

  const stats = [
    { label: 'Check-ins Hoy', value: reservations.length.toString(), color: 'bg-[#A68A64]' },
    { label: 'Ocupación Total', value: `${occupancyRate}%`, color: 'bg-[#8E9B8E]' },
    { label: 'Ingresos Est.', value: `$${(occupiedCount * 1400).toLocaleString()}`, color: 'bg-[#C2A88D]' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#A68A64]" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-medium text-[#2D2D2D]">Panel de Control</h1>
          <p className="text-sm text-[#8C8C8C] mt-1">Gestión operativa y estado del inventario</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden xl:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8C8C]" size={16} />
            <input 
              type="text" 
              placeholder="Buscar habitación..." 
              className="bg-white border border-[#E8E4D9] rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]/20 transition-all w-64"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#A68A64] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#8E7554] shadow-sm transition-all active:scale-95"
          >
            <Plus size={18} /> Registrar Ingreso
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-3xl border border-[#E8E4D9] shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C] mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-heading font-medium text-[#2D2D2D]">{stat.value}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center text-white`}>
                <TrendingUp size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Room Status */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#2D2D2D] flex items-center gap-2">
            Estado de Suites
            <span className="text-[10px] font-bold bg-[#F2EEE4] text-[#8C8C8C] px-2 py-0.5 rounded-full">{rooms.length} Total</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {rooms.map((room, i) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-6 rounded-3xl border border-[#E8E4D9] shadow-sm hover:border-[#A68A64]/50 transition-all cursor-pointer flex flex-col justify-between min-h-[180px]"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    room.status === 'available' ? 'bg-[#8E9B8E]/10 text-[#8E9B8E]' :
                    room.status === 'occupied' ? 'bg-[#A68A64]/10 text-[#A68A64]' :
                    'bg-[#C2A88D]/10 text-[#C2A88D]'
                  }`}>
                    <BedDouble size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-widest">{room.id}</p>
                    <h3 className="font-semibold text-[#2D2D2D] leading-tight">{room.name}</h3>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  room.status === 'available' ? 'bg-[#8E9B8E]' :
                  room.status === 'occupied' ? 'bg-[#A68A64]' :
                  'bg-[#C2A88D]'
                }`} />
              </div>

              <div className="mt-6 pt-4 border-t border-[#F9F7F2]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-[#8C8C8C] uppercase tracking-[0.1em]">Huésped Actual</span>
                    <span className="text-sm font-medium text-[#4A4A4A] truncate max-w-[120px]">{getGuestForRoom(room.id)}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F9F7F2] flex items-center justify-center text-[#8C8C8C] group-hover:text-[#A68A64] transition-colors">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <GuestRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

