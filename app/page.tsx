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
import SuiteDetailModal from '@/components/SuiteDetailModal';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<any>(null);
  const [isSuiteDetailOpen, setIsSuiteDetailOpen] = useState(false);

  const handleOpenSuite = (suite: any) => {
    setSelectedSuite(suite);
    setIsSuiteDetailOpen(true);
  };

  return (
    <main className="relative bg-bone min-h-screen">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <Hero onOpenBooking={() => setIsBookingOpen(true)} />
      
      <SuitesAndRates onOpenSuite={handleOpenSuite} />
      
      <Experience />
      <Services />
      <MapSection />
      <Footer />

      <ReservationModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        selectedSuite={selectedSuite}
      />

      <SuiteDetailModal 
        suite={selectedSuite}
        isOpen={isSuiteDetailOpen}
        onClose={() => setIsSuiteDetailOpen(false)}
        onBook={() => setIsBookingOpen(true)}
      />
    </main>
  );
}
