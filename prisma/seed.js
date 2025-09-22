// prisma/seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting data seeding process...');

  // Hapus data yang ada untuk memastikan database bersih
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  
  // Tambahkan Kategori
  const dressCategory = await prisma.category.create({
    data: { name: 'Dresses' }
  });

  const blazerCategory = await prisma.category.create({
    data: { name: 'Blazers' }
  });

  const trousersCategory = await prisma.category.create({
    data: { name: 'Trousers' }
  });

  const coatCategory = await prisma.category.create({
    data: { name: 'Coats' }
  });

  const topsCategory = await prisma.category.create({
    data: { name: 'Tops' }
  });

  const skirtsCategory = await prisma.category.create({
    data: { name: 'Skirts' }
  });

  // Tambahkan Produk dengan Kategori
  const products = [
    {
      name: 'Ethereal Dress',
      price: 3499000,
      image: 'https://static.photos/fashion/640x360/5',
      description: 'A flowing, elegant dress made from the finest silk, perfect for any evening occasion.',
      stock: 50,
      categoryId: dressCategory.id
    },
    {
      name: 'Aura Blazer',
      price: 2699000,
      image: 'https://static.photos/fashion/640x360/6',
      description: 'A modern, tailored blazer with a minimalist design, perfect for a chic and professional look.',
      stock: 30,
      categoryId: blazerCategory.id
    },
    {
      name: 'Nebula Trousers',
      price: 2299000,
      image: 'https://static.photos/fashion/640x360/7',
      description: 'Comfortable yet stylish trousers with a unique pattern inspired by the night sky.',
      stock: 45,
      categoryId: trousersCategory.id
    },
    {
      name: 'Void Coat',
      price: 4299000,
      image: 'https://static.photos/fashion/640x360/8',
      description: 'A long, heavy coat with an oversized fit, offering both warmth and a powerful aesthetic.',
      stock: 20,
      categoryId: coatCategory.id
    },
    {
      name: 'Essence Top',
      price: 1899000,
      image: 'https://static.photos/fashion/640x360/9',
      description: 'A versatile and lightweight top, designed for effortless style and comfort.',
      stock: 60,
      categoryId: topsCategory.id
    },
    {
      name: 'Mystique Skirt',
      price: 2599000,
      image: 'https://static.photos/fashion/640x360/10',
      description: 'A stylish pleated skirt that adapts to any body shape, exuding grace and mystery.',
      stock: 35,
      categoryId: skirtsCategory.id
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seeding process completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });