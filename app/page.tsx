"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SuitesAndRates from '@/components/SuitesAndRates';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import ReservationModal from '@/components/ReservationModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <Hero onOpenBooking={() => setIsBookingOpen(true)} />
      <SuitesAndRates />
      <Services />
      <Experience />
      <MapSection />
      <Footer />
      
      <ReservationModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </main>
  );
}
