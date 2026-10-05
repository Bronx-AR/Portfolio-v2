/**
 * Échelle de base appliquée aux images du carrousel (elle laisse de la marge
 * pour l'effet de parallaxe sans jamais montrer les bords de l'image).
 */
export const CAROUSEL_IMAGE_SCALE = 1.14;

/**
 * Clone visuellement une image (carrousel ou hero de la page projet) dans le
 * calque de transition global. Ce clone survit au changement de page : c'est lui
 * qui « voyage » d'une page à l'autre pendant que le reste s'efface.
 */
export function createSharedClone(source: HTMLElement, layer: HTMLElement): HTMLElement | null {
  const img = source.querySelector('img');
  if (!img) return null;

  const rect = source.getBoundingClientRect();
  const clone = document.createElement('div');
  clone.className = 'shared-clone';
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;

  const copy = document.createElement('img');
  copy.alt = '';
  copy.decoding = 'sync';
  copy.src = img.currentSrc || img.src;

  // On reprend l'échelle / le décalage de parallaxe en cours pour éviter tout « saut »
  const transform = getComputedStyle(img).transform;
  if (transform && transform !== 'none') copy.style.transform = transform;

  clone.appendChild(copy);
  layer.appendChild(clone);
  return clone;
}
