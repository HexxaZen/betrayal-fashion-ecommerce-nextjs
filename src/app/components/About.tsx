// src/components/About.tsx
'use client';

import { useEffect } from 'react';
import Aos from 'aos';

// URL gambar latar belakang
const BACKGROUND_IMAGE_URL = 'https://i.pinimg.com/736x/f4/63/c5/f463c59762e95fe76b422757523d1fe6.jpg';

export default function About() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <section id="about" className="relative py-20 min-h-screen flex items-center">
      
      {/* Container untuk Background Image (Lapisan paling bawah) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed" // Tambahkan bg-fixed untuk efek parallax, jika diinginkan
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')` }}
      ></div>

      {/* Overlay Gelap untuk Teks (Lapisan tengah) */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" data-aos="fade-up">About Us</h2>
        
        <div className="md:grid-cols-2 gap-12 items-center flex justify-center">
          <div data-aos="fade-right" className="max-w-3xl">
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Founded in 2015, **Betrayal** emerged from a desire to challenge conventional fashion norms. Our name represents the rebellion against mainstream trends and the commitment to creating distinctive, **avant-garde** pieces.
            </p>
            <p className="mb-6 text-gray-300 leading-relaxed">
              Each collection tells a story of contrast—between tradition and innovation, subtlety and statement, restraint and expression.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We source only the finest materials and work with artisans who share our passion for exceptional **craftsmanship** and attention to detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}