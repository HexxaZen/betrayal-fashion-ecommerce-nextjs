// src/types/vanta.d.ts

declare module 'vanta/dist/vanta.globe.min' {
    import * as THREE from 'three';
    interface VantaOptions {
      el: HTMLElement | string;
      THREE: any;
      mouseControls?: boolean;
      touchControls?: boolean;
      gyroControls?: boolean;
      minHeight?: number;
      minWidth?: number;
      scale?: number;
      scaleMobile?: number;
      color?: number;
      backgroundColor?: number;
      size?: number;
    }
    const GLOBE: (options: VantaOptions) => { destroy: () => void };
    export default GLOBE;
  }