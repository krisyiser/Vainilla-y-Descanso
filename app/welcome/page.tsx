"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Wifi, MapPin, BookOpen, Waves, Car, Dog, 
  Phone, MessageSquare, Copy, Check, LogOut, 
  Clock, Shield, Sparkles, X, ChevronRight, Info, AlertTriangle,
  Compass, HelpCircle
} from 'lucide-react';

export default function WelcomeGuestPage() {
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Datos del Wi-Fi
  const wifiNetwork = "INFINITUM1F4F";
  const wifiPass = "SA3stf2SGt";
  const hotelPhone = "+527821862711"; // Teléfono real de asistencia
  const hotelWhatsapp = "527821862711"; 

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    {
      id: 'wifi',
      title: 'Conexión Wi-Fi',
      icon: Wifi,
      description: 'Contraseña y red del hotel',
      color: 'bg-amber-50 text-amber-700 border-amber-200/50',
    },
    {
      id: 'habitacion',
      title: 'Reglamento de Habitación',
      icon: BookOpen,
      description: 'Horarios, capacidad y convivencia',
      color: 'bg-blue-50 text-blue-700 border-blue-200/50',
    },
    {
      id: 'alberca',
      title: 'Alberca Karakatloco',
      icon: Waves,
      description: 'Reglamento y horarios de alberca',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
    },
    {
      id: 'estacionamiento',
      title: 'Estacionamiento',
      icon: Car,
      description: 'Acceso, costo y políticas',
      color: 'bg-slate-50 text-slate-700 border-slate-200/50',
    },
    {
      id: 'petfriendly',
      title: 'Política Pet Friendly',
      icon: Dog,
      description: 'Normas para viajar con tu compañero',
      color: 'bg-purple-50 text-purple-700 border-purple-200/50',
    },
    {
      id: 'cuidado',
      title: 'Cuidado de Instalaciones',
      icon: Shield,
      description: 'Toallas, ropa de cama y decoración',
      color: 'bg-rose-50 text-rose-700 border-rose-200/50',
    },
    {
      id: 'turismo',
      title: 'Qué Hacer en Papantla',
      icon: Compass,
      description: 'Playas, cultura, museos y naturaleza',
      color: 'bg-teal-50 text-teal-700 border-teal-200/50',
    },
    {
      id: 'faqs',
      title: 'Preguntas Frecuentes',
      icon: HelpCircle,
      description: 'Dudas comunes de la estancia',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200/50',
    },
    {
      id: 'salida',
      title: 'Salida (Check-out)',
      icon: LogOut,
      description: 'Proceso y horarios de salida',
      color: 'bg-orange-50 text-orange-700 border-orange-200/50',
    },
  ];

  return (
    <div className="bg-[#F9F7F2] min-h-screen text-[#2D2D2D] font-sans pb-12 selection:bg-[#A68A64]/20">
      
      {/* Header Banner - Mobile optimized */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden shadow-md">
        <Image 
          src="/pool.png" 
          alt="Alberca Karakatloco Vainilla y Descanso"
          fill
          priority
          className="object-cover brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        
        <div className="absolute bottom-6 left-6 right-6 text-white z-10">
          <span className="inline-block px-3 py-1 bg-[#A68A64] text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
            Pueblo Mágico · Papantla
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-1 tracking-wide">
            VAINILLA & DESCANSO
          </h1>
          <p className="text-sm md:text-base text-gray-200 font-light max-w-xl">
            Un espacio de confort, calidad y descanso en el corazón de un pueblo mágico.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-4 mt-6">

        {/* Quick Check-in/out and Welcome Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E4D9]/80 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#A68A64]" />
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-emerald-50 text-emerald-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-lg font-bold text-[#2D2D2D] mb-1">
                Bienvenido a tu estancia
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Información esencial para tu llegada y estancia.
              </p>
              
              <div className="grid grid-cols-2 gap-4 border-t border-[#E8E4D9]/40 pt-4">
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Check-in</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">Desde las 2:00 PM</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Check-out</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">Hasta las 12:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick WiFi Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E4D9]/80 mb-6">
          <h3 className="font-heading font-bold text-base mb-3 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-[#A68A64]" />
            Acceso Wi-Fi Rápido
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-[#F9F7F2] p-3 rounded-xl border border-[#E8E4D9]/50">
              <div>
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Red</span>
                <span className="text-sm font-mono font-medium">{wifiNetwork}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(wifiNetwork, setCopiedWifi)}
                className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-[#A68A64]"
                title="Copiar Red"
              >
                {copiedWifi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex justify-between items-center bg-[#F9F7F2] p-3 rounded-xl border border-[#E8E4D9]/50">
              <div>
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Contraseña</span>
                <span className="text-sm font-mono font-medium">{wifiPass}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(wifiPass, setCopiedWifi)}
                className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-[#A68A64]"
                title="Copiar Contraseña"
              >
                {copiedWifi ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Concierge Digital Title */}
        <div className="mb-4">
          <h2 className="font-heading text-xl font-bold text-[#2D2D2D]">Concierge Digital</h2>
          <p className="text-xs text-gray-500">Todo lo que necesitas saber durante tu hospedaje</p>
        </div>

        {/* Grid of Rules and Concierge Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {sections.map((sec) => {
            const IconComponent = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className="flex items-center justify-between p-4 bg-white hover:bg-[#F9F7F2] active:bg-[#E8E4D9]/30 rounded-2xl border border-[#E8E4D9]/60 hover:border-[#A68A64]/40 transition-all duration-300 text-left w-full shadow-sm group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${sec.color} transition-all duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#2D2D2D] group-hover:text-[#A68A64] transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {sec.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </button>
            );
          })}
        </div>

        {/* Location & Contact Section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E4D9]/80 mb-8">
          <h3 className="font-heading font-bold text-base mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#A68A64]" />
            Ubicación y Contacto
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Hotel Boutique Vainilla y Descanso</p>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Calle Reforma 102, Col. Centro, Papantla de Olarte, Veracruz, México, C.P. 93400
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <a 
                href="https://maps.google.com/?q=Hotel+Boutique+Vainilla+y+Descanso+Papantla" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#A68A64] text-white rounded-xl text-xs font-semibold hover:bg-[#A68A64]/90 transition-colors shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                Abrir en Google Maps
              </a>
              
              <a 
                href={`https://wa.me/${hotelWhatsapp}?text=Hola%20recepción%20de%20Vainilla%20y%20Descanso,%20necesito%20asistencia%20en%20mi%20habitación.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-xl text-xs font-semibold hover:bg-[#25D366]/90 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Recepción
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-gray-400 border-t border-[#E8E4D9]/60 pt-6">
          <p>© {new Date().getFullYear()} Hotel Boutique Vainilla y Descanso. Todos los derechos reservados.</p>
          <p className="mt-1">Pueblo Mágico de Papantla, Veracruz.</p>
        </div>

      </div>

      {/* Detail Modal Overlay */}
      {activeTab && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-t sm:border border-[#E8E4D9]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E8E4D9]/80 bg-[#F9F7F2]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#A68A64]/10 text-[#A68A64]">
                  {activeTab === 'wifi' && <Wifi className="w-5 h-5" />}
                  {activeTab === 'habitacion' && <BookOpen className="w-5 h-5" />}
                  {activeTab === 'alberca' && <Waves className="w-5 h-5" />}
                  {activeTab === 'estacionamiento' && <Car className="w-5 h-5" />}
                  {activeTab === 'petfriendly' && <Dog className="w-5 h-5" />}
                  {activeTab === 'cuidado' && <Shield className="w-5 h-5" />}
                  {activeTab === 'turismo' && <Compass className="w-5 h-5" />}
                  {activeTab === 'faqs' && <HelpCircle className="w-5 h-5" />}
                  {activeTab === 'salida' && <LogOut className="w-5 h-5" />}
                </div>
                <h3 className="font-heading font-bold text-lg text-[#2D2D2D]">
                  {activeTab === 'wifi' && 'Conexión Wi-Fi'}
                  {activeTab === 'habitacion' && 'Reglamento de Habitación'}
                  {activeTab === 'alberca' && 'Reglamento de Alberca'}
                  {activeTab === 'estacionamiento' && 'Reglamento de Estacionamiento'}
                  {activeTab === 'petfriendly' && 'Reglamento Pet Friendly'}
                  {activeTab === 'cuidado' && 'Cuidado de Amenidades'}
                  {activeTab === 'turismo' && 'Qué Hacer en Papantla'}
                  {activeTab === 'faqs' && 'Preguntas Frecuentes'}
                  {activeTab === 'salida' && 'Proceso de Salida (Check-out)'}
                </h3>
              </div>
              <button 
                onClick={() => setActiveTab(null)}
                className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-6 text-sm leading-relaxed text-[#2D2D2D]">
              
              {/* WIFI DETAIL */}
              {activeTab === 'wifi' && (
                <div className="space-y-4">
                  <p className="text-gray-600">Dispones de conexión Wi-Fi de alta velocidad incluida en todo el establecimiento. Sigue las credenciales a continuación:</p>
                  <div className="bg-[#F9F7F2] p-4 rounded-xl border border-[#E8E4D9]">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase font-semibold">Red</span>
                        <span className="text-base font-mono font-bold">{wifiNetwork}</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(wifiNetwork, setCopiedWifi)}
                        className="px-3 py-1.5 bg-[#A68A64] text-white text-xs font-semibold rounded-lg hover:bg-[#A68A64]/90 transition-colors"
                      >
                        {copiedWifi ? 'Copiado!' : 'Copiar Red'}
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-[#E8E4D9]/85">
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase font-semibold">Contraseña</span>
                        <span className="text-base font-mono font-bold">{wifiPass}</span>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(wifiPass, setCopiedWifi)}
                        className="px-3 py-1.5 bg-[#A68A64] text-white text-xs font-semibold rounded-lg hover:bg-[#A68A64]/90 transition-colors"
                      >
                        {copiedWifi ? 'Copiado!' : 'Copiar Contraseña'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/50 text-amber-800 text-xs flex gap-3">
                    <Info className="w-5 h-5 shrink-0 text-amber-600" />
                    <p>Si experimentas problemas de conexión, por favor comunícate a recepción o reinicia el adaptador de tu dispositivo.</p>
                  </div>
                </div>
              )}

              {/* HABITACION DETAIL */}
              {activeTab === 'habitacion' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">1. HORARIOS DE ENTRADA Y SALIDA</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li><strong>Check-in:</strong> a partir de las 2:00 p.m.</li>
                      <li><strong>Check-out:</strong> hasta las 12:00 p.m. (mediodía).</li>
                      <li>La salida tardía (late check-out) está sujeta a disponibilidad y puede generar cargos adicionales. Consultar con anticipación en recepción.</li>
                      <li>El acceso a la habitación antes del horario de check-in queda sujeto a disponibilidad sin garantía.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">2. CAPACIDAD DE LA HABITACIÓN</h4>
                    <p className="text-gray-600 mb-2">Cada suite tiene una capacidad máxima establecida. Se prohíbe el ingreso de personas adicionales a las registradas al momento de la reservación:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li><strong>Suite Moros y Cristianos:</strong> hasta 6 personas.</li>
                      <li><strong>Suite El Volador / Santiagueros:</strong> hasta 4 personas.</li>
                      <li><strong>Suite Guagua / Negritos:</strong> hasta 2 personas.</li>
                    </ul>
                    <p className="text-gray-600 mt-2">Cualquier visita de persona no registrada deberá notificarse obligatoriamente en la recepción.</p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">3. POLÍTICA DE NO FUMAR</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li>Todas las habitaciones son <strong>100% libres de humo</strong> (tabaco, cigarros electrónicos, vapeadores y cualquier producto similar).</li>
                      <li>Queda estrictamente prohibido fumar dentro de la habitación.</li>
                      <li>En caso de incumplimiento se aplicará un cargo directo en el depósito en garantía.</li>
                      <li>Se designarán áreas específicas para fumadores en las zonas comunes exteriores del hotel.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">4. RUIDO Y CONVIVENCIA</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li>Se solicita guardar silencio a partir de las <strong>10:00 p.m.</strong> para garantizar el descanso de todos los huéspedes.</li>
                      <li>Queda prohibido el uso de bocinas externas, música en volumen alto o actividades que perturben la tranquilidad en las habitaciones.</li>
                      <li>Se solicita moderación en el uso de televisión y audio en todo momento.</li>
                      <li>El hotel es un espacio de descanso boutique; se agradece mantener un ambiente de armonía y respeto.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">5. INSTALACIONES Y EQUIPAMIENTO</h4>
                    <p className="text-gray-600 mb-2">Cada suite incluye:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li><strong>Aire acondicionado:</strong> usar con puertas y ventanas cerradas para mayor eficiencia.</li>
                      <li><strong>Wifi de alta velocidad:</strong> la contraseña se encontrará disponible en la habitación.</li>
                      <li><strong>Snack área:</strong> frigobar, cafetera y microondas (disponible en suites).</li>
                      <li><strong>Camas confort con ropa de cama de calidad:</strong> se solicita no sacar la ropa de cama de la habitación.</li>
                      <li><strong>Estación de trabajo:</strong> escritorio para uso personal o laboral del huésped.</li>
                    </ul>
                    <p className="text-gray-600 mt-2 font-medium text-xs text-rose-600">El huésped es responsable del buen uso de todos los artículos y equipos de la habitación. Cualquier daño o pérdida será cargado al depósito de garantía.</p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">6. SERVICIO DE LIMPIEZA</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li>El servicio de limpieza se realiza diariamente en el horario establecido por el hotel.</li>
                      <li>Si el huésped no desea que se limpie su habitación, deberá colocar el aviso correspondiente en la puerta.</li>
                      <li>Por motivos de seguridad e higiene, no se permite que el huésped haga las camas del hotel con ropa de cama ajena al establecimiento.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">7. ALIMENTOS Y BEBIDAS</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li>El desayuno americano incluido en la tarifa se sirve en el <strong>área TRUENO</strong> de <strong>7:00 a.m. a 12:00 p.m.</strong></li>
                      <li>Se permite consumir alimentos en la habitación con discreción. Se solicita no dejar residuos que atraigan insectos.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">8. OBJETOS OLVIDADOS Y ARTÍCULOS DE VALOR</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li>El hotel no se hace responsable por pérdida de dinero en efectivo, joyería u objetos de valor dejados en la habitación.</li>
                      <li>Se recomienda utilizar la caja de seguridad para resguardar artículos de valor.</li>
                      <li>Los objetos olvidados serán resguardados por un periodo de 30 días; transcurrido este tiempo serán donados o desechados.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">9. POLÍTICA PET FRIENDLY (RESUMEN)</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li>El hotel acepta mascotas bajo previa notificación al momento de la reservación y sujeto al reglamento pet friendly.</li>
                      <li>Las mascotas deberán permanecer bajo la supervisión del huésped en todo momento.</li>
                      <li>Queda prohibido dejar mascotas solas en la habitación sin supervisión.</li>
                      <li>Cualquier daño causado por la mascota será responsabilidad del huésped y se cargará al depósito en garantía.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">10. USO DE ÁREAS COMUNES (ESPACIO TRUENO)</h4>
                    <p className="text-gray-600 mb-2">Horarios y usos del Espacio TRUENO:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li><strong>Desayunos:</strong> 7:00 a.m. – 12:00 p.m.</li>
                      <li><strong>Sala de juntas:</strong> 12:00 p.m. – 5:00 p.m.</li>
                      <li><strong>Café-bar:</strong> 5:00 p.m. – 11:00 p.m.</li>
                      <li>Prohibido introducir alimentos y bebidas ajenos al hotel en esta área.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#A68A64] mb-2">11. DISPOSICIONES GENERALES</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li>El hotel se reserva el derecho de admisión.</li>
                      <li>El incumplimiento de cualquiera de las normas del presente reglamento podrá resultar en la terminación del hospedaje sin reembolso.</li>
                      <li>Para cualquier queja, sugerencia o requerimiento, el huésped puede dirigirse a recepción en cualquier momento.</li>
                      <li>El personal del hotel está plenamente capacitado para brindar información turística y asistencia durante su estancia.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* ALBERCA DETAIL */}
              {activeTab === 'alberca' && (
                <div className="space-y-4">
                  <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                    <Image 
                      src="/pool.png" 
                      alt="Alberca Karakatloco"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <h4 className="font-heading font-bold text-base text-emerald-700">Alberca KARAKATLOCO</h4>
                  <p className="text-gray-600">Uso de áreas comunes y alberca:</p>
                  
                  <ul className="list-disc pl-5 space-y-2.5 text-gray-600">
                    <li><strong>Horario de funcionamiento:</strong> 9:00 a.m. a 7:00 p.m.</li>
                    <li><strong>Uso exclusivo:</strong> Reservado únicamente para huéspedes debidamente registrados.</li>
                    <li><strong>Ducha previa:</strong> Es requisito obligatorio ducharse antes de ingresar al agua para retirar bronceadores, cremas o impurezas.</li>
                    <li><strong>Alimentos y bebidas:</strong> Queda estrictamente prohibido el consumo de alimentos dentro del agua de la alberca.</li>
                    <li><strong>Mascotas:</strong> Queda estrictamente prohibido el ingreso de mascotas al área de la alberca.</li>
                  </ul>
                </div>
              )}

              {/* ESTACIONAMIENTO DETAIL */}
              {activeTab === 'estacionamiento' && (
                <div className="space-y-5">
                  <p className="text-gray-600 font-medium">Por favor lea con atención antes de utilizar el estacionamiento:</p>
                  
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#A68A64] mb-1">1. ACCESO Y HORARIO</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>El estacionamiento es de uso exclusivo para huéspedes registrados en el hotel.</li>
                      <li>El servicio está disponible las 24 horas del día, los 7 días de la semana.</li>
                      <li>Al momento del check-in, el personal de recepción proporcionará las indicaciones específicas sobre el uso y acceso al estacionamiento. Es obligatorio escucharlas y seguirlas.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#A68A64] mb-1">2. RESPONSABILIDAD</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>El Hotel Boutique Vainilla y Descanso <strong>NO se hace responsable</strong> por pérdida total o parcial del vehículo, ni de los objetos que se encuentren dentro del mismo.</li>
                      <li>El hotel no se responsabiliza por daños, rayones, abolladuras u otros desperfectos ocasionados al vehículo durante su permanencia en el estacionamiento.</li>
                      <li>Se recomienda no dejar objetos de valor visibles dentro del vehículo.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#A68A64] mb-1">3. USO CORRECTO DEL ESPACIO</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Cada vehículo deberá estacionarse únicamente en el lugar indicado por el personal del hotel.</li>
                      <li>Queda prohibido ocupar más de un cajón de estacionamiento por vehículo.</li>
                      <li>Se prohíbe estacionar en zonas de acceso o áreas no designadas.</li>
                      <li>La velocidad máxima dentro del estacionamiento deberá ser de <strong>10 km/h</strong> con extrema precaución en todo momento.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#A68A64] mb-1">4. CONDUCTA EN EL ESTACIONAMIENTO</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Queda prohibido el uso del estacionamiento para actividades distintas al resguardo del vehículo.</li>
                      <li>Se prohíbe realizar reparaciones mecánicas, lavado de autos o cualquier actividad similar dentro del estacionamiento.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#A68A64] mb-1">5. COSTO Y DISPOSICIONES</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>El uso del estacionamiento tiene un costo de <strong>$50.00 MXN</strong> (cincuenta pesos mexicanos) por estancia/noche.</li>
                      <li>El hotel se reserva el derecho de retirar del estacionamiento cualquier vehículo que incumpla este reglamento, previo aviso al huésped.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* PET FRIENDLY DETAIL */}
              {activeTab === 'petfriendly' && (
                <div className="space-y-5">
                  <p className="text-gray-600">Nos alegra que viajes con tu compañero. Por favor lee estas indicaciones para que todos disfruten la estancia:</p>
                  
                  <div>
                    <h4 className="font-heading font-bold text-sm text-purple-700 mb-1">1. REGISTRO PREVIO</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Es obligatorio notificar la presencia de la mascota al momento de realizar la reservación.</li>
                      <li>No se permitirá el ingreso de mascotas que no hayan sido registradas con anticipación.</li>
                      <li>Solo se aceptan mascotas domésticas (perros y gatos). Cualquier otra especie deberá consultarse previamente con el hotel.</li>
                      <li>Se acepta un máximo de <strong>1 mascota por habitación</strong>.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-purple-700 mb-1">2. DENTRO DE LA HABITACIÓN</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li><strong>Queda estrictamente prohibido</strong> permitir que la mascota suba o duerma en las camas, sillones, sillas o cualquier mueble tapizado de la habitación.</li>
                      <li>El huésped deberá traer la cama o tapete de su mascota para su descanso.</li>
                      <li><strong>No se permite</strong> dejar a la mascota sola y sin supervisión dentro de la habitación en ningún momento.</li>
                      <li>Cualquier daño causado por la mascota a la habitación, mobiliario, ropa de cama o instalaciones será cargado al depósito en garantía del huésped.</li>
                      <li>Se prohíbe alimentar a la mascota sobre la cama o muebles de la habitación. Se recomienda traer el contenedor, platos y artículos propios.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-purple-700 mb-1">3. ÁREAS COMUNES</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Las mascotas deberán circular con correa en todo momento dentro de las instalaciones del hotel.</li>
                      <li><strong>Queda estrictamente prohibido</strong> el ingreso de mascotas a la alberca (KARAKATLOCO).</li>
                      <li>No se permite el ingreso de mascotas al área de desayunos y restaurante (TRUENO).</li>
                      <li>El dueño es responsable de recoger de inmediato los desechos de su mascota. Se dispondrá de bolsas en recepción.</li>
                      <li>En caso de que la mascota cause algún incidente o daño a otro huésped, tercero o miembro del personal, el propietario de la mascota asume plena responsabilidad.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-purple-700 mb-1">4. HIGIENE, SALUD Y RUIDO</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>La mascota deberá llegar limpia y libre de parásitos. Se solicita bañarla previamente al hospedaje para evitar olores.</li>
                      <li>En caso de que la mascota genere olores persistentes en la habitación, se aplicará un cargo por limpieza profunda.</li>
                      <li>El huésped es responsable de que su mascota no genere ruidos excesivos (ladridos, maullidos) que perturben el descanso, especialmente después de las <strong>10:00 p.m.</strong> En caso de quejas reiteradas, el hotel podrá solicitar la salida de la mascota.</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/50 text-purple-800 text-xs">
                    El incumplimiento de este reglamento podrá resultar en la cancelación del hospedaje sin derecho a reembolso. El uso de las instalaciones con mascota implica la aceptación total de este reglamento.
                  </div>
                </div>
              )}

              {/* CUIDADO DETAIL */}
              {activeTab === 'cuidado' && (
                <div className="space-y-6">
                  <p className="text-gray-600">Con el fin de preservar la calidad de nuestras instalaciones y brindar una experiencia agradable, solicitamos atentamente su colaboración en el cuidado de los bienes y amenidades proporcionados:</p>

                  <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200/40">
                    <h4 className="font-heading font-bold text-base text-rose-700 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Toallas del Hotel
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Las toallas proporcionadas son de <strong>uso exclusivo para el secado personal</strong>. Queda estrictamente prohibido utilizarlas para remover maquillaje, limpiar alimentos o bebidas derramadas, limpiar calzado o para cualquier otro uso que ocasione manchas irreversibles.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-rose-800 font-semibold text-xs">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Toda toalla dañada o manchada generará un cargo de reposición de $400.00 MXN por pieza.</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#A68A64] mb-1">Ropa de Cama</h4>
                    <p className="text-gray-600">
                      Evitar el uso de productos, sustancias o artículos que puedan manchar o dañar las sábanas, fundas, cobertores y demás ropa de cama (incluyendo maquillaje, tintes, aceites corporales, alimentos, bebidas o cualquier material que deje marcas permanentes). La ropa de cama dañada estará sujeta a cargos de reposición o limpieza especializada.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#A68A64] mb-1">Artesanías, Decoración y Mobiliario</h4>
                    <p className="text-gray-600">
                      Las artesanías, objetos decorativos y mobiliario han sido cuidadosamente seleccionados y elaborados por artesanos de la región para brindar una experiencia única. Agradecemos su apoyo para conservarlos en óptimas condiciones, evitando manipularlos innecesariamente o realizar acciones que puedan causar daños. Cualquier daño o pérdida será evaluado y podrá generar cargos.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#A68A64] mb-1">Controles Remotos y Equipos Electrónicos</h4>
                    <p className="text-gray-600">
                      Los controles remotos de la televisión y el aire acondicionado, así como cualquier equipo electrónico en la habitación, deben permanecer dentro de las instalaciones y utilizarse adecuadamente. La pérdida, daño o mal funcionamiento por uso indebido generará cargos de reposición.
                    </p>
                  </div>
                </div>
              )}

              {/* TURISMO DETAIL */}
              {activeTab === 'turismo' && (
                <div className="space-y-6">
                  <p className="text-gray-600">Descubre los encantos culturales, naturales y ancestrales del Pueblo Mágico de Papantla y sus alrededores durante tu estancia:</p>
                  
                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-700 mb-2">🏛️ Zona Arqueológica El Tajín</h4>
                    <p className="text-gray-600">
                      El sitio arqueológico más emblemático del Totonacapan y Patrimonio Mundial de la Humanidad por la UNESCO. Destaca por la impresionante <strong>Pirámide de los Nichos</strong> y sus múltiples juegos de pelota. Cuenta con un museo de sitio ideal para comprender la cosmovisión prehispánica local.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-700 mb-2">🕊️ Ceremonia Ritual de los Voladores</h4>
                    <p className="text-gray-600">
                      Un rito sagrado ancestral asociado a la fertilidad y la agricultura. Puedes presenciar este impresionante vuelo ceremonial en el atrio de la Parroquia de la Asunción (en el centro histórico) o en el Parque Temático Takilhsukut.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-700 mb-2">🏖️ Rancho Playa</h4>
                    <p className="text-gray-600">
                      Si buscas un escape de naturaleza y tranquilidad, a unos minutos de Papantla se encuentra esta playa semivirgen frente al Golfo de México. Un lugar pacífico y poco concurrido, ideal para caminar, descansar en una palapa y contemplar el mar.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-700 mb-2">🛶 Playa La Bocana</h4>
                    <p className="text-gray-600">
                      Un espectacular entorno natural donde el río Tecolutla desemboca en el mar. Un escenario perfecto para la observación de aves, paseos en kayak o pesca recreativa en un ambiente de total serenidad.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-700 mb-2">🎨 Museo Teodoro Cano</h4>
                    <p className="text-gray-600">
                      Un espacio imprescindible que resguarda la valiosa obra del maestro muralista Teodoro Cano. A través de pinturas y esculturas, conocerás la historia, costumbres, danzas y mitos del pueblo Totonaca.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-700 mb-2">⛪ Centro Histórico y Arquitectura</h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                      <li><strong>Parroquia de Nuestra Señora de la Asunción:</strong> Ubicada en la plaza central, destaca por su imponente fachada y el mural en relieve de su muro exterior.</li>
                      <li><strong>Capilla de Cristo Rey:</strong> De una hermosa arquitectura neogótica con detalles que emulan la emblemática catedral de Notre Dame.</li>
                      <li><strong>Monumento al Volador:</strong> Ubicado en lo alto de la colina, ofrece una vista panorámica espectacular de toda la ciudad de Papantla.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-teal-700 mb-2">🌽 Gastronomía Tradicional y Compras</h4>
                    <p className="text-gray-600">
                      Disfruta de la gastronomía en el mercado tradicional probando el famoso <strong>zacahuil</strong> (el tamal gigante de la Huasteca). Visita las tiendas de artesanías locales para adquirir figuras tejidas elaboradas con vainas de vainilla natural, textiles bordados y piezas de barro.
                    </p>
                  </div>
                </div>
              )}

              {/* FAQS DETAIL */}
              {activeTab === 'faqs' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">¿Tienen servicio de resguardo de equipaje?</h4>
                    <p className="text-gray-600 text-xs mt-1">Sí. Si llegas antes del check-in o necesitas quedarte unas horas después del check-out, puedes dejar tus maletas en recepción sin costo adicional.</p>
                  </div>

                  <div className="border-t border-[#E8E4D9]/60 pt-3">
                    <h4 className="font-semibold text-gray-800">¿El desayuno está incluido y en qué horario se sirve?</h4>
                    <p className="text-gray-600 text-xs mt-1">El desayuno americano tradicional está incluido en tu tarifa y se sirve de 7:00 a.m. a 12:00 p.m. en el Espacio Trueno.</p>
                  </div>

                  <div className="border-t border-[#E8E4D9]/60 pt-3">
                    <h4 className="font-semibold text-gray-800">¿Qué debo hacer si tengo un problema técnico en la habitación?</h4>
                    <p className="text-gray-600 text-xs mt-1">Puedes comunicarte de inmediato con nosotros mediante el botón de WhatsApp directo o acudir a la recepción. El personal te atenderá a la brevedad.</p>
                  </div>

                  <div className="border-t border-[#E8E4D9]/60 pt-3">
                    <h4 className="font-semibold text-gray-800">¿Se permiten visitas en la habitación?</h4>
                    <p className="text-gray-600 text-xs mt-1">Cualquier persona adicional no registrada en la reservación original deberá reportarse en recepción por motivos de seguridad del hotel.</p>
                  </div>

                  <div className="border-t border-[#E8E4D9]/60 pt-3">
                    <h4 className="font-semibold text-gray-800">¿Dónde puedo fumar?</h4>
                    <p className="text-gray-600 text-xs mt-1">Nuestras suites son 100% libres de humo. Disponemos de áreas exteriores designadas para fumadores en los jardines y zonas comunes.</p>
                  </div>
                </div>
              )}

              {/* SALIDA DETAIL */}
              {activeTab === 'salida' && (
                <div className="space-y-4">
                  <p className="text-gray-600">Para garantizar una salida ágil y sin demoras, le sugerimos seguir los siguientes pasos el día de su check-out:</p>
                  
                  <div className="bg-[#F9F7F2] p-4 rounded-xl border border-[#E8E4D9]/80 space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-[#A68A64] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                      <div>
                        <p className="font-semibold text-xs">Hora Límite</p>
                        <p className="text-gray-600 text-xs mt-0.5">La hora de salida es estrictamente a las <strong>12:00 p.m. (mediodía)</strong>.</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start pt-3 border-t border-[#E8E4D9]/50">
                      <div className="w-5 h-5 rounded-full bg-[#A68A64] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <div>
                        <p className="font-semibold text-xs">Revisión de Habitación</p>
                        <p className="text-gray-600 text-xs mt-0.5">Por favor, asegúrese de apagar el aire acondicionado y luces, cerrar llaves de agua y verificar que no olvide pertenencias (dentro de cajones o caja de seguridad).</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start pt-3 border-t border-[#E8E4D9]/50">
                      <div className="w-5 h-5 rounded-full bg-[#A68A64] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                      <div>
                        <p className="font-semibold text-xs">Entrega de Llaves y Controles</p>
                        <p className="text-gray-600 text-xs mt-0.5">Entregue los controles remotos y llaves de la habitación al personal de recepción para proceder a la liberación de su cuenta y revisión del depósito en garantía.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/50 text-amber-800 text-xs">
                    Si requiere solicitar un Check-out tardío (Late Check-out), favor de consultarlo en recepción el día anterior para revisar disponibilidad (sujeto a cargos adicionales).
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E8E4D9]/80 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setActiveTab(null)}
                className="px-5 py-2 bg-[#A68A64] text-white rounded-xl text-xs font-bold hover:bg-[#A68A64]/90 transition-colors shadow-sm"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
