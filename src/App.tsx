import React from 'react';
import Navbar from './components/Navbar';
import Hero from './screens/Hero';
import SplitBannerSection from './screens/SplitBannerSection';
import Footer from './components/Footer';
import './styles/index.css';

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SplitBannerSection />
      <Footer />
    </div>
  );
}