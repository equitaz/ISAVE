export type Project = {
  id: string;
  category: string;
  title: string;
  location: string;
  year: string;
  services: string[];
  description: string;
  accent: string;   // tailwind/hex accent used on the card
  icon: "event" | "stream" | "rental" | "studio" | "support";
};

export const projects: Project[] = [
  {
    id: "corporate-gala-2024",
    category: "Corporate Event",
    title: "Annual Leadership Gala",
    location: "Chicago, IL",
    year: "2024",
    services: ["Event Production", "Lighting & Staging", "Sound System"],
    description:
      "Full AV production for a 400-guest leadership gala — stage design, intelligent lighting rig, crystal-clear sound and live recording.",
    accent: "#2a9ffa",
    icon: "event",
  },
  {
    id: "medical-conference-2024",
    category: "Conference",
    title: "Sleep Apnea Awareness Day",
    location: "Chicago, IL",
    year: "2024",
    services: ["Filming", "AV Setup", "Livestream"],
    description:
      "AV and filming production for Hayat Home Medical Equipment's awareness event — multi-camera capture, screen management and webcast.",
    accent: "#ff9a0c",
    icon: "stream",
  },
  {
    id: "wedding-2024",
    category: "Wedding",
    title: "Private Wedding Reception",
    location: "Chicago Metropolitan Area",
    year: "2024",
    services: ["Sound System", "Lighting", "DJ Setup"],
    description:
      "Elegant wedding production with wireless sound, ambient uplighting, dynamic dance floor lighting and full DJ booth setup.",
    accent: "#2a9ffa",
    icon: "rental",
  },
  {
    id: "hybrid-summit-2023",
    category: "Hybrid Event",
    title: "Tech Industry Summit",
    location: "Chicago, IL",
    year: "2023",
    services: ["Livestream", "Multi-Camera", "Technical Support"],
    description:
      "150-person in-person summit with simultaneous webcast for 800+ virtual attendees — multi-camera production, real-time graphics and operator support.",
    accent: "#ff9a0c",
    icon: "stream",
  },
  {
    id: "studio-production-2023",
    category: "Studio Production",
    title: "Corporate Training Video Series",
    location: "ISAVE Studio, Chicago",
    year: "2023",
    services: ["Studio Recording", "Video Editing", "Voiceover"],
    description:
      "Eight-part training video series — studio setup, teleprompter, professional lighting, voiceover recording and post-production.",
    accent: "#2a9ffa",
    icon: "studio",
  },
  {
    id: "product-launch-2023",
    category: "Product Launch",
    title: "Product Reveal Event",
    location: "Chicago, IL",
    year: "2023",
    services: ["LED Video Wall", "Projection Mapping", "Sound Design"],
    description:
      "Dramatic product reveal with a 12m LED video wall, cinematic projection intro and immersive spatial audio — 250 press and VIP guests.",
    accent: "#ff9a0c",
    icon: "event",
  },
  {
    id: "nonprofit-gala-2023",
    category: "Non-Profit",
    title: "Charity Fundraising Evening",
    location: "Chicago, IL",
    year: "2023",
    services: ["AV Setup", "Presentation Support", "Recording"],
    description:
      "Seamless AV production for a high-profile charity gala — keynote presentation support, wireless mics, live audience recording.",
    accent: "#2a9ffa",
    icon: "support",
  },
  {
    id: "trade-show-2022",
    category: "Trade Show",
    title: "Industry Exhibition Booth",
    location: "McCormick Place, Chicago",
    year: "2022",
    services: ["Display Screens", "Audio", "Technical Staff"],
    description:
      "Multi-booth AV setup across a 3-day trade show — display screens, product demo audio and on-site technical crew throughout.",
    accent: "#ff9a0c",
    icon: "rental",
  },
];
