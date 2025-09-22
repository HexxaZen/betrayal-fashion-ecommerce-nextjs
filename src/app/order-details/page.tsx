// src/app/order-details/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Script from 'next/script';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function OrderDetailsPage() {
  const { cart, cartTotal, removeItem } = useCart();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect jika keranjang kosong
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/all-products'); // Arahkan ke halaman produk jika keranjang kosong
    }
  }, [cart, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validasi form
    if (Object.values(shippingAddress).some((value) => !value)) {
      setError('Semua kolom harus diisi.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Panggil API backend untuk membuat transaksi Midtrans
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderDetails: {
            shippingDetails: shippingAddress,
            items: cart,
            total: cartTotal,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat transaksi Midtrans.');
      }

      const data = await response.json();
      const { token, orderId } = data;

      // 2. Buka modal pembayaran Midtrans menggunakan window.snap.pay
      (window as any).snap.pay(token, {
        onSuccess: function (result: any) {
          /* Panggilan API untuk menandai pesanan sebagai berhasil */
          alert("Pembayaran berhasil!");
          // Hapus item dari keranjang setelah pembayaran berhasil
          cart.forEach((item) => removeItem(item.id));
          router.push('/order-confirmation'); // Arahkan ke halaman konfirmasi
        },
        onPending: function (result: any) {
          /* Panggilan API untuk menandai pesanan sebagai pending */
          alert("Menunggu pembayaran Anda.");
        },
        onError: function (result: any) {
          /* Panggilan API untuk menandai pesanan sebagai gagal */
          alert("Pembayaran gagal!");
        },
        onClose: function () {
          // Pengguna menutup modal tanpa menyelesaikan pembayaran
          alert("Anda menutup pop-up tanpa menyelesaikan pembayaran.");
        }
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <>
      <Header />
      <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.MIDTRANS_CLIENT_KEY}
        />
      <div className="bg-gray-900 text-gray-100 min-h-screen pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-10">Order Details</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Ringkasan Pesanan</h2>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-400">Jumlah: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-700 mt-6 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-white">{formatRupiah(cartTotal)}</span>
              </div>
            </div>

            {/* Shipping Form */}
            <div className="lg:col-span-1 p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Detail Pengiriman</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-400 mb-1">Nomor Telepon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-400 mb-1">Alamat</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-gray-400 mb-1">Kota</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-gray-400 mb-1">Kode Pos</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Memproses...' : 'Lanjutkan Pembayaran'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}