"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, MessageSquare, Send, CheckCircle2, Loader2, BedDouble, Cloud, MessageCircle, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedSuite?: any;
}

const availableSuites = [
  { id: '101', name: 'Moros y Cristianos (PB)', price: 1900, minCapacity: 3, maxCapacity: 6 },
  { id: '102', name: 'El Volador (PB)', price: 1200, minCapacity: 2, maxCapacity: 4 },
  { id: '201', name: 'Santiagueros (PA)', price: 1200, minCapacity: 2, maxCapacity: 4 },
  { id: '202', name: 'Guaguas (PA)', price: 900, minCapacity: 1, maxCapacity: 2 },
  { id: '203', name: 'Negritos (PA)', price: 900, minCapacity: 1, maxCapacity: 2 },
];

export default function ReservationModal({ isOpen, onClose, selectedSuite }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');
  const [formData, setFormData] = useState({
    roomId: '101',
    name: '',
    email: '',
    phone: '',
    origin: '',
    guestsCount: 3,
    checkIn: '',
    checkOut: '',
    notes: ''
  });

  useEffect(() => {
    if (selectedSuite && selectedSuite.id) {
      const suiteId = String(selectedSuite.id);
      const suite = availableSuites.find(s => s.id === suiteId) || availableSuites[0];
      setFormData(prev => ({ 
        ...prev, 
        roomId: suiteId,
        guestsCount: suite.minCapacity
      }));
    }
  }, [selectedSuite, isOpen]);

  // Adjust guests count if selected room changes
  const handleRoomChange = (roomId: string) => {
    const suite = availableSuites.find(s => s.id === roomId) || availableSuites[0];
    setFormData(prev => ({ 
      ...prev, 
      roomId, 
      guestsCount: suite.minCapacity 
    }));
  };

  const selectedSuiteObj = availableSuites.find(s => s.id === formData.roomId) || availableSuites[0];
  let nights = 1;
  if (formData.checkIn && formData.checkOut) {
    const cin = new Date(formData.checkIn).getTime();
    const cout = new Date(formData.checkOut).getTime();
    if (cout > cin) {
      nights = Math.max(1, Math.ceil((cout - cin) / (1000 * 60 * 60 * 24)));
    }
  }
  const estimatedPrice = nights * selectedSuiteObj.price;

  // Generate valid guest range options
  const guestOptions = [];
  for (let i = selectedSuiteObj.minCapacity; i <= selectedSuiteObj.maxCapacity; i++) {
    guestOptions.push(i);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSyncStatusMsg('');

    try {
      const response = await fetch('/api/v1/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_id: formData.roomId,
          guest_name: formData.name,
          guest_email: formData.email,
          guest_phone: formData.phone,
          guest_origin: formData.origin,
          guests_count: formData.guestsCount,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          total_price: Number(estimatedPrice),
          notes: formData.notes
        })
      });

      const data = await response.json();

      if (response.ok || response.status === 201 || response.status === 202) {
        setSyncStatusMsg(data.message || 'Tu solicitud ha sido recibida con éxito.');
        setSubmitted(true);
        
        // Redirigir a WhatsApp con el mensaje predeterminado y nuevos datos
        const text = encodeURIComponent(
          `¡Hola Vainilla & Descanso! 🌿\n\nQuiero confirmar mi solicitud de reservación:\n👤 Huésped: ${formData.name}\n📞 Teléfono: ${formData.phone}\n📧 Correo: ${formData.email}\n📍 Procedencia: ${formData.origin || 'No especificada'}\n🏨 Suite: ${selectedSuiteObj.name}\n👥 Huéspedes: ${formData.guestsCount} pers.\n📅 Fechas: ${formData.checkIn} al ${formData.checkOut}\n📝 Notas: ${formData.notes || 'Ninguna'}\n\nQuedo a la espera de la confirmación de la tarifa dinámica para realizar el pago. ¡Gracias!`
        );
        const whatsappUrl = `https://wa.me/527821862711?text=${text}`;
        if (typeof window !== 'undefined') {
          window.open(whatsappUrl, '_blank');
        }

        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({ 
            roomId: selectedSuiteObj?.id || '101', 
            name: '', 
            email: '', 
            phone: '', 
            origin: '', 
            guestsCount: selectedSuiteObj?.minCapacity || 3, 
            checkIn: '', 
            checkOut: '', 
            notes: '' 
          });
        }, 5000);
      } else {
        throw new Error(data.error || 'No se pudo procesar la reservación');
      }
    } catch (error: any) {
      console.error('Error al reservar:', error);
      alert(error.message || 'Ocurrió un error al enviar la reservación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] overflow-hidden shadow-2xl border border-clay/30 max-h-[90vh] flex flex-col"
          >
            {submitted ? (
              <div className="p-12 md:p-16 text-center flex flex-col items-center overflow-y-auto">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] mb-8 shrink-0"
                >
                  <CheckCircle2 size={56} />
                </motion.div>
                <h2 className="text-3xl font-heading font-medium text-charcoal mb-4">¡Solicitud en Proceso!</h2>
                <p className="text-charcoal/70 font-light leading-relaxed max-w-md mb-6 text-sm">
                  Gracias <span className="font-medium text-charcoal">{formData.name.split(' ')[0]}</span>. 
                  Se ha abierto una ventana a WhatsApp para continuar con tu reservación y pago.
                </p>
                <div className="px-5 py-2.5 bg-bone rounded-full text-[10px] font-bold uppercase tracking-widest text-charcoal/60 flex items-center gap-2 shadow-sm border border-clay/30">
                  <Cloud size={14} className="text-[#25D366]" /> Conexión Directa • Vainilla & Descanso
                </div>
                <div className="mt-10 w-full h-1 bg-bone overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5 }}
                    className="h-full bg-[#25D366]"
                  />
                </div>
              </div>
            ) : (
              <div className="p-8 md:p-12 text-left overflow-y-auto custom-scrollbar-light flex-grow">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-3">
                    <Image src="/logo vainilla y descanso.png" alt="Vainilla & Descanso Logo" width={140} height={46} className="h-10 w-auto object-contain" />
                    <h2 className="text-3xl font-heading font-medium text-charcoal pt-1">Reserva tu Experiencia</h2>
                  </div>
                  <button onClick={onClose} className="p-3 bg-bone hover:bg-clay/20 rounded-full text-charcoal/40 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Nombre Completo */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                      <input 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        type="text" 
                        placeholder="Ej. Juan Pérez" 
                        className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Teléfono y Correo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Teléfono</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <input 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          type="tel" 
                          placeholder="Ej. 782 186 2711" 
                          className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-primary transition-colors text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Correo Electrónico</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <input 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          type="email" 
                          placeholder="juan@email.com" 
                          className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-primary transition-colors text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Procedencia */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Procedencia</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                      <input 
                        value={formData.origin}
                        onChange={(e) => setFormData({...formData, origin: e.target.value})}
                        type="text" 
                        placeholder="Ej. CDMX, Poza Rica, Monterrey" 
                        className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Suite y Configuración de Huéspedes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Seleccionar Suite</label>
                      <div className="relative">
                        <BedDouble className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <select
                          value={formData.roomId}
                          onChange={(e) => handleRoomChange(e.target.value)}
                          className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none focus:border-primary transition-colors text-sm font-medium appearance-none"
                        >
                          {availableSuites.map((s) => (
                            <option key={s.id} value={s.id}>
                              Suite {s.id}: {s.name.split('(')[0].trim()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Huéspedes (Límite Ajustado)</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <select
                          value={formData.guestsCount}
                          onChange={(e) => setFormData({...formData, guestsCount: Number(e.target.value)})}
                          className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none focus:border-primary transition-colors text-sm font-medium appearance-none"
                        >
                          {guestOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt} {opt === 1 ? 'persona' : 'personas'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Fechas de Ingreso y Salida */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Ingreso</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <input 
                          required
                          value={formData.checkIn}
                          onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                          type="date" 
                          className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none focus:border-primary transition-colors text-sm appearance-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Salida</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <input 
                          required
                          value={formData.checkOut}
                          onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                          type="date" 
                          className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal focus:outline-none focus:border-primary transition-colors text-sm appearance-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Observaciones Especiales */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Observaciones Especiales</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 text-primary/40" size={18} />
                      <textarea 
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Requerimientos especiales, alergias, preferencias de almohadas..." 
                        rows={3}
                        className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-primary transition-colors resize-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Info Tarifa Dinámica */}
                  <div className="p-4 bg-clay/10 rounded-2xl border border-clay/30 flex justify-between items-center text-charcoal">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Tarifa Dinámica Garantizada</span>
                      <span className="text-xs text-charcoal/70 font-light mt-0.5">El costo final se aplicará con la tarifa dinámica vigente de temporada al confirmar tu reserva en WhatsApp.</span>
                    </div>
                  </div>

                  {/* Botón enviar */}
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-6 px-8 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl shadow-[#25D366]/30 disabled:opacity-50 transform hover:-translate-y-1 active:translate-y-0"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <MessageCircle size={22} className="animate-pulse" />}
                    <span>{loading ? 'Transmitiendo Solicitud...' : 'Confirmar Solicitud y Pagar en WhatsApp'}</span>
                  </button>
                  <p className="text-[9px] text-charcoal/40 text-center uppercase tracking-widest">
                    Conexión encriptada directa con el concierge del Hotel Vainilla & Descanso.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
