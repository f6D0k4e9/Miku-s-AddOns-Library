const allAddonImages = import.meta.glob<{ default: string }>('/src/addons/*/*.{png,jpg,jpeg,webp}', { eager: true });

export function getAddonFolderImages(slug: string): string[] {
  return Object.keys(allAddonImages)
    .filter((path) => path.includes(`/addons/${slug}/`))
    .map((path) => allAddonImages[path].default);
}

export function getCoverForAddon(slug: string): string {
  const images = getAddonFolderImages(slug);
  return images[0] || '';
}
