'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { usePageTransition } from './TransitionProvider';

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & { href: string };

/** <Link> Next.js (prefetch, clic droit, nouvel onglet…) qui passe par notre transition. */
export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
