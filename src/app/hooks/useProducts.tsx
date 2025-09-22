// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';

// Tipe data produk
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Tipe data untuk state hook
type UseProductsResult = {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
};

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Asumsi Anda memiliki API Route Next.js untuk mengambil produk
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}