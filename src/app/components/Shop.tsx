// src/components/Shop.tsx
'use client';
import { useState, useEffect } from 'react';
import Aos from 'aos';
import { useCart } from '@/context/CartContext';
import ProductCard, { Product } from './ProductCard'; // Mengimpor komponen dan tipe Product

// Note: Type Product sudah didefinisikan dan diekspor di ProductCard.tsx
// Hapus definisi tipe Product di sini untuk menghindari duplikasi

type ShopProps = {
  initialProducts: Product[];
};
const BACKGROUND_IMAGE_URL = 'https://i.pinimg.com/1200x/de/ef/48/deef48f5c00df6d050a11278b903026d.jpg';

// Apply the props type to the component function
export default function Shop({ initialProducts }: ShopProps) {
  const { addItem } = useCart();
  const [products] = useState(initialProducts);

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
    <section id="shop" className="py-20 text-white" style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" data-aos="fade-up">Our Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart} // Meneruskan fungsi penambahan keranjang sebagai prop
              aosDelay={index * 100} // Meneruskan delay AOS
            />
          ))}
        </div>
      </div>
    </section>
  );
}