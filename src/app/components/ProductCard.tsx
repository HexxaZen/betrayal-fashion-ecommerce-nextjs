// src/components/ProductCard.tsx
'use client';

import Link from 'next/link';

// Define the props type
export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: { name: string } | null;
    description: string | null;
    stock: number;
};

type ProductCardProps = {
    product: Product;
    onAddToCart: (product: Product) => void;
    aosDelay: number;
};

export default function ProductCard({ product, onAddToCart, aosDelay }: ProductCardProps) {


    const productDetailUrl = `/products/${product.id}`;

    // Glassmorphism
    const glassMorphismStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Latar belakang putih semi-transparan (15% opacity)
        backdropFilter: 'blur(8px)',               // Efek blur pada latar belakang
        WebkitBackdropFilter: 'blur(8px)',         // Dukungan untuk browser Webkit
        border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparan
    };

    return (
        <div
            key={product.id}
            data-aos="fade-up"
            data-aos-delay={aosDelay}>
            <Link
                href={productDetailUrl}
                className="product-card overflow-hidden group cursor-pointer block h-full transition-shadow rounded-2xl duration-300 hover:shadow-2xl text-white" // Hapus bg-gray-300 dan tambahkan text-white
                style={glassMorphismStyle} 
            >
                <div className="overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 flex flex-col justify-between h-auto">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3> 
                        <p className="text-gray-200 mb-4">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</p> 
                    </div>
                    <button
                        className="add-to-cart w-full bg-gray-800 text-white py-2 rounded-full cursor-pointer mt-2 font-semibold tracking-wide shadow-md hover:bg-white hover:text-gray-900 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ease-in-out"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </Link>
        </div>
    );
}