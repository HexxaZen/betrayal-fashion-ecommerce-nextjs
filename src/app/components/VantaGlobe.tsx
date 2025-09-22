// src/components/VantaGlobe.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';

export default function VantaGlobe() {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    // Make sure both Vanta and THREE are available before initializing
    if (vantaRef.current) {
      vantaEffectRef.current = GLOBE({
        el: vantaRef.current,
        THREE: THREE, // Pass the THREE.js library to Vanta
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x888888,
        backgroundColor: 0x111111,
        size: 0.8,
      });
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0"
      style={{ height: '100vh', width: '100vw' }}
    />
  );
}