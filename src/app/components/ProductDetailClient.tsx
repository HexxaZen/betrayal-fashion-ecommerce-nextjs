// src/components/ProductDetailClient.tsx
'use client';

import { useCart } from '@/context/CartContext';

// Tipe data produk
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string | null;
  category: { name: string } | null;
  stock: number;
};

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    alert(`${product.name} telah ditambahkan ke keranjang!`);
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
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="md:sticky md:top-20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          {product.category && (
            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
              {product.category.name}
            </span>
          )}
          <p className="text-gray-400 text-2xl font-semibold">
            {formatRupiah(product.price)}
          </p>
          <p className="text-gray-300 leading-relaxed">{product.description}</p>
          
          <p className="text-gray-500 text-sm">Stock: {product.stock}</p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}