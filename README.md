# Portfolio v2 — Arnaud Quatrevaux

Next.js (App Router) · TypeScript · GSAP · Lenis · CSS Modules

## Lancer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # à tester aussi en prod : les images et le prefetch s'y comportent différemment
```

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

