import { useEffect, useLayoutEffect } from 'react';

/** useLayoutEffect côté client, useEffect côté serveur (évite tout warning SSR). */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Modulo toujours positif (utile pour la boucle infinie du carrousel). */
export const mod = (value: number, n: number) => ((value % n) + n) % n;

/** Résout quand l'image est chargée (ou après `timeout` ms, pour ne jamais bloquer). */
export function imageReady(img: HTMLImageElement | null, timeout = 1200): Promise<void> {
  return new Promise((resolve) => {
    if (!img || (img.complete && img.naturalWidth > 0)) return resolve();
    const done = () => {
      img.removeEventListener('load', done);
      img.removeEventListener('error', done);
      resolve();
    };
    img.addEventListener('load', done);
    img.addEventListener('error', done);
    window.setTimeout(done, timeout);
  });
}
