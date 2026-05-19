"use client";

import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Compass, Navigation } from 'lucide-react';

export default function MapSection() {
  const mapQueryUrl = "https://www.google.com/maps/search/?api=1&query=Calle+Francisco+I.+Madero+716,+Benito+Juarez,+Papantla,+Veracruz";

  return (
    <section id="ubicacion" className="py-32 bg-bone relative overflow-hidden">

      {/* Decorative Compass Element */}
      <div className="absolute top-10 right-10 opacity-5 hidden lg:block">
        <Compass size={300} strokeWidth={0.5} className="animate-spin-slow" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* Map Visual Holder */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square md:aspect-video lg:aspect-square bg-[#E8E4D9] rounded-[60px] overflow-hidden relative shadow-2xl shadow-charcoal/10 border-8 border-white h-[450px]">
              {/* Google Maps Iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.9754298135894!2d-97.2764835!3d20.4457497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85daf032fcfc5a75%3A0xea8f7c9e7828decd!2sFrancisco%20I.%20Madero%20716%2C%20Benito%20Ju%C3%A1rez%2C%2093410%20Papantla%20de%20Olarte%2C%20Ver.!5e0!3m2!1ses-419!2smx!4v1716075600000!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-125 brightness-95 opacity-90 hover:grayscale-0 transition-all duration-700"
              />

              {/* Location Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Navigation size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-charcoal/40 uppercase tracking-widest">Ubicación</p>
                    <p className="text-xs font-semibold text-charcoal truncate">Cerca de la Iglesia Cristo Rey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="w-full lg:w-1/2 text-left space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.3em] text-[10px]"
            >
              <div className="w-8 h-px bg-primary" /> Ubicación
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-heading font-light text-charcoal leading-tight">
              Excelente Ubicación en <br />
              <span className="italic font-medium text-primary">Papantla, Ver.</span>
            </h2>

            <div className="space-y-6 text-sm md:text-base text-charcoal/60 font-light leading-relaxed">
              <p className="font-semibold text-charcoal">
                Calle Francisco I. Madero No. 716, Colonia Benito Juárez, C.P. 93410, Papantla, Veracruz.
              </p>
              <p>
                Nos encontramos en una zona privilegiada del pueblo mágico de Papantla, muy cerca de la emblemática Iglesia de Cristo Rey, ofreciendo un acceso cómodo y directo a los atractivos de la ciudad.
              </p>
            </div>

            <div className="pt-6">
              <a
                href={mapQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 bg-charcoal text-white px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-charcoal/10 group"
              >
                Abrir en Google Maps
                <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
