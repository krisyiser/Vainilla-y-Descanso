"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, we would send this to Supabase
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0E17] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20"
          >
            {submitted ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">¡Solicitud Enviada!</h2>
                <p className="text-gray-400">Nuestro equipo de recepción te contactará en breve para confirmar tu reservación.</p>
              </div>
            ) : (
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-white">Reservar Suite</h2>
                  <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-400"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                      <input 
                        required
                        type="text" 
                        placeholder="Nombre completo" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                      <input 
                        required
                        type="email" 
                        placeholder="Correo electrónico" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                        <input 
                          required
                          type="date" 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                        <input 
                          required
                          type="date" 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors text-sm"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-6 text-primary" size={20} />
                      <textarea 
                        placeholder="¿Alguna petición especial?" 
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-black py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
                  >
                    <Send size={20} /> Enviar Solicitud
                  </button>
                  <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">Al enviar aceptas nuestras políticas de privacidad</p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
