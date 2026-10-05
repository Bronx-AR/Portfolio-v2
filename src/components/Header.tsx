'use client';

import { usePathname } from 'next/navigation';
import { site } from '@/data/site';
import { TransitionLink } from './TransitionLink';
import styles from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const onProject = pathname.startsWith('/projects/');
  const onAbout = pathname === '/about';

  return (
    <header className={styles.header}>
      <TransitionLink href="/" className={styles.logo} data-cursor="link">
        {site.name}
      </TransitionLink>

      <nav className={styles.nav} data-hidden={onProject} aria-label="Main">
        <TransitionLink
          href="/"
          aria-current={!onAbout && !onProject ? 'page' : undefined}
          tabIndex={onProject ? -1 : undefined}
          data-cursor="link"
        >
          Project
        </TransitionLink>
        <span className={styles.rule} aria-hidden="true" />
        <TransitionLink
          href="/about"
          aria-current={onAbout ? 'page' : undefined}
          tabIndex={onProject ? -1 : undefined}
          data-cursor="link"
        >
          About
        </TransitionLink>
      </nav>
    </header>
  );
}
