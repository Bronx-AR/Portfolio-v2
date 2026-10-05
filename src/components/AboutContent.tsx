'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { site } from '@/data/site';
import { prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion';
import styles from './AboutContent.module.css';

export function AboutContent() {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const lines = gsap.utils.toArray<HTMLElement>('[data-line]', ref.current ?? undefined);
    if (prefersReducedMotion()) {
      gsap.set(lines, { opacity: 1 });
      return;
    }
    const tween = gsap.fromTo(
      lines,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.35 },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section ref={ref} className={styles.about} aria-labelledby="about-title" data-about>
      <h1 id="about-title" className={styles.title} data-line>
        {site.role}
      </h1>
      <p className={styles.bio} data-line>
        {site.bio}
      </p>
      <a className={styles.mail} href={`mailto:${site.email}`} data-line data-cursor="link">
        {site.email}
      </a>
    </section>
  );
}
