// src/app/order-details/page.tsx
"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Header from "../components/Header";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    snap: any;
  }
}
const BACKGROUND_IMAGE_URL = 'https://i.pinimg.com/1200x/07/e1/85/07e1850cdd6a832d405cffb523d1e89c.jpg';

export default function OrderDetailsPage() {
  const { cart, cartTotal, removeItem } = useCart();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/all-products");
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

    if (Object.values(shippingAddress).some((value) => !value)) {
      setError("Semua kolom harus diisi.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderDetails: {
            shippingDetails: shippingAddress,
            items: cart,
            total: cartTotal,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat transaksi Midtrans.");
      }

      const data = await response.json();

      if (!window.snap) {
        throw new Error("Midtrans Snap belum siap, coba refresh halaman.");
      }

      window.snap.pay(data.token, {
        onSuccess: (result: any) => {
          alert("Pembayaran berhasil!");
          // simpan order_id ke localStorage untuk ditampilkan di halaman konfirmasi
          localStorage.setItem("lastOrderId", result.order_id);

          cart.forEach((item) => removeItem(item.id));
          router.push("/order-confirmation");
        },

        onPending: () => {
          alert("Menunggu pembayaran Anda.");
        },
        onError: () => {
          alert("Pembayaran gagal!");
        },
        onClose: () => {
          alert("Anda menutup pop-up tanpa menyelesaikan pembayaran.");
        },
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRupiah = (number: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  return (
    <>
      {/* Midtrans Snap.js */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />

      <Header />
      <div className="bg-gray-900 text-gray-100 min-h-screen pt-24" style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-10">
            Order Details
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div
              className="lg:col-span-2 p-6 rounded-xl shadow-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Latar belakang putih semi-transparan
                backdropFilter: 'blur(10px)', // Efek blur
                WebkitBackdropFilter: 'blur(10px)', // Dukungan untuk browser Webkit
                border: '1px solid rgba(255, 255, 255, 0.3)', // Border semi-transparan
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2 text-white">
                Ringkasan Pesanan
              </h2>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center text-white"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-200">Jumlah: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between items-center text-white">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold">
                  {formatRupiah(cartTotal)}
                </span>
              </div>
            </div>

            {/* Shipping Form */}
            <div
              className="lg:col-span-1 p-6 rounded-xl shadow-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Latar belakang putih semi-transparan
                backdropFilter: 'blur(10px)', // Efek blur
                WebkitBackdropFilter: 'blur(10px)', // Dukungan untuk browser Webkit
                border: '1px solid rgba(255, 255, 255, 0.3)', // Border semi-transparan
              }}
            >
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2 text-white">
                Detail Pengiriman
              </h2>
              {error && <p className="text-red-300 mb-4">{error}</p>}
              <form onSubmit={handlePayment} className="space-y-4">
                {["name", "email", "phone", "address", "city", "postalCode"].map(
                  (field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-gray-200 mb-1 capitalize"
                      >
                        {field === "postalCode" ? "Kode Pos" : field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        value={(shippingAddress as any)[field]}
                        onChange={handleInputChange}
                        className="w-full bg-white bg-opacity-10 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400" // Input field diubah agar sesuai
                      />
                    </div>
                  )
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-200 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Memproses..." : "Lanjutkan Pembayaran"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
