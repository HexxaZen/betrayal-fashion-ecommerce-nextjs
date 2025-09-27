// src/app/order-confirmation/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Ambil data dari localStorage atau query params (jika mau lebih kompleks)
    const savedOrderId = localStorage.getItem("lastOrderId");
    if (savedOrderId) {
      setOrderId(savedOrderId);
      localStorage.removeItem("lastOrderId"); // hapus biar bersih
    }
  }, []);

  return (
    <>
      <Header />
      <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-green-400 mb-4">
            ✅ Pembayaran Berhasil
          </h1>
          <p className="text-gray-300 mb-6">
            Terima kasih! Pesanan Anda sudah berhasil diproses.
          </p>

          {orderId && (
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <p className="text-gray-400">Nomor Pesanan</p>
              <p className="text-lg font-semibold text-white">{orderId}</p>
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/all-products"
              className="block w-full bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Belanja Lagi
            </Link>
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
