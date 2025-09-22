// src/context/CartContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Tipe data untuk item produk di dalam keranjang
type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  }
  
// Tipe data untuk nilai context
type CartContextType = {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  cartTotal: number;
};

// Membuat Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Fungsi untuk memformat angka menjadi Rupiah (IDR)
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// Provider yang membungkus komponen anak dan menyediakan state keranjang
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Mengambil data keranjang dari LocalStorage saat komponen dimuat
  useEffect(() => {
    const storedCart = localStorage.getItem('betrayal-cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Menyimpan data keranjang ke LocalStorage setiap kali state 'cart' berubah
  useEffect(() => {
    localStorage.setItem('betrayal-cart', JSON.stringify(cart));
  }, [cart]);

  // Fungsi untuk menambah item ke keranjang atau menambah kuantitasnya
  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Fungsi untuk memperbarui kuantitas item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Menghitung total harga keranjang
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}