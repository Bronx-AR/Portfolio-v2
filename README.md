# Portfolio v2 — Arnaud Quatrevaux

Next.js (App Router) · TypeScript · GSAP · Lenis · CSS Modules

## Lancer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # à tester aussi en prod : les images et le prefetch s'y comportent différemment
```

## Ce que tu dois personnaliser

| Quoi | Où |
| --- | --- |
| Projets, liens GitHub, textes, images | `src/data/projects.ts` + `public/projects/<slug>/` |
| Texte « About » et email | `src/data/site.ts` |
| Police (Bodoni Moda = approximation de la maquette) | `src/app/layout.tsx` (un seul endroit) |
| Couleurs, largeur de colonne, tailles de texte | `src/app/globals.css` (tokens en haut) |
| Sensibilité / inertie du carrousel | constantes en haut de `src/components/Scene.tsx` |

Les images actuelles sont des **placeholders** générés : remplace `cover.jpg` (ratio 3:2 recommandé) et les captures, puis ajuste `width`/`height` dans `projects.ts`.

## Architecture

```
src/
├─ app/
│  ├─ layout.tsx                 police, Header, Curseur, TransitionProvider
│  ├─ (scene)/layout.tsx         Scene persistante pour « / » et « /about »
│  ├─ (scene)/page.tsx           accueil (la scène elle-même)
│  ├─ (scene)/about/page.tsx     texte About (la scène s'estompe derrière)
│  └─ projects/[slug]/page.tsx   page projet
├─ components/
│  ├─ Scene.tsx                  carrousel vertical infini + liste synchronisée
│  ├─ ProjectDetail.tsx          page projet : Lenis, ScrollTrigger, rail de suivi
│  ├─ TransitionProvider.tsx     transitions de pages + élément partagé
│  ├─ Cursor.tsx                 curseur personnalisé
│  └─ Header.tsx · AboutContent.tsx · TransitionLink.tsx
├─ data/                         projects.ts · site.ts
└─ lib/                          motion.ts · shared-element.ts
```

### Comment ça marche

- **Carrousel** : pas de scroll natif. On écoute molette / touche / glisser, on interpole une position (`lerp` indépendant du framerate) et on positionne les 8 images en `transform` (boucle infinie par modulo). Après ~140 ms sans input, l'image la plus proche se cale au centre (avec un biais dans le sens du geste, pour que les molettes « crantées » avancent bien d'une image).
- **Liste ↔ carrousel** : le projet actif = l'image la plus proche du centre ; un clic sur un nom recentre l'image par le chemin le plus court.
- **Transition image → page projet** : l'image est clonée dans un calque fixe global, le reste de la page s'efface, la route change, puis le clone « atterrit » sur le hero de la page projet. Même chose en sens inverse (logo ou touche Échap) : le hero revient se ranger au centre du carrousel.
- **Rail de droite** : miniatures de toutes les images, calées sur le point de la page situé au centre de l'écran ; cliquables.
- **Perf** : seulement `transform` / `opacity` / `clip-path` animés, aucun re-render React pendant les animations, `prefers-reduced-motion` respecté, curseur désactivé sur tactile.

## Limites connues

- Le mobile n'était pas dans la maquette : un comportement par défaut est prévu (liste masquée, nom du projet en bas, rail masqué).
- Le `data-cursor="view"` affiche « View » : change le libellé via `data-cursor-label` dans `Scene.tsx`.
