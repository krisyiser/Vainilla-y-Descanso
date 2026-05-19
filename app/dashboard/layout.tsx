"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, BedDouble, CalendarCheck, Users, 
  Settings, LogOut, Menu, X, Bell, ShieldCheck, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Operaciones', href: '/dashboard' },
    { icon: <BedDouble size={20} />, label: 'Suites', href: '/dashboard/rooms' },
    { icon: <CalendarCheck size={20} />, label: 'Calendario', href: '/dashboard/reservations' },
    { icon: <Users size={20} />, label: 'Huéspedes', href: '/dashboard/guests' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#4A4A4A] flex flex-col lg:flex-row font-sans selection:bg-[#A68A64]/20 selection:text-[#A68A64]">
      
      {/* Mobile Elite Header */}
      <div className="lg:hidden h-20 bg-white border-b border-[#E8E4D9] px-6 flex items-center justify-between z-[70] sticky top-0">
        <div className="flex items-center gap-3">
          <Image src="/logo vainilla y descanso.png" alt="Vainilla Logo" width={120} height={40} className="h-8 w-auto object-contain" />
          <div className="h-4 w-px bg-[#E8E4D9]" />
          <span className="text-[9px] text-[#A68A64] font-bold uppercase tracking-[0.2em]">Management</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-[#8C8C8C] hover:text-[#2D2D2D] transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Desktop Sidebar - Japandi Professional */}
      <aside className="w-80 border-r border-[#E8E4D9] bg-white p-12 flex-col hidden lg:flex h-screen sticky top-0 z-[60]">
        <div className="mb-16 space-y-3">
          <Image src="/logo vainilla y descanso.png" alt="Vainilla Logo" width={160} height={52} className="h-11 w-auto object-contain" />
          <div className="flex items-center gap-2 pt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A68A64]/50" />
            <span className="text-[10px] text-[#8C8C8C] font-bold uppercase tracking-[0.3em]">Lobby Concierge</span>
          </div>
        </div>

        <nav className="flex-grow space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center justify-between px-5 py-4 rounded-xl text-[#6B6B6B] hover:text-[#2D2D2D] hover:bg-[#F9F7F2] transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#A68A64] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="font-medium text-sm tracking-wide">{item.label}</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A68A64]" />
            </Link>
          ))}
        </nav>

        <div className="pt-8 border-t border-[#F2EEE4] mt-auto">
          <div className="bg-[#F9F7F2] rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A68A64] font-bold text-xs border border-[#E8E4D9] shadow-sm">YP</div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#2D2D2D]">Yersi P.</span>
                <span className="text-[10px] text-[#A68A64] font-bold uppercase tracking-widest">Administrador</span>
              </div>
            </div>
          </div>
          <button className="w-full flex items-center gap-4 px-5 py-3 text-[#8C8C8C] hover:text-red-500 transition-colors group text-sm font-medium">
            <LogOut size={18} strokeWidth={2} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#2D2D2D]/20 backdrop-blur-sm z-[80] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] bg-white p-10 z-[85] lg:hidden flex flex-col"
            >
              <div className="mb-12 flex justify-between items-center">
                <div className="space-y-2">
                  <Image src="/logo vainilla y descanso.png" alt="Vainilla Logo" width={140} height={46} className="h-10 w-auto object-contain" />
                  <span className="text-[10px] text-[#A68A64] font-bold uppercase tracking-[0.3em] block">Management</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#F9F7F2] rounded-full">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-grow space-y-2">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-5 p-5 text-lg font-medium text-[#4A4A4A] hover:bg-[#F9F7F2] rounded-2xl transition-colors"
                    >
                      <span className="text-[#A68A64]">{item.icon}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Workspace */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden relative">
        {/* Desktop Header */}
        <div className="hidden lg:flex h-24 px-12 items-center justify-between shrink-0 bg-white/50 backdrop-blur-md border-b border-[#E8E4D9]">
           <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm" />
             <div className="text-[11px] text-[#8C8C8C] font-bold uppercase tracking-[0.3em]">Sistema Operativo • Recepción</div>
           </div>
           <div className="flex items-center gap-6">
              <button className="text-[#8C8C8C] hover:text-[#2D2D2D] transition-colors relative">
                <Bell size={20} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#A68A64] rounded-full border-2 border-white" />
              </button>
              <div className="w-px h-6 bg-[#E8E4D9]" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#2D2D2D]">Lobby Principal</span>
                <Settings size={18} className="text-[#8C8C8C]" />
              </div>
           </div>
        </div>
        <div className="flex-grow overflow-y-auto p-8 lg:p-12 custom-scrollbar-light">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

