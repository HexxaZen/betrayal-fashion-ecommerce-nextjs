// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Deklarasi global untuk menampung instance PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Menggunakan instance yang sudah ada jika ada, atau membuat yang baru
const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Opsi log untuk debugging
});

// Dalam mode pengembangan (development), instance PrismaClient disimpan di variabel global
// agar tidak membuat instance baru setiap kali hot-reload terjadi
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };