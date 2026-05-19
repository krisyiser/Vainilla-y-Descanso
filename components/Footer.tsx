import React from 'react';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-bone pt-32 pb-12 border-t border-clay/30">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-left">
          
          <div className="space-y-8">
            <Link href="/" className="flex flex-col gap-2 group">
              <Image src="/logo vainilla y descanso.png" alt="Vainilla & Descanso Logo" width={200} height={66} className="h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Estancia Boutique</span>
            </Link>
            <p className="text-sm text-charcoal/50 font-light leading-relaxed">
              Un santuario de descanso en el corazón de Papantla, Veracruz.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white border border-clay/50 flex items-center justify-center text-charcoal hover:bg-primary hover:text-white transition-all">
                 <Instagram size={18} />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-white border border-clay/50 flex items-center justify-center text-charcoal hover:bg-primary hover:text-white transition-all">
                 <Facebook size={18} />
               </a>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal">Explorar</h4>
            <nav className="flex flex-col gap-4">
              <Link href="#suites" className="text-sm text-charcoal/50 hover:text-primary transition-colors">Nuestras Suites</Link>
              <Link href="#experiencias" className="text-sm text-charcoal/50 hover:text-primary transition-colors">Instalaciones</Link>
              <Link href="#contacto" className="text-sm text-charcoal/50 hover:text-primary transition-colors">Ubicación</Link>
            </nav>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal">Contacto</h4>
            <div className="flex flex-col gap-4 text-sm text-charcoal/50 font-light">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-1" /> 
                <span>Calle Francisco I. Madero No. 716, Col. Benito Juárez, CP 93410, Papantla, Ver. (Cerca de la Iglesia Cristo Rey)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-primary" /> hotelvainilladescanso@gmail.com
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary font-bold">Tel / WhatsApp:</span> +52 (782) 186 2711
              </div>
            </div>
          </div>

        </div>

        <div className="pt-12 border-t border-clay/30 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40">
           <span>© 2026 Vainilla & Descanso. Todos los derechos reservados.</span>
           <div className="flex gap-8">
             <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
             <a href="#" className="hover:text-primary transition-colors">Términos</a>
           </div>
        </div>

      </div>
    </footer>
  );
}
