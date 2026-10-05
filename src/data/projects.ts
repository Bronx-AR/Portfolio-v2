/**
 * Toutes les données du portfolio vivent ici.
 * Pour ajouter un projet : ajoute un objet dans `projects`, dépose les images dans
 * /public/projects/<slug>/ et c'est tout (carrousel, liste, pages et rail suivent).
 *
 * Conseil : garde le même ratio 3:2 pour les `cover`, c'est celui du carrousel
 * (la transition image → page projet est alors parfaitement fluide).
 */

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Project {
  slug: string;
  /** Nom affiché (mis en majuscules par le CSS dans la liste) */
  name: string;
  tagline: string;
  /** Lien du bouton LINK (repo GitHub) */
  url: string;
  /** Image du carrousel + première image de la page projet */
  cover: ProjectImage;
  /** Images qui suivent (captures du site…), dans l'ordre de la page */
  gallery: ProjectImage[];
}

const img = (
  slug: string,
  file: string,
  width: number,
  height: number,
  alt: string,
): ProjectImage => ({ src: `/projects/${slug}/${file}`, width, height, alt });

export const projects: Project[] = [
  {
    slug: 'ohmyfood',
    name: 'Ohmyfood',
    tagline: 'Améliorez l’interface d’un site mobile avec des animations CSS',
    url: 'https://github.com/Bronx-AR/Ohmyfood',
    cover: img('ohmyfood', 'cover.webp', 1200, 800, 'Ohmyfood — table dressée dans un restaurant'),
    gallery: [
      img('ohmyfood', '01.webp', 1200, 1800, 'Ohmyfood — page d’accueil'),
      img('ohmyfood', '02.webp', 1200, 1500, 'Ohmyfood — page restaurant'),
    ],
  },
  {
    slug: 'nina',
    name: 'Nina',
    tagline: 'Débuggez et optimisez un site de photographe',
    url: 'https://github.com/Bronx-AR/Nina-Carducci',
    cover: img('nina', 'cover.webp', 1200, 800, 'Nina Carducci — photographie'),
    gallery: [
      img('nina', '01.webp', 1200, 1800, 'Nina — page d’accueil'),
      img('nina', '02.webp', 1200, 1500, 'Nina — galerie'),
    ],
  },
  {
    slug: 'booki',
    name: 'Booki',
    tagline: 'Transformez une maquette en site web avec HTML & CSS',
    url: 'https://github.com/Bronx-AR/Booki',
    cover: img('booki', 'cover.webp', 1200, 800, 'Booki — chambre d’hôtel'),
    gallery: [
      img('booki', '01.webp', 1200, 1800, 'Booki — page d’accueil'),
      img('booki', '02.webp', 1200, 1500, 'Booki — fiche hébergement'),
    ],
  },
  {
    slug: 'sophie',
    name: 'Sophie',
    tagline: 'Créez une page web dynamique avec JavaScript',
    url: 'https://github.com/Bronx-AR/Sophie-Bluel',
    cover: img('sophie', 'cover.webp', 1200, 800, 'Sophie Bluel — architecture d’intérieur'),
    gallery: [
      img('sophie', '01.webp', 1200, 1800, 'Sophie — portfolio'),
      img('sophie', '02.webp', 1200, 1500, 'Sophie — mode édition'),
    ],
  },
  {
    slug: 'kasa',
    name: 'Kasa',
    tagline: 'Développez une application web avec React et React Router',
    url: 'https://github.com/Bronx-AR/Kasa',
    cover: img('kasa', 'cover.webp', 1200, 800, 'Kasa — location d’appartements'),
    gallery: [
      img('kasa', '01.webp', 1200, 1800, 'Kasa — page d’accueil'),
      img('kasa', '02.webp', 1200, 1500, 'Kasa — fiche logement'),
    ],
  },
  {
    slug: '724-events',
    name: '724 Events',
    tagline: 'Débuggez et testez une application React',
    url: 'https://github.com/Bronx-AR/724-events',
    cover: img('724-events', 'cover.webp', 1200, 800, '724 Events — événements'),
    gallery: [
      img('724-events', '01.webp', 1200, 1800, '724 Events — page d’accueil'),
      img('724-events', '02.webp', 1200, 1500, '724 Events — agenda'),
    ],
  },
  {
    slug: 'print-it',
    name: 'Print-it',
    tagline: 'Dynamisez une page web avec des animations JavaScript',
    url: 'https://github.com/Bronx-AR/Print-it',
    cover: img('print-it', 'cover.webp', 1200, 800, 'Print-it — imprimerie'),
    gallery: [
      img('print-it', '01.webp', 1200, 1800, 'Print-it — bannière'),
      img('print-it', '02.webp', 1200, 1500, 'Print-it — page complète'),
    ],
  },
  {
    slug: 'argent-bank',
    name: 'Argent Bank',
    tagline: 'Utilisez une API pour un compte utilisateur bancaire avec React',
    url: 'https://github.com/Bronx-AR/Argent-Bank',
    cover: img('argent-bank', 'cover.webp', 1200, 800, 'Argent Bank — banque en ligne'),
    gallery: [
      img('argent-bank', '01.webp', 1200, 1800, 'Argent Bank — connexion'),
      img('argent-bank', '02.webp', 1200, 1500, 'Argent Bank — tableau de bord'),
    ],
  },
];
