'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/data/projects';
import { clamp, imageReady, prefersReducedMotion, useIsoLayoutEffect } from '@/lib/motion';
import { usePageTransition } from './TransitionProvider';
import { TransitionLink } from './TransitionLink';
import styles from './ProjectDetail.module.css';

interface Props {
  project: Project;
  next: Project;
  nextNumber: number;
}

interface Metrics {
  stackTop: number;
  vh: number;
  windowH: number;
  frames: { top: number; h: number }[];
  thumbs: { top: number; h: number }[];
}

export function ProjectDetail({ project, next, nextNumber }: Props) {
  const { navigate, getShared, clearShared, setLastSlug } = usePageTransition();
  const images = [project.cover, ...project.gallery];

  const rootRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railWindowRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollToFrame = useRef<(index: number) => void>(() => {});

  /* ------------------------------------------------------------------ entrée */
  useIsoLayoutEffect(() => {
    setLastSlug(project.slug);
    window.scrollTo(0, 0);

    const root = rootRef.current!;
    const frame = frameRefs.current[0]!;
    const heroImg = frame.querySelector('img');
    const reduced = prefersReducedMotion();
    const texts = gsap.utils.toArray<HTMLElement>('[data-enter]', root);

    if (reduced) {
      gsap.set(texts, { opacity: 1 });
      gsap.set('[data-reveal]', { clipPath: 'inset(0% 0% 0% 0%)' });
      getShared()?.clone.remove();
      clearShared();
      return;
    }

    const shared = getShared();
    const hasShared = !!shared && shared.slug === project.slug && shared.direction === 'forward';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      if (hasShared && shared) {
        // L'image du carrousel « atterrit » sur le hero de la page
        gsap.set(frame, { visibility: 'hidden' });
        const target = frame.getBoundingClientRect();
        const cloneImg = shared.clone.querySelector('img');
        const flight = { duration: 1.15, ease: 'expo.inOut' };

        tl.to(
          shared.clone,
          {
            left: target.left,
            top: target.top,
            width: target.width,
            height: target.height,
            ...flight,
            onComplete: async () => {
              await imageReady(heroImg);
              gsap.set(frame, { visibility: 'visible' });
              shared.clone.remove();
              clearShared();
            },
          },
          0,
        );
        if (cloneImg) tl.to(cloneImg, { scale: 1, y: 0, ...flight }, 0);
      } else {
        // Arrivée « à froid » (lien direct, bouton retour…)
        tl.fromTo(frame, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' }, 0);
      }

      tl.fromTo(
        texts,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 },
        hasShared ? 0.6 : 0.15,
      );
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --------------------------------------------- scroll fluide, révélations, rail */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = prefersReducedMotion();
    const stack = stackRef.current!;
    const strip = stripRef.current!;
    const railWindow = railWindowRef.current!;
    const frames = frameRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const thumbs = thumbRefs.current.filter((el): el is HTMLButtonElement => el !== null);

    /* Scroll fluide (Lenis) piloté par le ticker GSAP : une seule boucle pour tout */
    let lenis: Lenis | null = null;
    let lenisTick: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
      lenis.on('scroll', ScrollTrigger.update);
      lenisTick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(lenisTick);
      gsap.ticker.lagSmoothing(0);
    }

    /* Rail de suivi : miniature de chaque image, calée sur le point de la page au centre de l'écran */
    let m: Metrics = { stackTop: 0, vh: 1, windowH: 1, frames: [], thumbs: [] };
    let activeThumb = -1;

    const measure = () => {
      const stackRect = stack.getBoundingClientRect();
      const stripRect = strip.getBoundingClientRect();
      m = {
        stackTop: stackRect.top + window.scrollY,
        vh: window.innerHeight,
        windowH: railWindow.clientHeight,
        frames: frames.map((f) => {
          const r = f.getBoundingClientRect();
          return { top: r.top - stackRect.top, h: r.height };
        }),
        thumbs: thumbs.map((t) => {
          const r = t.getBoundingClientRect();
          return { top: r.top - stripRect.top, h: r.height };
        }),
      };
    };

    const updateRail = () => {
      if (!m.frames.length || !m.thumbs.length) return;
      const p = window.scrollY + m.vh / 2 - m.stackTop; // point de la page situé au centre de l'écran
      let k = 0;
      for (let i = 0; i < m.frames.length; i++) if (p >= m.frames[i].top) k = i;

      const f = m.frames[k];
      const t = m.thumbs[k];
      const frac = clamp((p - f.top) / f.h, 0, 1);
      const y = t.top + frac * t.h;
      strip.style.transform = `translate3d(0, ${m.windowH / 2 - y}px, 0)`;

      if (k !== activeThumb) {
        activeThumb = k;
        thumbs.forEach((el, i) => (el.dataset.active = String(i === k)));
      }
    };

    measure();
    updateRail();
    gsap.ticker.add(updateRail);

    scrollToFrame.current = (index) => {
      const f = m.frames[index];
      if (!f) return;
      // Image plus haute que l'écran : on aligne son haut ; sinon on la centre
      const y =
        f.h > m.vh
          ? m.stackTop + f.top - m.vh * 0.12
          : m.stackTop + f.top + f.h / 2 - m.vh / 2;
      const top = Math.max(0, y);
      if (lenis) lenis.scrollTo(top, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      else window.scrollTo({ top });
    };

    /* Révélation des captures au scroll */
    const ctx = gsap.context(() => {
      frames.slice(1).forEach((frame) => {
        const img = frame.querySelector('img');
        if (reduced) {
          gsap.set(frame, { clipPath: 'inset(0% 0% 0% 0%)' });
          return;
        }
        // Déjà visible à l'arrivée ? On attend la fin de l'intro du hero
        const delay = frame.getBoundingClientRect().top < window.innerHeight * 0.92 ? 1.1 : 0;
        const scrollTrigger = { trigger: frame, start: 'top 92%', once: true };
        gsap.fromTo(
          frame,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', delay, scrollTrigger },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18, transformOrigin: '50% 0%' },
            { scale: 1, duration: 1.8, ease: 'expo.out', delay, scrollTrigger },
          );
        }
      });
    });

    const onResize = () => {
      measure();
      ScrollTrigger.refresh();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(stack);
    window.addEventListener('resize', onResize);

    /* Échap = retour au carrousel */
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      gsap.ticker.remove(updateRail);
      ctx.revert();
      if (lenisTick) gsap.ticker.remove(lenisTick);
      lenis?.destroy();
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [navigate]);

  const onThumbClick = useCallback((index: number) => scrollToFrame.current(index), []);

  return (
    <main ref={rootRef} className={styles.root}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <div className={styles.titleRow}>
            <h1 className={styles.title} data-enter data-exit>
              {project.name}
            </h1>
            <a
              className={styles.link}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub (opens in a new tab)`}
              data-cursor="link"
              data-enter
              data-exit
            >
              Link
              <svg className={styles.arrow} viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                <path d="M2 2l9.5 9.5M11.5 4.5v7h-7" fill="none" stroke="currentColor" strokeWidth="1.1" />
              </svg>
            </a>
          </div>
          <p className={styles.tagline} lang="fr" data-enter data-exit>
            {project.tagline}
          </p>
        </div>

        <div ref={stackRef} className={styles.stack}>
          {images.map((image, i) => (
            <div
              key={image.src}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              className={styles.frame}
              data-hero={i === 0 ? '' : undefined}
              data-reveal={i > 0 ? '' : undefined}
              data-exit
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 900px) 46vw, 92vw"
                quality={85}
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <nav className={styles.next} aria-label="Next project" data-enter data-exit>
          <TransitionLink href={`/projects/${next.slug}`} data-cursor="link">
            <span className={styles.nextLabel}>Next project</span>
            <span className={styles.nextName}>
              {nextNumber}. {next.name}
            </span>
          </TransitionLink>
        </nav>
      </div>

      <aside className={styles.rail} aria-label="Project images" data-enter data-exit>
        <div ref={railWindowRef} className={styles.railWindow}>
          <div ref={stripRef} className={styles.railStrip}>
            {images.map((image, i) => (
              <button
                key={image.src}
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                type="button"
                className={styles.thumb}
                data-active={i === 0}
                data-cursor="link"
                aria-label={`Go to image ${i + 1} of ${images.length}`}
                onClick={() => onThumbClick(i)}
              >
                <Image src={image.src} alt="" width={image.width} height={image.height} sizes="15vw" quality={60} />
              </button>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
