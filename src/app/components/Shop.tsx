// src/components/Shop.tsx

'use client';
import { useState, useEffect } from 'react';
import Aos from 'aos';
import { useCart } from '@/context/CartContext';

// Define the props type
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string | null;
  stock: number; 
};

type ShopProps = {
  initialProducts: Product[];
};

// Apply the props type to the component function
export default function Shop({ initialProducts }: ShopProps) {
  const { addItem } = useCart();
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    alert(`${product.name} telah ditambahkan ke keranjang!`);
  };

  return (
    <section id="shop" className="py-20 bg-gray-900/80">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" data-aos="fade-up">Our Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="product-card bg-gray-800 rounded-sm overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</p>
                <button
                  className="add-to-cart w-full bg-gray-700 py-2 rounded-sm hover:bg-gray-600 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}