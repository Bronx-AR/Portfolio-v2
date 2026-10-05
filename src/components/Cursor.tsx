'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { prefersReducedMotion } from '@/lib/motion';
import styles from './Cursor.module.css';

/**
 * Curseur personnalisé.
 *  - suit la souris avec `gsap.quickTo` (aucun re-render React, 60 fps)
 *  - change d'état selon l'attribut `data-cursor` de l'élément survolé :
 *      data-cursor="link"  → le point grossit et inverse les couleurs dessous
 *      data-cursor="view"  → grand disque blanc avec un libellé (`data-cursor-label`)
 *  - désactivé sur écrans tactiles (et le curseur natif reste alors intact)
 */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const root = rootRef.current!;
    const label = labelRef.current!;
    const html = document.documentElement;
    html.classList.add('has-cursor');

    const duration = prefersReducedMotion() ? 0 : 0.3;
    const moveX = gsap.quickTo(root, 'x', { duration, ease: 'power3' });
    const moveY = gsap.quickTo(root, 'y', { duration, ease: 'power3' });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      if (root.dataset.visible !== 'true') {
        gsap.set(root, { x: event.clientX, y: event.clientY });
        root.dataset.visible = 'true';
      }
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>('[data-cursor]');
      const state = el?.dataset.cursor ?? 'default';
      root.dataset.state = state;
      label.textContent = el?.dataset.cursorLabel ?? '';
    };

    const onLeave = () => {
      root.dataset.visible = 'false';
    };
    const onDown = () => {
      root.dataset.pressed = 'true';
    };
    const onUp = () => {
      root.dataset.pressed = 'false';
    };

    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    html.addEventListener('mouseleave', onLeave);

    return () => {
      html.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      html.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.cursor} data-state="default" aria-hidden="true">
      <div className={styles.center}>
        <span className={styles.dot} />
        <span ref={labelRef} className={styles.label} />
      </div>
    </div>
  );
}
