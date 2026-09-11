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
    slug: 'villager-news',
    title: 'VILLAGER NEWS 1.0',
    author: 'Oreville Studios',
    category: 'Add-ons',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'https://rkns.link/or4k7',
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
  {
    id: '2',
    slug: 'actions-and-stuff',
    title: 'Actions & Stuff 1.11',
    author: 'Oreville Studios',
    category: 'Textures',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'https://rkns.link/jq1uj',
    fileSize: '18.20 MB',
    description: [
      'Enhance player animations and interactive world elements seamlessly with standard performance optimizations.',
    ],
  },
];
