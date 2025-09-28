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

    return (
        <div
            key={product.id}
            data-aos="fade-up"
            data-aos-delay={aosDelay}>
            <Link
                href={productDetailUrl}
                className="product-card bg-gray-600 overflow-hidden group cursor-pointer block h-full transition-shadow rounded-2xl duration-300 hover:shadow-xl">
                <div className="overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="p-4 flex flex-col justify-between h-auto">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-100">{product.name}</h3>
                        <p className="text-gray-200 mb-4">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</p>
                    </div>
                    <button
                        className="add-to-cart w-full bg-gray-700 py-2 rounded-full cursor-pointer hover:bg-gray-100 hover:text-black transition-colors mt-2"
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