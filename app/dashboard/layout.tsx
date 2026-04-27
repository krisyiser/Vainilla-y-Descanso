"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, BedDouble, CalendarCheck, Users, 
  Settings, LogOut, Menu, X, Bell, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Operaciones', href: '/dashboard' },
    { icon: <BedDouble size={18} />, label: 'Suites', href: '/dashboard/rooms' },
    { icon: <CalendarCheck size={18} />, label: 'Calendario', href: '/dashboard/reservations' },
    { icon: <Users size={18} />, label: 'Huéspedes', href: '/dashboard/guests' },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-white flex flex-col lg:flex-row font-sans selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      {/* Subtle Cinematic Background Glow (Matching Hero) */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0C0E14]/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Mobile Elite Header */}
      <div className="lg:hidden h-20 bg-[#0C0E14]/80 backdrop-blur-3xl border-b border-white/5 px-6 flex items-center justify-between z-[70] sticky top-0">
        <div className="flex flex-col">
          <span className="font-heading font-light text-xl tracking-tight text-white">Vainilla</span>
          <span className="text-[8px] text-primary font-medium uppercase tracking-[0.3em]">Management</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
        </button>
      </div>

      {/* Desktop Sidebar - Minimalist Luxury */}
      <aside className="w-72 border-r border-white/5 bg-[#0C0E14]/30 backdrop-blur-3xl p-10 flex-col hidden lg:flex h-screen sticky top-0 z-[60] relative">
        <div className="mb-20">
          <h1 className="font-heading text-3xl font-light tracking-tight text-white mb-2">Vainilla <span className="text-gradient-gold italic">& D</span></h1>
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-primary/70" />
            <span className="text-[9px] text-primary/70 font-medium uppercase tracking-[0.3em]">Management Suite</span>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.02] transition-elite group"
            >
              <div className="text-gray-500 group-hover:text-primary transition-colors">
                {item.icon}
              </div>
              <span className="font-light text-sm tracking-wide group-hover:translate-x-1 transition-elite">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 mt-auto">
          <div className="flex items-center justify-between px-4 py-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary font-light text-xs border border-white/5">YP</div>
              <div className="flex flex-col">
                <span className="text-xs font-light text-white">Yersi P.</span>
                <span className="text-[9px] text-gray-500 font-medium uppercase tracking-widest">Admin</span>
              </div>
            </div>
            <button className="text-gray-500 hover:text-white transition-colors">
              <Settings size={16} strokeWidth={1.5} />
            </button>
          </div>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-colors group">
            <LogOut size={16} strokeWidth={1.5} className="group-hover:text-red-400/70 transition-colors" />
            <span className="font-light text-sm tracking-wide group-hover:text-red-400/70 transition-colors">Cerrar Sesión</span>
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
              className="fixed inset-0 bg-[#090A0F]/90 backdrop-blur-xl z-[80] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-[80%] bg-[#0C0E14] border-r border-white/5 p-10 z-[85] lg:hidden flex flex-col"
            >
              <div className="mb-16">
                <h1 className="font-heading text-3xl font-light tracking-tight text-white mb-2">Vainilla</h1>
                <span className="text-[9px] text-primary/70 font-medium uppercase tracking-[0.3em]">Management</span>
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
                      className="flex items-center gap-4 py-4 text-lg font-light text-gray-400 hover:text-white transition-colors border-b border-white/5"
                    >
                      <span className="text-primary/50">{item.icon}</span>
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
      <main className="flex-grow flex flex-col min-h-screen lg:h-screen overflow-hidden relative z-10">
        {/* Desktop Header */}
        <div className="hidden lg:flex h-24 px-12 items-center justify-between shrink-0 border-b border-white/5 bg-[#0C0E14]/30 backdrop-blur-sm">
           <div className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.3em]">Vista General</div>
           <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
              <Bell size={16} strokeWidth={1.5} />
           </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 lg:p-12 custom-scrollbar pb-32">
          {children}
        </div>
      </main>
    </div>
  );
}
