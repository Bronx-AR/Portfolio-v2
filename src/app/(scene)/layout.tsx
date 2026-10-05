import type { ReactNode } from 'react';
import { Scene } from '@/components/Scene';

/**
 * Layout partagé par « / » et « /about » : la scène (carrousel + liste) reste montée
 * entre les deux pages, seuls ses états changent.
 */
export default function SceneLayout({ children }: { children: ReactNode }) {
  return <Scene>{children}</Scene>;
}
