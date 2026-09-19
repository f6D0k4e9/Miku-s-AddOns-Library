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
    slug: 'ai-players',
    title: 'Ai Players',
    author: 'Gamemode One',
    category: 'Add-ons',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'https://lootdest.org/s?2Z7x3Qt1&data=izvmwQjazLPdLxMBV9Fa7Vcz0buQjI2qGbwRuMA1iNzu%2Bv//0S3mORwvhaMBLN4vxvKIUeF8agRuYHyz4ARgSbrFszXrEWjL8hAhmXqKc/YQCH2Enzf6fArb3N3wJkwNyPLRAw9IYvGeXhA/mqoT4g%2Bc7CEQudRCTYkJQ7zSD8fNUX5dnr1wJzmLRQxROmVlWDcu8bOq%2BNJob/PdLROS5XwG913Hmh8ZW5VPqkny8tc%3D',
    fileSize: '3.89 MB',
    youtubeVideoId: '7QB79siPigY',
    description: [
      'Invite AI players into your world, and meet your new instant friends. They chop wood, mine, explore, and fight off hostile mobs right alongside you.',
      "AI Players bring a new way to experience multiplayer. All the joy, chaos, and progression even when you're offline!",
      "They're always down for adventure. What stories will you create together?",
      'Made by humans.',
    ],
  },
  {
    id: '2',
    slug: 'villager-news',
    title: 'VILLAGER NEWS 1.0',
    author: 'Oreville Studios',
    category: 'Add-ons',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'Https://lootdest.org/s?qEN2051H&data=x5flk9Et2X1UhImGVD3iQQjFOSHdkxD8vEKP%2BUWCNWYOZUpq6Q423e1VobId0FSz%2B1qgvQ7oJLf55DyRBMUUZQ%3D%3D',
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
    id: '3',
    slug: 'immersive-interfaces-bedrock',
    title: 'Immersive Interfaces Bedrock',
    author: 'Shrimp',
    category: 'Textures',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'https://rkns.link/64ag3',
    fileSize: '4.72 MB',
    youtubeVideoId: 'rrlF4t1oABI',
    description: [
      "Shrimp's Immersive Interfaces (often referred to simply as Immersive Interfaces) is a popular Java Edition resource pack designed to completely overhaul Minecraft's standard graphic user interface (GUI). It replaces the traditional, uniform grey menu boxes with rich, thematic, and contextual pixel-art designs that breathe personality and life into inventory management.",
      '',
      'Features',
      '- Contextual Pixel-Art Scenes: Replaces generic UI backgrounds with custom-tailored pixel art illustrations that reflect the specific block, workstation, or container you are interacting with.',
      "- Vanilla-Friendly Aesthetic: Maintains Minecraft's classic 16x charm and artistic integrity while making menus feel deeply integrated into the game world rather than floating flat overlays.",
      '- Thematic Workstation Revamps: Redesigns standard utility interfaces (such as crafting tables, furnaces, chests, and enchanting tables) to feature unique visual framing and tools matching their in-world purpose.',
      '- Extensive Mod Compatibility: Supports popular ecosystem additions and utility mods via community or official add-on packs (such as EMI, Farmer\'s Delight, and storage mods) to ensure a cohesive UI style across modded playthroughs.',
      '- Pure Resource Pack Design: Operates entirely client-side using vanilla resource pack formatting and core shaders, requiring no complex mod loaders or core mods to function smoothly.',
    ],
  },
  {
    id: '4',
    slug: 'shadow-company-v02',
    title: 'Shadow Company v0.2',
    author: 'Unknown',
    category: 'Add-ons',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'https://rkns.link/rul9c',
    fileSize: '58.61 MB',
    youtubeVideoId: 'JXA3ShN1PYI',
    description: [
      'Shadow Company v0.2 brings tactical military firepower and advanced weapon mechanics straight into Minecraft Bedrock Edition.',
      '',
      'Features',
      '- Dynamic Gun Sway Function: Immersive weapon movement physics that react fluidly as you move, aim, and look around.',
      '- Custom Scope Mechanism: Realistic ADS (Aim Down Sights) functionality with precision crosshairs and optical sights.',
      '- Modern Arsenal: A specialized collection of firearms equipped with custom animations, sound effects, and reload sequences.',
      '',
      'Included Guns & Items:',
      '- High-powered Assault Rifles & SMGs',
      '- Tactical Sidearms and Pistols',
      '- Custom Scopes and Optical Attachments',
      '- Military Gear and Ammunition items',
    ],
  },
  {
    id: '5',
    slug: 'actions-and-stuff',
    title: 'Actions & Stuff 1.11',
    author: 'Oreville Studios',
    category: 'Textures',
    verifiedBy: 'Miku AddOns',
    downloadUrl: 'https://links.lootlabs.gg/s?uaAEoFi3&data=izvmwQjazLPdLxMBV9Fa7Vcz0buQjI2qGbwRuMA1iNzu%2Bv//0S3mORwvhaMBLN4vxvKIUeF8agRuYHyz4ARgSbrFszXrEWjL8hAhmXqKc/YQCH2Enzf6fArb3N3wJkwNyPLRAw9IYvGeXhA/mqoT4g%2Bc7CEQudRCTYkJQ7zSD8fNUX5dnr1wJzmLRQxROmVlWDcu8bOq%2BNJob/PdLROS5ZluK6pyUJAYmHs%2B1n1H8Ww%3D',
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
];
