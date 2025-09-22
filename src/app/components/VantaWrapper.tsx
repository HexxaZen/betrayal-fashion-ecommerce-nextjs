// src/components/VantaWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const VantaGlobe = dynamic(() => import('./VantaGlobe'), {
  ssr: false,
});

export default function VantaWrapper() {
  return <VantaGlobe />;
}