export interface AddonItem {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: 'Add-ons' | 'Textures' | 'Scripting API' | 'World';
  verifiedBy: string;
  downloadUrl: string;
  fileSize: string;
  youtubeVideoId?: string;
  description: string[];
}

export const ADDONS_DATA: AddonItem[] = [
  {
    id: '1',
    slug: 'actions-and-stuff',
    title: 'Actions & Stuff 1.11',
    author: 'Oreville Studios',
    category: 'Textures',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'https://rkns.link/7h6xf',
    fileSize: '66.20 MB',
    youtubeVideoId: 'VDk8niB2Obw',
    description: [
      "The Animation Pack You Didn't Know You Needed: Bring your world to life with new animations, particles, textures, and more!",
      '',
      '- Player Animations (1st & 3rd Person)',
      '- New & Improved Mob Animations',
      '- 3D Item Models',
      '- Custom Armour',
      '- A Complete & Faithful Texture Overhaul',
      '- Compatible with Vanilla textures, or your own texture packs',
      '- Now with 100% more Vibrant Visuals',
    ],
  },
  {
    id: '2',
    slug: 'villager-news',
    title: 'VILLAGER NEWS 1.0',
    author: 'Oreville Studios',
    category: 'Add-ons',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'https://rkns.link/h59ap',
    fileSize: '40.52 MB',
    youtubeVideoId: 'AWLJGHCaDpc',
    description: [
      'BREAKING NEWS! Villager News is live in an official Oreville Studios x Element Animation collaboration! Bring your Villagers to life today!',
      '- 2,000+ voiced reactions!',
      '- Reactive dialogue to mobs, blocks, player actions and more!',
      '- Expressive animations & lip sync!',
      '- Player reputation & gossip systems!',
      '- Special characters & unique trades!',
    ],
  },
];
