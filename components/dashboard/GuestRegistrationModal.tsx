"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Bed, Calendar, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuestRegistrationModal({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dates: '',
    roomId: '101'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Guest
      const guestRes = await fetch('/api/v1/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email })
      });
      const guest = await guestRes.json();

      // 2. Create Reservation
      await fetch('/api/v1/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          guestId: guest.id, 
          guestName: formData.name,
          roomId: formData.roomId, 
          dates: formData.dates 
        })
      });

      // 3. Update Room Status
      await fetch('/api/v1/rooms', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: formData.roomId, status: 'occupied' })
      });

      onClose();
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      alert('Error al procesar el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#2D2D2D]/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#F9F7F2] p-10 border-b border-[#E8E4D9] flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-heading font-medium text-[#2D2D2D]">Nuevo Registro</h2>
              <p className="text-xs text-[#8C8C8C] mt-1 uppercase tracking-widest font-bold">Check-in Lobby</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white border border-[#E8E4D9] flex items-center justify-center text-[#8C8C8C] hover:text-red-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Form Area */}
          <div className="p-10 overflow-y-auto max-h-[70vh] custom-scrollbar-light">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#A68A64]">
                    <User size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Información del Huésped</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#4A4A4A] ml-1">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#F9F7F2] border border-[#E8E4D9] rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]/20 transition-all" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#4A4A4A] ml-1">Correo Electrónico</label>
                    <input 
                      required
                      type="email" 
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#F9F7F2] border border-[#E8E4D9] rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]/20 transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#A68A64]">
                    <Bed size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Detalles de Estancia</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#4A4A4A] ml-1">Fechas de Estancia</label>
                    <input 
                      required
                      type="text" 
                      placeholder="26 Abr - 30 Abr"
                      value={formData.dates}
                      onChange={(e) => setFormData({...formData, dates: e.target.value})}
                      className="w-full bg-[#F9F7F2] border border-[#E8E4D9] rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]/20 transition-all" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#4A4A4A] ml-1">Seleccionar Suite</label>
                    <select 
                      value={formData.roomId}
                      onChange={(e) => setFormData({...formData, roomId: e.target.value})}
                      className="w-full bg-[#F9F7F2] border border-[#E8E4D9] rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#A68A64]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="101">101 - Moros y Cristianos</option>
                      <option value="102">102 - El Volador</option>
                      <option value="201">201 - Santiagueros</option>
                      <option value="202">202 - Guagua</option>
                      <option value="203">203 - Negritos</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#F2EEE4] flex flex-col md:flex-row gap-4 justify-end">
                <button 
                  type="button" 
                  onClick={onClose}
                  disabled={loading}
                  className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-[#8C8C8C] hover:text-[#2D2D2D] transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 bg-[#A68A64] text-white rounded-2xl text-xs font-bold tracking-widest uppercase hover:bg-[#8E7554] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#A68A64]/20 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} 
                  Confirmar Registro
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

