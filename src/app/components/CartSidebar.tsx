// src/components/CartSidebar.tsx
'use client';

import { X, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

// === Gaya Glassmorphism ===
const glassMorphismStyle = {
    // Gunakan warna putih/terang semi-transparan untuk efek glassmorphism yang klasik
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(15px)', // Tingkatkan blur sedikit agar lebih jelas
    WebkitBackdropFilter: 'blur(15px)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)', // Border vertikal semi-transparan
};
// ===========================

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeItem, updateQuantity, cartTotal } = useCart();

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };
  const router = useRouter();
  const handleCheckout = () => {
      onClose(); // Tutup sidebar
      router.push('/order-details'); // Arahkan ke halaman detail pesanan
    };
  return (
    <div
      className={`cart-sidebar fixed top-0 right-0 h-full w-full md:w-96 z-50 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } text-white`} // Hapus bg-gray-900, border-l, dan tambahkan text-white
      style={glassMorphismStyle} // Terapkan gaya glassmorphism
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-1 text-white hover:text-gray-300">
            <X size={24} />
          </button>
        </div>
        
        <div id="cart-items" className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-300 text-center py-8">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b border-gray-700 pb-4"> {/* Border diubah agar serasi */}
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-300">Rp {formatRupiah(item.price)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="decrease-quantity text-gray-300 hover:text-white"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="increase-quantity text-gray-300 hover:text-white"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-item text-gray-300 hover:text-red-300"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t border-gray-700 pt-4 mt-8"> {/* Border diubah agar serasi */}
          <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300">Subtotal</span>
              <span id="cart-subtotal" className="font-semibold text-white">
                  {formatRupiah(cartTotal)}
              </span>
          </div>
          <button
              onClick={handleCheckout} // Panggil handler checkout
              disabled={cart.length === 0}
              className="w-full bg-white text-gray-900 py-3 rounded-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
              Checkout
          </button>
      </div>
        )}
      </div>
    </div>
  );
}