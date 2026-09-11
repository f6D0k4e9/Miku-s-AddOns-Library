const allAddonImages = import.meta.glob<{ default: string }>('/src/addons/*/*.{png,jpg,jpeg,webp}', { eager: true });

export function getCoverForAddon(slug: string): string {
  // Find the first matching image inside the addon's folder
  const matchingPath = Object.keys(allAddonImages).find((path) => path.includes(`/addons/${slug}/`));
  if (matchingPath && allAddonImages[matchingPath]) {
    return allAddonImages[matchingPath].default;
  }
  // Fallback placeholder if no image is found yet
  return `https://placehold.co/600x400/0ea5e9/ffffff?text=${slug}`;
    }
