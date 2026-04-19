import { SHINOBI_IMAGES } from './assetRegistry';

export const DOSSIER_ASSETS = {
  hero: SHINOBI_IMAGES.hero,
  backgroundVideo: SHINOBI_IMAGES.videoBg,
  jitsu: SHINOBI_IMAGES.sections.game,
  chidori: SHINOBI_IMAGES.sections.anime,
  fullTeam: SHINOBI_IMAGES.sections.special,
  alliances: {
    kakashi: SHINOBI_IMAGES.ninjas[0],
    guy: SHINOBI_IMAGES.ninjas[1],
    naruto: SHINOBI_IMAGES.ninjas[2],
    sord: SHINOBI_IMAGES.ninjas[3],
    lee: SHINOBI_IMAGES.ninjas[4],
    kiba: SHINOBI_IMAGES.ninjas[5],
    hinata: SHINOBI_IMAGES.ninjas[6],
    sai: SHINOBI_IMAGES.ninjas[7],
    asuma: SHINOBI_IMAGES.ninjas[8],
    shino: SHINOBI_IMAGES.ninjas[9],
    sakura: SHINOBI_IMAGES.ninjas[10],
    tsunade: SHINOBI_IMAGES.ninjas[11],
    tenten: SHINOBI_IMAGES.ninjas[12],
    kurenai: SHINOBI_IMAGES.ninjas[13],
    joji: SHINOBI_IMAGES.ninjas[14],
    abubakar: SHINOBI_IMAGES.ninjas[15],
  },
  ornaments: {
    sai: SHINOBI_IMAGES.ornaments.ornament1,
    kakashiReading: SHINOBI_IMAGES.ornaments.ornament2,
    narutoJitsu: SHINOBI_IMAGES.ornaments.ornament3,
    konohamaru: SHINOBI_IMAGES.ornaments.ornament5,
    narutoSuit: SHINOBI_IMAGES.ornaments.ornament2,
    rockLee: SHINOBI_IMAGES.ornaments.ornament1,
    itachiSasuke: SHINOBI_IMAGES.ornaments.ornament3,
    narutoShikamaru: SHINOBI_IMAGES.ornaments.ornament5,
    neji: SHINOBI_IMAGES.ornaments.ornament1,
    chojiKiba: SHINOBI_IMAGES.ornaments.ornament2,
    frog: SHINOBI_IMAGES.ornaments.ornament3,
  }
};

export const MANGA_CALLOUTS = [
  { id: 1, image: SHINOBI_IMAGES.sections.goods, text: "GEAR_LOADOUT", pos: "top-1/4 left-5" },
  { id: 2, image: SHINOBI_IMAGES.sections.event, text: "FIELD_REPORT", pos: "top-1/2 right-0" },
  { id: 3, image: SHINOBI_IMAGES.sections.special, text: "ELITE_SQUAD", pos: "bottom-1/4 left-10" },
];

export const STORY_SECTIONS = [
  {
    id: "identity",
    title: "SHINOBI_PROFILE",
    label: "CLASSIFIED",
    tags: ["LEAF_VILLAGE", "JONIN_RANK"],
    content: "Abubakar Habib. A high-rank architect operating within the digital shadows of Konohagakure. Specializing in the manifestation of complex system jutsu and the fluid control of multi-threaded state. An expert in tactical debugging and the strategic deployment of the Shadow Clone Integration technique.",
    image: SHINOBI_IMAGES.sections.anime
  },
  {
    id: "origin",
    title: "THE_ACADEMY_GRIND",
    label: "DATA_ROOTS",
    tags: ["HTML_SEALS", "CSS_HAND_SIGNS"],
    content: "The journey began in the fundamental arts. Mastering the core seals of the web. It was through relentless determination and a rogue developer's fire that the Nara Clan's tactical intellect was forged into a professional-grade arsenal.",
    image: SHINOBI_IMAGES.sections.comics
  },
  {
    id: "affinities",
    title: "ELEMENTAL_ARSENAL",
    label: "CHAKRA_FLOW",
    tags: ["PERFORMANCE", "SCALABILITY"],
    content: "An operative's efficiency is determined by their elemental alignment. Through mastery of Lightning and Water Release, Habib achieves unmatched speed in optimization and fluid movement across distributed architectures.",
    types: [
      { element: "Lightning Release", skill: "Performance Engine", level: 95 },
      { element: "Water Release", skill: "State Fluidity", level: 92 },
      { element: "Earth Release", skill: "Backend Foundations", level: 88 },
      { element: "Fire Release", skill: "Deployment Pipelines", level: 90 }
    ],
    image: SHINOBI_IMAGES.sections.game
  },
  {
    id: "missions",
    title: "MISSION_LOG",
    label: "S_RANK_OPS",
    tags: ["GLOBAL_SCALE", "CRITICAL_PATH"],
    content: "A summary of the most demanding engagements. These S-rank missions required the full breadth of the technical scroll, often involving Cross-Village collaboration under high-stakes conditions.",
    missions: [
      { title: "Project: Global Nexus", rank: "S-Rank", description: "Architected a real-time communication platform for 1M+ active shinobi using high-speed WebSocket jitsu." },
      { title: "Scroll of Infinite Scroll", rank: "A-Rank", description: "Developed a virtualized list component capable of rendering 100k+ data nodes without performance lag." },
      { title: "Operation: Dark Mode Siege", rank: "B-Rank", description: "Refactored legacy UI systems into modern, design-token driven architectures." }
    ],
    image: SHINOBI_IMAGES.sections.news
  }
];
    missions: [
      { title: "Project: Global Nexus (S-Rank)", rank: "S-Rank", description: "Architected a real-time communication platform for 1M+ active shinobi using high-speed WebSocket jitsu." },
      { title: "Scroll of Infinite Scroll (A-Rank)", rank: "A-Rank", description: "Developed a virtualized list component capable of rendering 100k+ data nodes without performance lag." },
      { title: "Operation: Dark Mode Siege (B-Rank)", rank: "B-Rank", description: "Refactored legacy UI systems into modern, design-token driven architectures." }
    ],
    image: SHINOBI_IMAGES.sections.news
  }
];
