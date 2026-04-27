"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Building, Menu, X, Calendar, Instagram, Facebook, ChevronRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  onOpenBooking?: () => void;
}

const links: NavLink[] = [
  { href: "#tarifas", label: "Tarifas" },
  { href: "#servicios", label: "Servicios" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#mapa", label: "Ubicación", icon: <MapPin className="w-4 h-4" /> },
];

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-12 py-3 ${
          scrolled ? 'bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Building className="text-black w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-none text-white tracking-tight">
                Vainilla & Descanso
              </span>
              <span className="text-[10px] text-primary uppercase font-bold tracking-[0.2em]">Boutique Hotel</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <button 
              onClick={onOpenBooking}
              className="bg-primary text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
            >
              <Phone size={16} /> Reservar
            </button>
          </div>
          
          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <a href="https://wa.me/521234567890" className="p-3 bg-green-500/10 rounded-xl text-green-500 border border-green-500/20 transition-all">
              <MessageCircle size={20} />
            </a>
            <button 
              onClick={() => setIsOpen(true)}
              className="p-3 bg-primary rounded-xl text-black shadow-lg shadow-primary/20"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0A0E17] flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <Building className="text-primary w-8 h-8" />
                <span className="font-heading font-bold text-xl text-white">Menú</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 bg-white/5 rounded-full text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 mb-auto">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-heading font-bold text-white hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    {link.label}
                    <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white transition-colors hover:bg-primary hover:text-black"><Instagram /></a>
                <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white transition-colors hover:bg-primary hover:text-black"><Facebook /></a>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking?.();
                }}
                className="w-full bg-primary text-black py-5 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
              >
                <Calendar /> Reservar Ahora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation for Mobile (Mobile-First Masterstroke) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[400px] md:hidden">
        <div className="glass-dark border border-white/10 rounded-[2rem] p-2 flex justify-around items-center shadow-2xl backdrop-blur-2xl">
          <Link href="#tarifas" className="flex flex-col items-center py-2 px-4 text-primary transition-transform hover:scale-110 active:scale-95">
            <Calendar size={22} />
            <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">Tarifas</span>
          </Link>
          <div className="w-px h-8 bg-white/10" />
          <Link href="#servicios" className="flex flex-col items-center py-2 px-4 text-gray-400 transition-transform hover:scale-110 active:scale-95">
            <Building size={22} />
            <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">Hotel</span>
          </Link>
          <div className="w-px h-8 bg-white/10" />
          <a href="tel:+521234567890" className="flex flex-col items-center py-2 px-4 text-gray-400 transition-transform hover:scale-110 active:scale-95">
            <Phone size={22} />
            <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">Llamar</span>
          </a>
        </div>
      </div>
    </>
  );
}
