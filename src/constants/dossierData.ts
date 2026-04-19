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
    sasuke: SHINOBI_IMAGES.ninjas[3],
    lee: SHINOBI_IMAGES.ninjas[4],
    kiba: SHINOBI_IMAGES.ninjas[5],
    hinata: SHINOBI_IMAGES.ninjas[6],
    shikamaru: SHINOBI_IMAGES.ninjas[7],
    itachi: SHINOBI_IMAGES.ninjas[8],
    neji: SHINOBI_IMAGES.ninjas[9],
    sakura: SHINOBI_IMAGES.ninjas[10],
    gaara: SHINOBI_IMAGES.ninjas[11],
    tenten: SHINOBI_IMAGES.ninjas[12],
    ino: SHINOBI_IMAGES.ninjas[13],
    choji: SHINOBI_IMAGES.ninjas[14],
    jiraiya: SHINOBI_IMAGES.ninjas[15],
    tsunade: SHINOBI_IMAGES.ninjas[16],
    orochimaru: SHINOBI_IMAGES.ninjas[17],
    minato: SHINOBI_IMAGES.ninjas[18],
    kushina: SHINOBI_IMAGES.ninjas[19],
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

export const STORY_SECTIONS = [
  {
    id: "identity",
    title: "Shinobi Identity",
    content: "Abubakar Habib. A Jōnin-level architect operating within the Digital Konohagakure network. Tasked with the design of high-concurrency tactical systems and the manifestation of fluid user interfaces. Known for extreme precision in debugging and the strategic application of the Shadow Clone Integration technique.",
    image: SHINOBI_IMAGES.sections.anime
  },
  {
    id: "origin",
    title: "The Code Academy",
    content: "Before the high-rank missions, there was the grind of the fundamental arts. Mastering the HTML seals and the CSS hand signs. It was here that the initial fire of the Nara Clan intellect met the tireless determination of a rogue dev in the making.",
    image: SHINOBI_IMAGES.sections.comics
  },
  {
    id: "affinities",
    title: "Elemental Mastery",
    content: "Affinities determine the strength of an operative's code. Lightning Release yields unmatched performance optimization, while Water Release ensures the fluid movement of state across complex application branches.",
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
    title: "Legendary Logbook",
    content: "A summary of the most critical engagements. Many of these missions required the full breadth of the Technical Arsenal, often involving multi-village collaboration and high-stakes deadlines.",
    missions: [
      { title: "Project: Global Nexus (S-Rank)", rank: "S-Rank", description: "Architected a real-time communication platform for 1M+ active shinobi using high-speed WebSocket jitsu." },
      { title: "Scroll of Infinite Scroll (A-Rank)", rank: "A-Rank", description: "Developed a virtualized list component capable of rendering 100k+ data nodes without performance lag." },
      { title: "Operation: Dark Mode Siege (B-Rank)", rank: "B-Rank", description: "Refactored legacy UI systems into modern, design-token driven architectures." }
    ],
    image: SHINOBI_IMAGES.sections.news
  }
];
