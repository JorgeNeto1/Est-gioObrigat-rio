import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import AccessibilityPanel from '../components/AccessibilityPanel';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate('/login');
  };

  return (
    <>
      <AccessibilityPanel />
      <Header onScheduleClick={handleScheduleClick} />
      <main>
        <Hero onScheduleClick={handleScheduleClick} />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default HomePage;