// src/components/CartSidebar.tsx
'use client';

import { X, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeItem, updateQuantity, cartTotal } = useCart();

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  return (
    <div
      className={`cart-sidebar fixed top-0 right-0 h-full w-full md:w-96 bg-gray-900 z-50 overflow-y-auto border-l border-gray-800 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-1">
            <X size={24} />
          </button>
        </div>
        
        <div id="cart-items" className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b border-gray-800 pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-400">Rp {formatRupiah(item.price)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="decrease-quantity text-gray-400 hover:text-gray-300"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="increase-quantity text-gray-400 hover:text-gray-300"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-item text-gray-400 hover:text-red-400"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t border-gray-800 pt-4 mt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span id="cart-subtotal" className="font-semibold">
                Rp {formatRupiah(cartTotal)}
              </span>
            </div>
            <button className="w-full bg-white text-gray-900 py-3 rounded-sm font-medium hover:bg-gray-100 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}