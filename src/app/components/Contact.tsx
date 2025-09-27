// src/components/Contact.tsx
'use client';

import { useEffect } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import Aos from 'aos';
import 'aos/dist/aos.css';

// URL gambar latar belakang Anda
const BACKGROUND_IMAGE_URL = 'https://i.pinimg.com/736x/83/a9/b7/83a9b7deab7884e14fe10442723d4965.jpg';

export default function Contact() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pesan Anda telah berhasil terkirim!');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section 
      id="contact" 
      className="relative py-20 text-white" 
      style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      
      <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

      <div className="container mx-auto px-4 relative z-10"> 
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" data-aos="fade-up">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Kontak */}
          <div data-aos="fade-right">
            <form onSubmit={handleSubmit} className="space-y-6 bg-black opacity-80 p-6 rounded-md backdrop-blur-sm"> 
              <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-gray-300/80 border border-gray-600 rounded-sm px-4 py-3 focus:outline-none focus:border-gray-500" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-gray-300/80 border border-gray-600 rounded-sm px-4 py-3 focus:outline-none focus:border-gray-500" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full bg-gray-300/80 border border-gray-600 rounded-sm px-4 py-3 focus:outline-none focus:border-gray-500" 
                  required 
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-white text-gray-900 px-6 py-3 rounded-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Info Kontak & Peta */}
          <div data-aos="fade-left">
            <div className="bg-gray-700/80 h-96 rounded-md overflow-hidden mb-6 shadow-xl">
              {/* Peta statis dari Google Maps */}
              <iframe 
                // Ganti dengan URL embed peta yang valid jika memungkinkan
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.384666666666!2d-74.005972!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a0a3b3b4f69%3A0x7d6c6e7d6b6e7d6b!2sSoHo%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sid!4v1612345678901!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps"
              />
            </div>
            
            <div className="mt-6 space-y-4 bg-gray-900/50 p-6 rounded-md backdrop-blur-sm"> {/* Styling info kontak agar kontras */}
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-white" />
                <p>123 Fashion Avenue, SoHo, New York, NY 10012</p>
              </div>
              <div className="flex items-start">
                <Mail size={20} className="mr-3 mt-1 text-white" />
                <p>info@betrayal-fashion.com</p>
              </div>
              <div className="flex items-start">
                <Phone size={20} className="mr-3 mt-1 text-white" />
                <p>+1 (212) 555-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}