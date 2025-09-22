// src/components/Hero.tsx
'use client';
import Link from 'next/link';
import Aos from 'aos';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    Aos.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div id="vanta-bg" className="absolute inset-0 z-0"></div>
        <div className="container mx-auto px-4 z-10 text-center" data-aos="fade-up" data-aos-duration="1000">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">BETRAYAL</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Redefining luxury fashion with bold designs and uncompromising quality</p>
            <Link href="/all-products" className="inline-block bg-white text-gray-900 px-8 py-3 rounded-sm font-medium hover:bg-gray-100 transition-colors">SHOP NOW</Link>
        </div>
    </section>
  );
}