"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, MessageSquare, CheckCircle2, Loader2, BedDouble, Cloud, MessageCircle, Phone, MapPin, Car } from 'lucide-react';
import Image from 'next/image';

import { getCanonicalRoomId } from '@/lib/roomUtils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedSuite?: any;
}

const availableSuites = [
  { id: '101', name: 'Moros y cristianos (Suite)', price: 1900, minCapacity: 1, maxCapacity: 6 },
  { id: '102', name: 'El Volador (Suite)', price: 1200, minCapacity: 1, maxCapacity: 4 },
  { id: '103', name: 'Guagua (Estándar)', price: 900, minCapacity: 1, maxCapacity: 2 },
  { id: '104', name: 'Negritos (Estándar)', price: 900, minCapacity: 1, maxCapacity: 2 },
  { id: '105', name: 'Santiagueros (Suite)', price: 1200, minCapacity: 1, maxCapacity: 4 },
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
    guestsCount: 1,
    checkIn: '',
    checkOut: '',
    hasParking: false,
    notes: ''
  });

  useEffect(() => {
    if (selectedSuite && selectedSuite.id) {
      const suiteId = getCanonicalRoomId(selectedSuite.id);
      setFormData(prev => ({ 
        ...prev, 
        roomId: suiteId,
        guestsCount: 1
      }));
    }
  }, [selectedSuite, isOpen]);

  // Adjust guests count if selected room changes
  const handleRoomChange = (roomId: string) => {
    const canonicalId = getCanonicalRoomId(roomId);
    setFormData(prev => ({ 
      ...prev, 
      roomId: canonicalId, 
      guestsCount: 1 
    }));
  };

  const selectedSuiteObj = availableSuites.find(s => s.id === formData.roomId) || availableSuites[0];

  const calculateDynamicPrice = (roomId: string, checkInStr: string, checkOutStr: string) => {
    if (!checkInStr || !checkOutStr) return 0;
    
    const [inYear, inMonth, inDay] = checkInStr.split('-').map(Number);
    const [outYear, outMonth, outDay] = checkOutStr.split('-').map(Number);
    
    const start = new Date(inYear, inMonth - 1, inDay);
    const end = new Date(outYear, outMonth - 1, outDay);
    
    if (end < start) return 0;

    const prices: Record<string, { weekday: number, weekend: number, high: number }> = {
      '101': { weekday: 1900, weekend: 2300, high: 2800 },
      '102': { weekday: 1200, weekend: 1600, high: 1950 },
      '103': { weekday: 900, weekend: 1100, high: 1400 },
      '104': { weekday: 900, weekend: 1100, high: 1400 },
      '105': { weekday: 1200, weekend: 1600, high: 1950 },
    };

    const canonicalId = getCanonicalRoomId(roomId);
    const suitePrices = prices[canonicalId] || prices['101'];
    
    // Mismo día (Entrada y salida el mismo día / Pasadía)
    if (start.getTime() === end.getTime()) {
      const day = start.getDay();
      if (day >= 1 && day <= 3) return suitePrices.weekday;
      if (day === 6) return suitePrices.high;
      return suitePrices.weekend;
    }

    // Varias noches
    let totalPrice = 0;
    let current = new Date(start);
    
    while (current < end) {
      const day = current.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
      if (day >= 1 && day <= 3) {
        totalPrice += suitePrices.weekday;
      } else if (day === 6) {
        totalPrice += suitePrices.high;
      } else {
        totalPrice += suitePrices.weekend; // Jueves, Viernes, Domingo
      }
      
      current.setDate(current.getDate() + 1);
    }
    
    return totalPrice;
  };

  let nights = 0;
  let estimatedPrice = 0;
  let isSameDay = false;

  if (formData.checkIn && formData.checkOut) {
    const [inYear, inMonth, inDay] = formData.checkIn.split('-').map(Number);
    const [outYear, outMonth, outDay] = formData.checkOut.split('-').map(Number);
    const start = new Date(inYear, inMonth - 1, inDay);
    const end = new Date(outYear, outMonth - 1, outDay);

    if (end.getTime() === start.getTime()) {
      isSameDay = true;
      nights = 1;
      estimatedPrice = calculateDynamicPrice(formData.roomId, formData.checkIn, formData.checkOut);
    } else if (end > start) {
      nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
      estimatedPrice = calculateDynamicPrice(formData.roomId, formData.checkIn, formData.checkOut);
    }
  }

  const parkingCost = formData.hasParking ? (50 * Math.max(1, nights)) : 0;
  const grandTotalPrice = estimatedPrice + parkingCost;

  // Generate valid guest range options starting at 1 for all suites
  const guestOptions = [];
  for (let i = 1; i <= selectedSuiteObj.maxCapacity; i++) {
    guestOptions.push(i);
  }

  const buildWhatsAppUrl = () => {
    const datesStr = isSameDay 
      ? `${formData.checkIn} (Mismo día / Pasadía)`
      : `${formData.checkIn} al ${formData.checkOut} (${nights} noche${nights > 1 ? 's' : ''})`;

    const parkingText = formData.hasParking ? 'Sí (+$50 MXN/día)' : 'No';

    const text = encodeURIComponent(
      `¡Hola Vainilla & Descanso! 🌿\n\nQuiero confirmar mi solicitud de reservación:\n👤 Huésped: ${formData.name}\n📞 Teléfono: ${formData.phone}\n📧 Correo: ${formData.email}\n📍 Procedencia: ${formData.origin || 'No especificada'}\n🏨 Suite: ${selectedSuiteObj.name}\n👥 Huéspedes: ${formData.guestsCount} pers.\n🚗 Estacionamiento: ${parkingText}\n📅 Fechas: ${datesStr}\n💰 Subtotal Estimado: $${grandTotalPrice.toLocaleString('es-MX')} MXN\n📝 Notas: ${formData.notes || 'Ninguna'}\n\nQuedo a la espera de la confirmación de la tarifa para realizar mi pago. ¡Muchas gracias!`
    );
    return `https://wa.me/527821862711?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSyncStatusMsg('');

    const parkingHeader = formData.hasParking ? '[Estacionamiento: Sí]' : '[Estacionamiento: No]';
    const formattedNotes = formData.notes ? `${parkingHeader} ${formData.notes}` : parkingHeader;

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
          total_price: Number(grandTotalPrice),
          notes: formattedNotes
        })
      });

      const data = await response.json();

      if (response.ok || response.status === 201 || response.status === 202) {
        setSyncStatusMsg(data.message || 'Tu solicitud ha sido recibida con éxito.');
        setSubmitted(true);
        
        // Redirigir a WhatsApp automáticamente
        const whatsappUrl = buildWhatsAppUrl();
        if (typeof window !== 'undefined') {
          window.open(whatsappUrl, '_blank');
        }
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

  const whatsappUrl = buildWhatsAppUrl();

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
              <div className="p-10 md:p-14 text-center flex flex-col items-center overflow-y-auto">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] mb-6 shrink-0"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h2 className="text-3xl font-heading font-medium text-charcoal mb-3">¡Solicitud en Proceso!</h2>
                <p className="text-charcoal/70 font-light leading-relaxed max-w-md mb-6 text-sm">
                  Gracias <span className="font-medium text-charcoal">{formData.name.split(' ')[0]}</span>. 
                  Se ha registrado tu reservación. Presiona el botón de abajo para enviar tus datos directamente al WhatsApp del hotel.
                </p>

                {/* Direct WhatsApp Action Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-md bg-[#25D366] hover:bg-[#1DA851] text-white py-4 px-6 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-[#25D366]/30 mb-6"
                >
                  <MessageCircle size={22} />
                  <span>Enviar Mensaje por WhatsApp</span>
                </a>

                <div className="px-5 py-2 bg-bone rounded-full text-[10px] font-bold uppercase tracking-widest text-charcoal/60 flex items-center gap-2 shadow-sm border border-clay/30">
                  <Cloud size={14} className="text-[#25D366]" /> Conexión Directa • Hotel Vainilla & Descanso
                </div>

                <button
                  onClick={() => {
                    onClose();
                    setSubmitted(false);
                    setFormData({ 
                      roomId: selectedSuiteObj?.id || '101', 
                      name: '', 
                      email: '', 
                      phone: '', 
                      origin: '', 
                      guestsCount: 1, 
                      checkIn: '', 
                      checkOut: '', 
                      hasParking: false,
                      notes: '' 
                    });
                  }}
                  className="mt-8 text-xs text-charcoal/50 underline hover:text-charcoal transition-colors font-medium"
                >
                  Cerrar ventana
                </button>
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
                      <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Huéspedes (Desde 1 persona)</label>
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
                      <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Salida (Mismo día permitido)</label>
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

                  {/* Casilla de Estacionamiento */}
                  <div className="p-4 bg-bone rounded-2xl border border-clay/50 flex items-center justify-between cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setFormData({...formData, hasParking: !formData.hasParking})}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${formData.hasParking ? 'bg-primary text-white' : 'bg-clay/20 text-charcoal/40'}`}>
                        <Car size={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-charcoal">¿Requieres Estacionamiento?</span>
                        <span className="text-[10px] text-charcoal/50">Servicio privado en las instalaciones (+$50 MXN / día)</span>
                      </div>
                    </div>
                    <input 
                      type="checkbox"
                      checked={formData.hasParking}
                      onChange={(e) => setFormData({...formData, hasParking: e.target.checked})}
                      className="w-5 h-5 accent-primary cursor-pointer rounded"
                    />
                  </div>

                  {/* Observaciones Especiales */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest ml-1">Observaciones Especiales</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 text-primary/40" size={18} />
                      <textarea 
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Requerimientos especiales, hora estimada de llegada, etc..." 
                        rows={2}
                        className="w-full bg-bone border border-clay/50 rounded-2xl py-4 pl-12 pr-4 text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-primary transition-colors resize-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Info Tarifa Dinámica - SUBTOTAL HOSPEDAJE */}
                  <div className="p-5 bg-clay/10 rounded-[24px] border border-clay/30 flex justify-between items-center text-charcoal">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A68A64]">
                        {isSameDay ? 'Pasadía / Reserva Mismo Día' : 'Tarifa Dinámica Aplicada'}
                      </span>
                      <span className="text-xs text-charcoal/70 font-light mt-1">
                        {isSameDay ? 'Entrada y salida el mismo día (1 jornada)' : `${nights} noche${nights > 1 ? 's' : ''}${formData.hasParking ? ' + Estacionamiento' : ''}`}
                      </span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40">Subtotal Estimado</span>
                      <span className="text-2xl font-bold text-charcoal mt-1">
                        {grandTotalPrice > 0 ? `$${grandTotalPrice.toLocaleString('es-MX')}` : '$0'}
                      </span>
                    </div>
                  </div>

                  {/* Botón enviar */}
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-5 px-8 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-[#25D366]/30 disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <MessageCircle size={22} />}
                    <span>{loading ? 'Transmitiendo Solicitud...' : 'Confirmar Solicitud y Pagar en WhatsApp'}</span>
                  </button>
                  <p className="text-[9px] text-charcoal/40 text-center uppercase tracking-widest">
                    Conexión directa con el concierge del Hotel Vainilla & Descanso.
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
