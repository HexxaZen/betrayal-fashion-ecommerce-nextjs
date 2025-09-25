
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from '@/context/CartContext';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Betrayal | Luxury Fashion',
  description: 'Redefining luxury fashion with bold designs and uncompromising quality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.className} bg-gray-900 text-gray-100`}>
      <Script
          src={`https://app.sandbox.midtrans.com/snap/snap.js`}
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="beforeInteractive"
        />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}