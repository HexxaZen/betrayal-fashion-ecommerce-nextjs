// src/app/products/[id]/page.tsx

import { prisma } from '@/lib/prisma';
import Header from '../../components/Header';
import ProductDetailClient from '../../components/ProductDetailClient';

// Tipe data untuk props halaman
interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    return (
      <div className="text-center text-red-500 py-20">
        <h1 className="text-4xl font-bold">Produk Tidak Ditemukan</h1>
        <p>ID produk tidak valid.</p>
      </div>
    );
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
    },
  });

  if (!product) {
    return (
      <div className="text-center text-red-500 py-20">
        <h1 className="text-4xl font-bold">Produk Tidak Ditemukan</h1>
        <p>Produk dengan ID {productId} tidak ada.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-900 text-gray-100 min-h-screen pt-20">
        <ProductDetailClient product={product} />
      </div>
    </>
  );
}