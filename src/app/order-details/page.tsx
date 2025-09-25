// src/app/order-details/page.tsx
"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"; // Pastikan Anda memiliki Footer
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

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

    // Validasi form
    if (Object.values(shippingAddress).some((value) => !value)) {
      setError("Semua kolom harus diisi.");
      setIsSubmitting(false);
      return;
    }

    try {
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
        throw new Error("Gagal membuat transaksi Midtrans.");
      }

      const data = await response.json();
      const { token } = data;

      // 🔄 Perbaikan di sini: Tunggu hingga Midtrans Snap siap
      const isSnapReady = await new Promise<boolean>((resolve) => {
        const checkInterval = setInterval(() => {
          if (typeof (window as any).snap !== "undefined") {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);

        setTimeout(() => {
          clearInterval(checkInterval);
          resolve(false);
        }, 5000); // Batas waktu 5 detik
      });

      if (isSnapReady) {
        (window as any).snap.pay(token, {
          onSuccess: function () {
            alert("Pembayaran berhasil!");
            cart.forEach((item) => removeItem(item.id));
            router.push("/order-confirmation");
          },
          onPending: function () {
            alert("Menunggu pembayaran Anda.");
          },
          onError: function () {
            alert("Pembayaran gagal!");
          },
          onClose: function () {
            alert("Anda menutup pop-up tanpa menyelesaikan pembayaran.");
          },
        });
      } else {
        alert("Midtrans Snap gagal dimuat. Silakan coba refresh halaman.");
      }
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
      maximumFractionDigits: 0,
    }).format(number);

  return (
    <>
      <Header />
      <div className="bg-gray-900 text-gray-100 min-h-screen pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-10">
            Order Details
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Ringkasan Pesanan
              </h2>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
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
                <span className="text-2xl font-bold text-white">
                  {formatRupiah(cartTotal)}
                </span>
              </div>
            </div>

            {/* Shipping Form */}
            <div className="lg:col-span-1 p-6 bg-gray-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Detail Pengiriman
              </h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handlePayment} className="space-y-4">
                {["name", "email", "phone", "address", "city", "postalCode"].map(
                  (field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-gray-400 mb-1 capitalize"
                      >
                        {field === "postalCode" ? "Kode Pos" : field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        value={(shippingAddress as any)[field]}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                      />
                    </div>
                  )
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Memproses..." : "Lanjutkan Pembayaran"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}