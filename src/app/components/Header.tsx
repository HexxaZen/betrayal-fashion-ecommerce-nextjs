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
        className={`fixed left-1/2 -translate-x-1/2 mt-4 px-8 w-[95%] max-w-7xl z-50 transition-all duration-300 backdrop-blur-3xl bg-white/10 ${
          isScrolled ? 'shadow-xl' : 'shadow-md'
        } rounded-full border border-white/20`}
      >
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
            BETRAYAL
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="#home" className="hover:text-gray-200 transition-colors text-white">Home</Link>
            <Link href="#about" className="hover:text-gray-200 transition-colors text-white">About</Link>
            <Link href="/all-products" className="hover:text-gray-200 transition-colors text-white">Shop</Link>
            <Link href="#contact" className="hover:text-gray-200 transition-colors text-white">Contact</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative text-white" onClick={() => setIsCartOpen(true)}>
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
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
              >
                <User size={20} />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/10 rounded-xl backdrop-blur-xl shadow-lg py-1 z-50 border border-white/20">
                  <Link href="#" className="block px-4 py-2 hover:bg-white/20 transition-colors text-white">Profile</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-white/20 transition-colors text-white">Orders</Link>
                  <Link href="#" className="block px-4 py-2 hover:bg-white/20 transition-colors text-white">Logout</Link>
                </div>
              )}
            </div>
            
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-xl py-4 rounded-b-xl border border-white/20">
            <div className="px-4 py-4 space-y-4">
              <Link href="#home" className="block text-white hover:text-gray-200 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="#about" className="block text-white hover:text-gray-200 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="/all-products" className="block text-white hover:text-gray-200 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
              <Link href="#contact" className="block text-white hover:text-gray-200 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
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