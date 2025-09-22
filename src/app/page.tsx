// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Shop from './components/Shop';
import VantaWrapper from './components/VantaWrapper'; 

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div>
      <VantaWrapper />
      <Hero />
      <About />
      <Shop initialProducts={products} />
      <Contact />
    </div>
  );
}