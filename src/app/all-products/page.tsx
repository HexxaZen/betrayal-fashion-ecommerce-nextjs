'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import { useCart } from '@/context/CartContext';
import ProductCard, {Product} from '../components/ProductCard';

// Konstanta untuk jumlah produk per halaman
const PRODUCTS_PER_PAGE = 27;

const BACKGROUND_IMAGE_URL = 'https://i.pinimg.com/1200x/07/e1/85/07e1850cdd6a832d405cffb523d1e89c.jpg';

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
  
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State untuk filter dan pencarian
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Reset halaman ke 1 setiap kali filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, minPrice, maxPrice]);

  // fetch products (diperbaiki agar mereset halaman)
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

  // Debounce dan useEffect untuk memanggil API
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [search, selectedCategory]);

  const handlePriceFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleAddToCart = (product: Product) => {
    addItem(product as any); 
    alert(`${product.name} telah ditambahkan ke keranjang!`);
  };

  //  PAGINATION 
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage]);
  
  // membuat array nomor halaman
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; 

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
      return pageNumbers;
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  return (
    <>
      <Header />
      <div className="bg-gray-900 text-gray-100 min-h-screen" style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}> 
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center mb-10 mt-5">OUR PRODUCTS</h1>
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full bg-gray-500 border border-gray-700 text-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-1/4">
              <select
                className="w-full bg-gray-500 border border-gray-700 text-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
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
                className="w-1/2 bg-gray-500 border border-gray-700 text-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="w-1/2 bg-gray-500 border border-gray-700 text-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-white cursor-pointer text-gray-900 px-4 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    aosDelay={index * 100} 
                  />
                ))}
              </div>

              {/* Komponen Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-10">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-800 text-gray-400 rounded-md disabled:opacity-50 hover:bg-gray-700 transition-colors"
                  >
                    Previous
                  </button>

                  {getPaginationNumbers().map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-white text-gray-900'
                          : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-800 text-gray-400 rounded-md disabled:opacity-50 hover:bg-gray-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}