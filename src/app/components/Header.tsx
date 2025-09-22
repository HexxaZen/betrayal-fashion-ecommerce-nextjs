// src/components/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import CartSidebar from './CartSidebar';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 bg-gray-900/90 backdrop-blur-sm ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            BETRAYAL
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="#home" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="#about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/all-products" className="hover:text-gray-300 transition-colors">Shop</Link>
            <Link href="#contact" className="hover:text-gray-300 transition-colors">Contact</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
              >
                <User size={20} />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-700">Orders</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-700">Logout</Link>
                </div>
              )}
            </div>
            
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <div className="px-4 py-4 space-y-4">
              <Link href="#home" className="block hover:text-gray-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="#about" className="block hover:text-gray-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="/all-products" className="block hover:text-gray-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link href="#contact" className="block hover:text-gray-300 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Sidebar dan Overlay */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {(isCartOpen || isMobileMenuOpen) && (
        <div className="fixed inset-0 bg-black/70 z-40" onClick={() => {
          setIsCartOpen(false);
          setIsMobileMenuOpen(false);
        }} />
      )}
    </>
  );
}