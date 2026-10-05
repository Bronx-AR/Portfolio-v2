'use client';

import { useCallback, type CSSProperties, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { projects } from '@/data/projects';
import { clamp, mod, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion';
import { CAROUSEL_IMAGE_SCALE } from '@/lib/shared-element';
import { usePageTransition } from './TransitionProvider';
import styles from './Scene.module.css';

/* ------------------------------------------------------------------ réglages */
const N = projects.length;
const LERP = 0.085; // 0.05 = très doux · 0.15 = très nerveux
const WHEEL_SPEED = 0.9; // sensibilité de la molette / du trackpad
const PARALLAX = 0.06; // décalage de l'image dans son cadre
const SNAP_DELAY = 140; // ms sans input avant de caler l'image au centre
const SNAP_BIAS = 0.12; // part d'image à parcourir pour passer à la suivante (molette crantée)
const FLICK = 220; // inertie du lancer au doigt / à la souris

interface CarouselState {
  target: number; // position visée (px)
  current: number; // position affichée (px), lissée
  itemH: number;
  vh: number;
  dir: 1 | -1;
  active: number;
  dirty: boolean;
  snapTimer: number;
  drag: { lastY: number; lastT: number; v: number; moved: number } | null;
  dragging: boolean;
  wasDrag: boolean;
}

type Mode = 'home' | 'about';

/**
 * Scène persistante commune à « / » et « /about » : le carrousel n'est jamais
 * démonté quand on passe de l'un à l'autre, il s'estompe simplement.
 */
export function Scene({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { navigate, getShared, clearShared, getLastSlug } = usePageTransition();
  const mode: Mode = pathname === '/about' ? 'about' : 'home';

  const [active, setActive] = useState(() => {
    const i = projects.findIndex((p) => p.slug === getLastSlug());
    return i === -1 ? 0 : i;
  });

  const initialRef = useRef(active);
  const columnRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const modeRef = useRef<Mode>(mode);
  modeRef.current = mode;
  const firstModeRun = useRef(true);

  const stateRef = useRef<CarouselState>({
    target: 0,
    current: 0,
    itemH: 1,
    vh: 1,
    dir: 1,
    active: initialRef.current,
    dirty: true,
    snapTimer: 0,
    drag: null,
    dragging: false,
    wasDrag: false,
  });

  /** Amène le projet `index` au centre, par le chemin le plus court dans la boucle. */
  const goTo = useCallback((index: number) => {
    const s = stateRef.current;
    const k = Math.round(s.target / s.itemH);
    let delta = index - mod(k, N);
    if (delta > N / 2) delta -= N;
    else if (delta < -N / 2) delta += N;
    s.target = (k + delta) * s.itemH;
    s.dir = delta < 0 ? -1 : 1;
    s.dirty = true;
  }, []);

  // Précharge les pages projets pour une navigation instantanée
  useEffect(() => {
    projects.forEach((p) => router.prefetch(`/projects/${p.slug}`));
  }, [router]);

  /* ---------------------------------------------------------------- carrousel */
  useIsoLayoutEffect(() => {
    const column = columnRef.current!;
    const items = itemRefs.current.filter((el): el is HTMLAnchorElement => el !== null);
    const imgs = items.map((el) => el.querySelector('img') as HTMLImageElement);
    const s = stateRef.current;
    const reduced = prefersReducedMotion();
    const startIndex = initialRef.current;

    const measure = () => {
      s.itemH = items[0].getBoundingClientRect().height || 1;
      s.vh = column.clientHeight || window.innerHeight;
    };

    const render = () => {
      const { current, itemH, vh } = s;
      const total = itemH * N;
      const half = total / 2;
      const centerTop = (vh - itemH) / 2;
      const maxShift = ((CAROUSEL_IMAGE_SCALE - 1) / 2) * itemH * 0.95;

      for (let i = 0; i < N; i++) {
        // Position de l'image par rapport au centre, ramenée dans [-total/2, total/2] (boucle infinie)
        let off = (i * itemH - current) % total;
        if (off > half) off -= total;
        else if (off < -half) off += total;

        items[i].style.transform = `translate3d(0, ${centerTop + off}px, 0)`;
        const shift = clamp(-off * PARALLAX, -maxShift, maxShift);
        imgs[i].style.transform = `translate3d(0, ${shift}px, 0) scale(${CAROUSEL_IMAGE_SCALE})`;
      }

      // L'image la plus proche du centre = projet actif (met à jour la liste, en React, seulement au changement)
      const idx = mod(Math.round(current / itemH), N);
      if (idx !== s.active) {
        s.active = idx;
        setActive(idx);
      }
    };

    measure();
    s.current = s.target = startIndex * s.itemH;
    s.active = startIndex;
    render();
    column.style.visibility = 'visible';

    /* ---- Boucle d'animation : interpolation indépendante du framerate ---- */
    const tick = (_time: number, deltaTime: number) => {
      const diff = s.target - s.current;
      if (Math.abs(diff) < 0.01 && !s.dirty) return;
      const frames = Math.min(deltaTime, 50) / (1000 / 60);
      const k = reduced ? 1 : 1 - Math.pow(1 - LERP, frames);
      s.current += diff * k;
      if (Math.abs(s.target - s.current) < 0.01) s.current = s.target;
      s.dirty = false;
      render();
    };
    gsap.ticker.add(tick);

    /* ---- Calage sur l'image la plus proche, avec un biais dans le sens du geste ---- */
    const snap = () => {
      const x = s.target / s.itemH;
      const k = s.dir > 0 ? Math.floor(x + 1 - SNAP_BIAS) : Math.ceil(x - 1 + SNAP_BIAS);
      s.target = k * s.itemH;
      s.dirty = true;
    };
    const scheduleSnap = (delay = SNAP_DELAY) => {
      window.clearTimeout(s.snapTimer);
      s.snapTimer = window.setTimeout(snap, delay);
    };
    const step = (direction: 1 | -1) => {
      s.target = (Math.round(s.target / s.itemH) + direction) * s.itemH;
      s.dir = direction;
      s.dirty = true;
    };

    /* ---- Molette / trackpad ---- */
    const onWheel = (event: WheelEvent) => {
      if (modeRef.current !== 'home' || document.documentElement.dataset.transitioning) return;
      if (event.ctrlKey) return; // pinch-zoom du navigateur
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? s.vh : 1;
      const raw = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      const delta = clamp(raw * unit, -220, 220);
      if (delta === 0) return;
      s.target += delta * WHEEL_SPEED;
      s.dir = delta > 0 ? 1 : -1;
      s.dirty = true;
      scheduleSnap();
    };

    /* ---- Clavier ---- */
    const onKey = (event: KeyboardEvent) => {
      if (modeRef.current !== 'home' || document.documentElement.dataset.transitioning) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        step(-1);
      }
    };

    /* ---- Glisser au doigt / à la souris ---- */
    const onPointerDown = (event: PointerEvent) => {
      if (modeRef.current !== 'home') return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      s.wasDrag = false;
      s.dragging = false;
      s.drag = { lastY: event.clientY, lastT: performance.now(), v: 0, moved: 0 };
    };
    const onPointerMove = (event: PointerEvent) => {
      const drag = s.drag;
      if (!drag) return;
      const dy = event.clientY - drag.lastY;
      const now = performance.now();
      drag.moved += Math.abs(dy);
      if (!s.dragging && drag.moved > 6) {
        s.dragging = true;
        column.dataset.dragging = 'true';
      }
      if (s.dragging) {
        s.target -= dy;
        s.dir = dy < 0 ? 1 : -1;
        s.dirty = true;
        drag.v = 0.8 * drag.v + 0.2 * (dy / Math.max(now - drag.lastT, 1));
        window.clearTimeout(s.snapTimer);
      }
      drag.lastY = event.clientY;
      drag.lastT = now;
    };
    const onPointerUp = () => {
      const drag = s.drag;
      if (!drag) return;
      if (s.dragging) {
        s.wasDrag = true; // annule le « click » qui suit le relâchement
        s.target -= drag.v * FLICK;
        s.dir = drag.v < 0 ? 1 : -1;
        s.dirty = true;
        scheduleSnap(60);
      }
      s.drag = null;
      s.dragging = false;
      delete column.dataset.dragging;
    };

    const onResize = () => {
      const oldH = s.itemH;
      measure();
      const ratio = s.itemH / oldH;
      s.target *= ratio;
      s.current *= ratio;
      s.dirty = true;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    column.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(column);

    /* ---- Animation d'entrée ---- */
    const ctx = gsap.context(() => {
      const listEls = gsap.utils.toArray<HTMLElement>('li', listRef.current ?? undefined);
      const captionEls = gsap.utils.toArray<HTMLElement>(`.${styles.caption}`);
      const fadeEls = [...listEls, ...captionEls];

      if (modeRef.current === 'about') {
        gsap.set(column, { opacity: 0.1 });
        return;
      }
      if (reduced) {
        gsap.set(fadeEls, { opacity: 1 });
        return;
      }

      const shared = getShared();
      const heroIndex =
        shared?.direction === 'back' ? projects.findIndex((p) => p.slug === shared.slug) : -1;

      // Les images apparaissent en se « déroulant », en partant de celle du centre
      const dist = (i: number) => Math.abs(mod(i - startIndex + N / 2, N) - N / 2);
      const order = items.map((_, i) => i).sort((a, b) => dist(a) - dist(b));
      items.forEach((item, i) => {
        if (i === heroIndex) {
          gsap.set(item, { visibility: 'hidden' }); // remplacée par le clone qui revient de la page projet
          return;
        }
        gsap.fromTo(
          item,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.25,
            ease: 'expo.out',
            delay: 0.15 + order.indexOf(i) * 0.09,
            clearProps: 'clipPath',
          },
        );
      });

      gsap.fromTo(
        fadeEls,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06, delay: 0.5 },
      );

      // Retour depuis une page projet : l'image du hero revient se ranger au centre du carrousel
      if (shared && heroIndex !== -1) {
        const item = items[heroIndex];
        const target = item.getBoundingClientRect();
        const cloneImg = shared.clone.querySelector('img');
        const flight = { duration: 1.15, ease: 'expo.inOut', delay: 0.1 };

        gsap.to(shared.clone, {
          left: target.left,
          top: target.top,
          width: target.width,
          height: target.height,
          ...flight,
          onComplete: () => {
            gsap.set(item, { clearProps: 'visibility' });
            shared.clone.remove();
            clearShared();
          },
        });
        if (cloneImg) gsap.to(cloneImg, { scale: CAROUSEL_IMAGE_SCALE, y: 0, ...flight });
      }
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      window.clearTimeout(s.snapTimer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      column.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------------------------------------------- Home ↔ About (sans remontage) */
  useEffect(() => {
    if (firstModeRun.current) {
      firstModeRun.current = false;
      return;
    }
    const toAbout = mode === 'about';
    const listEls = gsap.utils.toArray<HTMLElement>('li', listRef.current ?? undefined);
    const captionEls = gsap.utils.toArray<HTMLElement>(`.${styles.caption}`);
    const fadeEls = [...listEls, ...captionEls];

    const tl = gsap.timeline();
    tl.to(columnRef.current, { opacity: toAbout ? 0.1 : 1, duration: 0.9, ease: 'power2.inOut' }, 0);
    tl.to(
      fadeEls,
      {
        opacity: toAbout ? 0 : 1,
        y: toAbout ? -8 : 0,
        duration: toAbout ? 0.45 : 0.8,
        ease: 'power2.out',
        stagger: 0.04,
        delay: toAbout ? 0 : 0.25,
      },
      0,
    );
    return () => {
      tl.kill();
    };
  }, [mode]);

  /** En mode "about" : un clic en dehors du texte / du mail nous ramène à l'accueil. */
  const onSceneClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (mode !== 'about') return;
    const target = event.target as HTMLElement;
    if (target.closest('[data-about]')) return; // clic sur le titre, la bio ou le mail : on laisse faire
    navigate('/');
  };

  const onItemClick = (event: ReactMouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (stateRef.current.wasDrag) return; // c'était un glissé, pas un clic
    navigate(`/projects/${slug}`, { sharedEl: event.currentTarget });
  };

  const activeProject = projects[active];

  return (
    <div className={styles.scene} data-mode={mode} onClick={onSceneClick}>
      <div ref={columnRef} className={styles.column} inert={mode === 'about'} data-exit>
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            href={`/projects/${project.slug}`}
            className={styles.item}
            draggable={false}
            aria-label={`View project: ${project.name}`}
            data-cursor="view"
            data-cursor-label="View"
            onClick={(event) => onItemClick(event, project.slug)}
            onFocus={(event) => {
              if (event.currentTarget.matches(':focus-visible')) goTo(i);
            }}
          >
            <span className={styles.frame}>
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(min-width: 900px) 46vw, 74vw"
                quality={80}
                draggable={false}
                {...(i < 3 ? { priority: true } : { loading: 'eager' as const })}
              />
            </span>
          </Link>
        ))}
      </div>

      <div ref={listRef} className={styles.lists} inert={mode === 'about'} data-exit>
        <IndexList side="left" active={active} onSelect={goTo} />
        <IndexList side="right" active={active} onSelect={goTo} />
      </div>

      <p className={styles.caption} aria-hidden="true" data-exit>
        {active + 1}. {activeProject.name}
      </p>

      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ liste des projets */
function IndexList({
  side,
  active,
  onSelect,
}: {
  side: 'left' | 'right';
  active: number;
  onSelect: (index: number) => void;
}) {
  // Colonne de gauche : 1ère moitié — colonne de droite : 2ème moitié (comme sur la référence)
  const half = Math.ceil(projects.length / 2);
  const entries = projects
    .map((project, index) => ({ project, index }))
    .filter(({ index }) => (side === 'left' ? index < half : index >= half));

  return (
    <ul
      className={`${styles.list} ${side === 'left' ? styles.left : styles.right}`}
      style={{ '--n': entries.length } as CSSProperties}
    >
      {entries.map(({ project, index }) => (
        <li key={project.slug}>
          <button
            type="button"
            className={styles.entry}
            data-active={index === active}
            aria-current={index === active ? 'true' : undefined}
            data-cursor="link"
            onClick={() => onSelect(index)}
          >
            <span className={styles.num}>{index + 1}.</span>
            <span className={styles.name} data-text={project.name}>
              {project.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
