export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  body: string;
  highlights: string[];
  tech: string[];
  status?: "IN DEVELOPMENT" | "RESEARCH DIRECTION" | "SHIPPED";
  featured?: boolean;
  links: {
    demo?: string;
    repo?: string;
  };
};

export const projects: Project[] = [
  {
    id: "autobill",
    index: "01",
    title: "AutoBill",
    category: "Mobile app · Business tools",
    year: "2025",
    summary:
      "A mobile invoicing app built to make everyday business record-keeping simpler.",
    body: "AutoBill lets a small business create invoices, organise customer and service details, export PDFs, and share invoices directly through WhatsApp — turning a paper-and-receipts workflow into something that fits in a pocket.",
    highlights: [
      "Built with React Native and Expo.",
      "Invoice generation with reusable customer and service records.",
      "PDF export and direct WhatsApp sharing.",
      "Sales totals and searchable records.",
    ],
    tech: ["React Native", "Expo", "JavaScript", "PDF", "WhatsApp API"],
    status: "SHIPPED",
    featured: true,
    links: {},
  },
  {
    id: "palettesnap",
    index: "02",
    title: "PaletteSnap",
    category: "Full-stack · Image processing",
    year: "2025",
    summary:
      "A web app that extracts usable colour palettes from any image.",
    body: "PaletteSnap pairs an interactive frontend with a Python backend and image-processing techniques to identify representative colours from a photo, so designers can pull a palette they can actually use.",
    highlights: [
      "React and Vite frontend.",
      "FastAPI backend.",
      "Colour extraction using K-Means clustering.",
      "Pillow and scikit-learn for image handling.",
      "Playwright for browser-based automation and testing.",
    ],
    tech: ["React", "Vite", "FastAPI", "Python", "scikit-learn", "Pillow"],
    status: "SHIPPED",
    links: {},
  },
  {
    id: "securevault",
    index: "03",
    title: "SecureVault",
    category: "Security · Web application",
    year: "2025",
    summary:
      "A secure file-sharing project built around encrypted uploads and controlled access.",
    body: "SecureVault makes file sharing more deliberate: uploads are encrypted at rest, download links expire, and integrity is verified. It is a study in applying cryptography to a real workflow rather than a layer of buzzwords.",
    highlights: [
      "PHP and MySQL backend.",
      "AES-256 encryption for stored files.",
      "Expiring download links.",
      "SHA-256 integrity checks.",
    ],
    tech: ["PHP", "MySQL", "AES-256", "SHA-256"],
    status: "SHIPPED",
    links: {},
  },
  {
    id: "ascend",
    index: "04",
    title: "Ascend",
    category: "Full-stack · Authentication",
    year: "2025",
    summary:
      "A web application concept centred on accounts, referral tracking, and user activity.",
    body: "Ascend combines a modern frontend with an API-driven backend and careful authentication workflows — short-lived access tokens, refresh tokens, CSRF protection, and rate limiting — wrapped around a referral leaderboard.",
    highlights: [
      "React frontend.",
      "FastAPI backend.",
      "Short-lived access tokens and refresh tokens.",
      "CSRF protection and rate limiting.",
      "Referral leaderboard.",
    ],
    tech: ["React", "FastAPI", "JWT", "Python"],
    status: "SHIPPED",
    links: {},
  },
  {
    id: "cinvault",
    index: "05",
    title: "CinVault",
    category: "Web app · API integration",
    year: "2024",
    summary:
      "A movie discovery app designed to make browsing film information feel simple and engaging.",
    body: "CinVault is built with Next.js on top of the TMDB API, focused on presenting movies clearly — discovery, detail, and a responsive interface that gets out of the way of the content.",
    highlights: [
      "Next.js application.",
      "TMDB API integration.",
      "Movie discovery and presentation.",
      "Responsive interface.",
    ],
    tech: ["Next.js", "React", "TMDB API", "CSS"],
    status: "SHIPPED",
    links: {},
  },
  {
    id: "sugarcane-ai",
    index: "06",
    title: "Sugarcane AI",
    category: "AI/ML · Agriculture · Research",
    year: "2026",
    summary:
      "An ongoing final-year research direction exploring how computer vision and decision-support tools could help monitor sugarcane health in Punjab, Pakistan.",
    body: "This is a research direction, not a finished product. The aim is to explore how computer vision, crop and weather information, and accessible interfaces could combine to support sugarcane monitoring — the areas below are questions being investigated, not delivered results.",
    highlights: [
      "Sugarcane disease classification (proposed).",
      "Crop and pest risk assessment (proposed).",
      "Weather-informed decision support (proposed).",
      "Accessible interfaces for agricultural users (proposed).",
    ],
    tech: ["Python", "Computer Vision", "scikit-learn", "Data Analysis"],
    status: "RESEARCH DIRECTION",
    links: {},
  },
];
