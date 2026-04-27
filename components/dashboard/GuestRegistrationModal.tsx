"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Bed, Calendar, ArrowRight, Loader2 } from 'lucide-react';

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

      alert('Registro completado con éxito');
      onClose();
      window.location.reload(); // Refresh to show new data
    } catch (error) {
      console.error(error);
      alert('Error al procesar el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#090A0F]/80 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full sm:h-auto sm:max-w-3xl bg-[#0C0E14] border border-white/5 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-8 border-b border-white/5">
            <div>
              <h2 className="text-2xl font-light text-white tracking-tight">Registro de Huésped</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-1">Asignación de Suite</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Form Area */}
          <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <User className="text-primary/70" size={16} strokeWidth={1.5} />
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white">Información Personal</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">Nombre Completo</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors font-light text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">Correo Electrónico</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors font-light text-sm" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Bed className="text-primary/70" size={16} strokeWidth={1.5} />
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white">Estancia</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">Fechas (Check-in / Check-out)</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Ej: 26-30 Abril"
                      value={formData.dates}
                      onChange={(e) => setFormData({...formData, dates: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors font-light text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">Suite Asignada</label>
                    <select 
                      value={formData.roomId}
                      onChange={(e) => setFormData({...formData, roomId: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors font-light text-sm appearance-none"
                    >
                      <option value="101" className="bg-[#0C0E14]">101 - Moros y Cristianos</option>
                      <option value="102" className="bg-[#0C0E14]">102 - El Volador</option>
                      <option value="201" className="bg-[#0C0E14]">201 - Santiagueros</option>
                      <option value="202" className="bg-[#0C0E14]">202 - Guagua</option>
                      <option value="203" className="bg-[#0C0E14]">203 - Negritos</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-end">
                <button 
                  type="button" 
                  onClick={onClose}
                  disabled={loading}
                  className="px-8 py-3 text-xs tracking-widest uppercase text-gray-500 hover:text-white transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-white text-black rounded-full text-xs font-medium tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={14} /> : 'Confirmar'} <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
