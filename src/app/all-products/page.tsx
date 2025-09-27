// src/app/all-products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';


// Tipe data untuk produk dan kategori
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string | null;
  category: { name: string } | null;
};

type Category = {
  id: number;
  name: string;
};

export default function AllProductsPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk filter dan pencarian
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fungsi untuk memuat data produk dari API
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (selectedCategory !== 'All') queryParams.append('category', selectedCategory);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);

      const response = await fetch(`/api/products?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.products);
      setCategories(data.categories);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Gunakan useEffect untuk memanggil API setiap kali filter berubah
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchProducts();
    }, 500); // Debounce untuk mencegah terlalu banyak request saat mengetik

    return () => clearTimeout(debounceFetch);
  }, [search, selectedCategory]);

  const handlePriceFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleAddToCart = (product: Product) => {
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
    <>
      <Header />
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center mb-10 mt-5">All Products</h1>

          {/* Filter Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-1/4">
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter Form */}
            <form onSubmit={handlePriceFilter} className="flex-1 flex gap-2">
              <input
                type="number"
                placeholder="Min Price"
                className="w-1/2 bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-1/2 bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button type="submit" className="bg-gray-700 text-gray-100 px-4 py-3 rounded-md hover:bg-gray-600">
                Filter
              </button>
            </form>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <p className="text-center text-lg text-gray-400">Loading products...</p>
          ) : error ? (
            <p className="text-center text-lg text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}> {/* Tambahkan Link */}
                <div className="product-card bg-gray-800 rounded-md overflow-hidden group hover:scale-[1.01] transition-transform cursor-pointer">
                  <div className="overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    {product.category && <p className="text-sm text-gray-400 mb-2">Category: {product.category.name}</p>}
                    <p className="text-gray-400 mb-4">{formatRupiah(product.price)}</p>
                  </div>
                    <button
                      className="add-to-cart w-full bg-gray-700 py-2 rounded-md hover:bg-gray-600 transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                </div>
              </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}