// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get('category');
    const searchTerm = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    console.log("🔎 Query Params:", {
      categoryName,
      searchTerm,
      minPrice,
      maxPrice,
    });

    const whereClause: any = {};

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: 'insensitive',
      };
    }

    if (categoryName && categoryName !== 'All') {
      whereClause.category = {
        is: {
          name: categoryName,
        },
      };
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      const minPriceNum = parseFloat(minPrice || '');
      const maxPriceNum = parseFloat(maxPrice || '');

      if (!isNaN(minPriceNum)) {
        whereClause.price.gte = minPriceNum;
      }
      if (!isNaN(maxPriceNum)) {
        whereClause.price.lte = maxPriceNum;
      }
    }

    console.log("🛠 Where Clause:", JSON.stringify(whereClause, null, 2));

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: {
        name: 'asc'
      }
    });

    console.log("✅ Products fetched:", products.length);

    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    console.log("✅ Categories fetched:", categories.length);

    return NextResponse.json({ products, categories });
  } catch (error: any) {
    console.error("❌ Error fetching products:", error.message);
    console.error(error.stack);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
