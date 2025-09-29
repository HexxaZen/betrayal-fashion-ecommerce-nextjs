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

  // Glassmorphism
  const glassMorphismStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    backdropFilter: 'blur(12px)',                
    WebkitBackdropFilter: 'blur(12px)',          
    border: '1px solid rgba(255, 255, 255, 0.3)',  
  };
  

  return (
    <div
      className="container mx-auto px-6 py-10 rounded-3xl shadow-2xl mt-5 text-white" 
      style={glassMorphismStyle} 
    >
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="md:sticky md:top-20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-xl shadow-2xl border border-white border-opacity-30" 
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          {product.category && (
            <span className="bg-white bg-opacity-20 text-black px-3 py-1 rounded-full text-sm font-medium">
              {product.category.name}
            </span>
          )}
          <p className="text-white text-3xl font-bold mt-5"> 
            {formatRupiah(product.price)}
          </p>
          <p className="text-gray-200 leading-relaxed">{product.description}</p>
          
          <p className="text-gray-300 text-sm">Stock: {product.stock}</p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}