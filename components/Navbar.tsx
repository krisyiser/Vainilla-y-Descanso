"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Suites', href: '#suites' },
    { name: 'Experiencias', href: '#experiencias' },
    { name: 'Ubicación', href: '#ubicacion' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center text-left">
            <Image src="/logo vainilla y descanso.png" alt="Vainilla & Descanso Logo" width={180} height={58} className="h-12 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-charcoal/60 hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+527821862711" className="flex items-center gap-2 text-xs font-bold text-charcoal/60 hover:text-charcoal transition-colors">
              <Phone size={14} className="text-primary" /> +52 (782) 186 2711
            </a>
            <button 
              onClick={onOpenBooking}
              className="bg-charcoal text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-charcoal/10"
            >
              Reservar Ahora
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-charcoal"
          >
            <Menu size={24} />
          </button>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col p-10 lg:hidden text-left"
          >
            <div className="flex justify-between items-center mb-20">
               <div className="flex items-center">
                <Image src="/logo vainilla y descanso.png" alt="Vainilla & Descanso Logo" width={160} height={52} className="h-12 w-auto object-contain" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-bone rounded-full">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-heading font-light text-charcoal hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-clay/30 flex flex-col gap-6">
               <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-primary text-white py-6 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3"
               >
                 <Calendar size={18} /> Reservar Ahora
               </button>
               <a href="tel:+527821862711" className="text-center text-sm font-medium text-charcoal/50">
                 ¿Necesitas ayuda? Llámanos
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
