"use client";

import { motion } from 'framer-motion';

const services = [
  {
    id: 'habitaciones',
    title: 'Habitaciones',
    description: 'Espacios creados para tu máximo confort. Camas premium y vistas espectaculares.',
    image: '/room.png',
  },
  {
    id: 'restaurante',
    title: 'Restaurante',
    description: 'Gastronomía de altura con ingredientes de origen, una experiencia para tus sentidos.',
    image: '/restaurant.png',
  },
  {
    id: 'alberca',
    title: 'Alberca',
    description: 'Relájate en nuestras aguas cristalinas, el corazón vibrante de nuestro hotel.',
    image: '/pool.png',
  },
  {
    id: 'terraza',
    title: 'Terraza',
    description: 'Atardeceres sublimes acompañados de la brisa y coctelería de autor.',
    image: '/terrace.png',
  }
];

// Componente Services: Muestra las áreas del hotel (Habitaciones, Alberca, Restaurante, Terraza)
// usando tarjetas con imágenes para atraer e informar al usuario.
export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-[#0A0E17] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Exclusivos Servicios
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre todo lo que hemos preparado para hacer de tu estadía una memoria inolvidable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] sm:aspect-[16/9]"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:opacity-90"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="font-heading text-3xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                  {service.title}
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
