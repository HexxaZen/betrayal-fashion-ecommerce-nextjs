// src/components/Footer.tsx
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">BETRAYAL</h3>
            <p className="text-gray-400">Redefining luxury fashion with bold designs and uncompromising quality.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-gray-300 transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-gray-300 transition-colors">Bestsellers</Link></li>
              <li><Link href="#" className="hover:text-gray-300 transition-colors">Collections</Link></li>
              <li><Link href="#" className="hover:text-gray-300 transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-gray-300 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-gray-300 transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-gray-300 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-gray-300 transition-colors">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors"><Instagram /></Link>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors"><Facebook /></Link>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors"><Twitter /></Link>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-gray-800 border border-gray-700 rounded-l-sm px-4 py-2 focus:outline-none focus:border-gray-600 w-full" />
                <button className="bg-white text-gray-900 px-4 py-2 rounded-r-sm hover:bg-gray-100 transition-colors">Join</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© 2023 Betrayal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}