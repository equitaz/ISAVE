export type Service = {
  num: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: "event" | "stream" | "rental" | "studio" | "support" | "management";
};

export const services: Service[] = [
  {
    num: "01",
    title: "Event AV Production",
    desc: "Complete audio visual setup and technical production for live events.",
    bullets: ["Conferences", "Corporate events", "Weddings", "Product launches", "Private events"],
    icon: "event",
  },
  {
    num: "02",
    title: "Livestream & Hybrid Events",
    desc: "Professional livestreaming and virtual event support for online and hybrid audiences.",
    bullets: ["Livestream webcasts", "Virtual meetings", "Multi-camera production", "Audio and video support", "Technical operators"],
    icon: "stream",
  },
  {
    num: "03",
    title: "AV Equipment Rental",
    desc: "Professional AV equipment delivered, configured and ready for your event.",
    bullets: ["Sound systems", "Projectors and screens", "Video walls", "Lighting and staging", "Interactive technology"],
    icon: "rental",
  },
  {
    num: "04",
    title: "Studio & Content Production",
    desc: "Studio services for business content, recordings and media production.",
    bullets: ["Voiceovers", "Business videos", "Training videos", "Commercial production", "Video editing"],
    icon: "studio",
  },
  {
    num: "05",
    title: "Technical Event Support",
    desc: "Experienced technical staff and event support for smooth productions.",
    bullets: ["AV technicians", "Event setup", "On-site operation", "DJs and speakers", "Production crew"],
    icon: "support",
  },
  {
    num: "06",
    title: "Full-Service Event Management",
    desc: "Complete planning, coordination and production support for events that need to run smoothly from start to finish.",
    bullets: ["Event planning support", "Venue coordination", "Run-of-show management", "Speaker & talent support", "On-site event staff"],
    icon: "management",
  },
];

export const heroCards = services.map((s) => ({
  num: s.num,
  title: s.title,
  desc: s.desc,
  icon: s.icon,
}));
