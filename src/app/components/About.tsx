// src/components/About.tsx
'use client';

import { useEffect } from 'react';
import Aos from 'aos';

export default function About() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div 
      id="about" 
      className="py-20 bg-gray-800/80 bg-cover bg-center h-[200ch]"
      style={{ backgroundImage: `url('https://i.pinimg.com/736x/f4/63/c5/f463c59762e95fe76b422757523d1fe6.jpg')` }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" data-aos="fade-up">About Us</h2>
        
        <div className=" md:grid-cols-2 gap-12 items-center flex justify-center">
          <div data-aos="fade-right">
            <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
            <p className="mb-6 text-gray-300">
              Founded in 2015, Betrayal emerged from a desire to challenge conventional fashion norms. Our name represents the rebellion against mainstream trends and the commitment to creating distinctive, avant-garde pieces.
            </p>
            <p className="mb-6 text-gray-300">
              Each collection tells a story of contrast—between tradition and innovation, subtlety and statement, restraint and expression.
            </p>
            <p className="text-gray-300">
              We source only the finest materials and work with artisans who share our passion for exceptional craftsmanship and attention to detail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}