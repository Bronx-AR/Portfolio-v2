'use client';

import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '@/lib/motion';
import { createSharedClone } from '@/lib/shared-element';

/**
 * Transitions de pages sans rechargement.
 *
 * 1. `navigate()` fait disparaître les éléments marqués `data-exit` de la page courante.
 * 2. Si une image est « partagée » (carrousel ↔ hero du projet), elle est clonée dans un
 *    calque fixe qui vit au-dessus des pages : elle survit au changement de route.
 * 3. La page d'arrivée récupère le clone (`getShared`) et l'anime vers sa position finale.
 */

export interface SharedTransition {
  slug: string;
  clone: HTMLElement;
  direction: 'forward' | 'back';
}

interface NavigateOptions {
  /** Élément dont l'image doit « voyager » jusqu'à la page suivante */
  sharedEl?: HTMLElement | null;
}

interface TransitionApi {
  navigate: (href: string, options?: NavigateOptions) => void;
  getShared: () => SharedTransition | null;
  clearShared: () => void;
  getLastSlug: () => string | null;
  setLastSlug: (slug: string) => void;
}

const TransitionContext = createContext<TransitionApi | null>(null);

export function usePageTransition(): TransitionApi {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('usePageTransition doit être utilisé dans <TransitionProvider>');
  return ctx;
}

const projectSlugOf = (path: string) => path.match(/^\/projects\/([^/]+)/)?.[1] ?? null;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  const layerRef = useRef<HTMLDivElement>(null);
  const sharedRef = useRef<SharedTransition | null>(null);
  const lastSlugRef = useRef<string | null>(null);
  const busyRef = useRef(false);
  const unlockTimer = useRef<number | undefined>(undefined);

  // Nouvelle page arrivée : on débloque les interactions
  useEffect(() => {
    busyRef.current = false;
    delete document.documentElement.dataset.transitioning;
    window.clearTimeout(unlockTimer.current);
  }, [pathname]);

  const api = useMemo<TransitionApi>(
    () => ({
      navigate(href, options) {
        const from = pathRef.current;
        const to = href.split(/[?#]/)[0] || '/';
        if (busyRef.current || to === from) return;

        busyRef.current = true;
        document.documentElement.dataset.transitioning = 'true';
        // Filet de sécurité : ne jamais rester bloqué si la navigation échoue
        unlockTimer.current = window.setTimeout(() => {
          busyRef.current = false;
          delete document.documentElement.dataset.transitioning;
        }, 5000);

        const go = () => router.push(href);

        // Accueil → About : la scène s'anime elle-même (images qui s'estompent)
        if (prefersReducedMotion() || (from === '/' && to === '/about')) return go();

        // --- Élément partagé -------------------------------------------------------
        const fromProject = projectSlugOf(from);
        const toProject = projectSlugOf(to);
        let source = options?.sharedEl ?? null;
        if (!source && fromProject && to === '/') source = document.querySelector<HTMLElement>('[data-hero]');

        const slug = toProject ?? fromProject;
        const isSharedRoute = Boolean(toProject) || (Boolean(fromProject) && to === '/');

        if (source && slug && isSharedRoute && layerRef.current) {
          const r = source.getBoundingClientRect();
          const visible = r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
          if (visible) {
            const clone = createSharedClone(source, layerRef.current);
            if (clone) sharedRef.current = { slug, clone, direction: toProject ? 'forward' : 'back' };
          }
        }

        // --- Sortie -----------------------------------------------------------------
        const selector = from === '/about' && to === '/' ? '[data-about]' : '[data-exit]';
        const targets = gsap.utils.toArray<HTMLElement>(selector);
        if (targets.length === 0) return go();

        gsap.to(targets, {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.inOut',
          overwrite: 'auto',
          onComplete: go,
        });
      },

      getShared: () => sharedRef.current,
      clearShared: () => {
        sharedRef.current = null;
      },
      getLastSlug: () => lastSlugRef.current,
      setLastSlug: (slug) => {
        lastSlugRef.current = slug;
      },
    }),
    [router],
  );

  return (
    <TransitionContext.Provider value={api}>
      {children}
      <div ref={layerRef} className="transition-layer" aria-hidden="true" />
    </TransitionContext.Provider>
  );
}
