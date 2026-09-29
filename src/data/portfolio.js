// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  firstName: "Abraham",
  lastName: "Iborida",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full-Stack Software Engineer",
  tagline:
    "Fintech engineer with 4+ years shipping production mobile banking and payment systems across African markets.",
  // Short opening line under the name on the hero.
  intro:
    "Thousands of hours building, shipping and debugging production systems. I know how they work, and how they break.",
  location: "Lagos, Nigeria",
  timeZone: "Africa/Lagos",
  available: true,
  email: "abrahamiborida@gmail.com",
  github: "https://github.com/olaore66",
  photo: "/abraham-iborida.jpg",
  photoCasual: "/abraham-iborida-casual.webp",
  resumeUrl: "/Abraham_Iborida_CV.pdf",
  // Add your profiles here, e.g. { label: "LinkedIn", href: "https://linkedin.com/in/..." }
  socials: [
    { label: "GitHub", href: "https://github.com/olaore66" },
    { label: "Email", href: "mailto:abrahamiborida@gmail.com" },
    { label: "Résumé", href: "/Abraham_Iborida_CV.pdf" },
  ],
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "FAQ", href: "/about#faq" },
  { label: "Contact", href: "#contact" },
];

// Options on the "Start a project" form (also validated server-side).
export const projectTypes = ["Mobile app", "Web app", "Backend / API", "Fintech integration", "Something else"];

export const about = {
  statement:
    "I've spent thousands of hours building, shipping and debugging production applications. If I had to sum it all up: I understand how systems work, and how they break. I bring that experience, and real care, to everything I build. I take ownership of the product like it's my own, so when I'm on your team, you get peace of mind.",
  detail:
    "I'm happiest bridging rigid legacy infrastructure with modern experiences: turning Temenos T24 core banking APIs into mobile-ready Experience APIs, designing internal ledgers that keep unit economics viable at scale, and building real-time systems for streaming and community platforms. I studied Computer Engineering at the Federal University of Technology, Minna.",
  stats: [
    { value: 4, suffix: "+", label: "Years shipping fintech" },
    { value: 3, label: "Countries on my banking apps" },
    { value: 99.9, decimals: 1, suffix: "%", label: "Uptime targets I build for" },
  ],
};

// Shown in the scrolling marquee.
export const stack = [
  "Flutter",
  "Spring Boot",
  "Java",
  "React Native",
  "Android SDK",
  "Microservices",
  "PostgreSQL",
  "NestJS",
  "Express JS",
  "Prisma",
  "Temenos T24",
  "Docker",
  "Supabase",
  "BaaS",
];

// Skills section, grouped as on the CV.
export const skills = [
  {
    group: "Mobile",
    items: ["Flutter", "Android SDK", "React Native", "Temenos Quantum Visualizer"],
  },
  {
    group: "Backend",
    items: ["Java", "Spring Boot", "System Design", "Debugging", "Express JS", "REST APIs", "Microservices", "Prisma", "Supabase"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MySQL", "MSSQL"],
  },
  {
    group: "Infrastructure & Tools",
    items: ["Docker", "Git", "Render", "Postman", "Figma"],
  },
  {
    group: "Fintech",
    items: [
      "Temenos T24",
      "Core Banking Integration",
      "BaaS",
      "Payment Gateways",
      "Biller Aggregators",
      "Biometric Authentication",
      "KYC / Compliance",
    ],
  },
];

export const services = [
  {
    title: "Mobile Engineering",
    description:
      "Production mobile banking apps with onboarding, payments, biometric authentication and dashboards, delivered pixel-accurate from Figma.",
    tools: ["Flutter", "Android SDK", "React Native", "Temenos Quantum"],
  },
  {
    title: "Backend & Microservices",
    description:
      "Transaction orchestration, system design and REST APIs tuned for throughput, response time and 99.9% uptime.",
    tools: ["Java", "Spring Boot", "Express JS", "NestJS", "Prisma"],
  },
  {
    title: "Fintech & Core Banking",
    description:
      "Core banking integration, internal ledgers, BaaS, biller aggregators and KYC flows that move real money safely.",
    tools: ["Temenos T24", "BaaS", "Payment Gateways", "KYC / Compliance"],
  },
  {
    title: "Data & Infrastructure",
    description:
      "Well-modelled databases and containerised deployments that keep shipping boring and reliable.",
    tools: ["PostgreSQL", "MySQL", "MSSQL", "Docker", "Render", "Supabase"],
  },
];

// `theme` picks the card colour: "surf", "alabaster" or "steel".
// Add `live` / `repo` URLs to make a card clickable; `liveLabel` renames the live link.
// `image` fills the panel. `imageFit: "contain"` shows a transparent device mockup uncropped;
// `imageFit: "banner"` shows a full rectangular graphic with rounded corners (needs `imageSize: [w, h]`).
export const projects = [
  {
    title: "Wisemonie",
    year: "2025",
    category: "Fintech · Mobile + Backend",
    role: "Product Engineer, end to end",
    description:
      "A behavioural money-discipline app. Money sits in structured envelopes and is released to your spendable balance on schedules you set, with airtime, data, electricity and TV bills paid straight from envelopes. Internal-ledger releases cost zero per transaction, keeping unit economics viable at scale.",
    tags: ["Flutter", "Spring Boot", "PostgreSQL", "BaaS"],
    image: "/projects/wisemonie.png",
    imageFit: "banner",
    imageSize: [832, 406],
    live: "https://play.google.com/store/apps/developer?id=Wisemonie",
    liveLabel: "Google Play",
    repo: null,
    theme: "surf",
  },
  {
    title: "KinoxPlus",
    year: "2026",
    category: "Streaming · Real-time Backend",
    role: "Backend Engineer",
    description:
      "A digital entertainment platform built around synced Watch Rooms, where friends stream the same film in lockstep with live voice and text chat. Server-authoritative playback sync, WebRTC voice and a stateless API that scales horizontally.",
    tags: ["NestJS", "Prisma", "PostgreSQL", "Redis", "Socket.io", "LiveKit"],
    image: "/projects/kinoxplus.webp",
    imageFit: "banner",
    imageSize: [1854, 785],
    live: "https://www.kinoxplus.com/",
    liveLabel: "Visit site",
    repo: null,
    theme: "alabaster",
  },
  {
    title: "DGC Global",
    year: "2026",
    category: "Community · Messaging + Live Audio",
    role: "Backend Engineer",
    description:
      "A faith-community platform for a multi-branch church across Nigeria and beyond: WhatsApp-style messaging, Clubhouse-style live audio rooms and a 10-stage member growth pipeline, on a real-time backend built for 10k users.",
    tags: ["TypeScript", "Express", "Prisma", "Socket.io", "Redis", "BullMQ"],
    image: "/projects/dgc-global.png",
    imageFit: "banner",
    imageSize: [832, 406],
    live: "https://play.google.com/store/apps/details?id=com.dgc.app",
    liveLabel: "Google Play",
    repo: null,
    theme: "steel",
  },
  {
    title: "Tier-1 Mobile Banking",
    year: "2024",
    category: "Banking · Mobile + Experience APIs",
    role: "Senior Technical Consultant",
    description:
      "Mobile banking apps for tier-1 banks in Burkina Faso, Ethiopia and The Gambia. Temenos T24 core banking APIs were reshaped into mobile-first Experience APIs, powering payments, onboarding and biometric login at high volume.",
    tags: ["Flutter", "Spring Boot", "Temenos T24", "Microservices"],
    image: "/projects/tier1-mobile-banking.png",
    imageFit: "contain", // show the whole mockup instead of filling the panel
    live: "https://play.google.com/store/apps/details?id=com.vistaOnlineMobile.mz",
    liveLabel: "Google Play",
    repo: null,
    theme: "surf",
  },
];

export const experience = [
  {
    company: "Wisemonie",
    role: "Product Engineer",
    period: "2025 - Now",
    location: "Nigeria",
    description:
      "Built a behavioural money-discipline product end to end (Flutter app, Spring Boot backend, PostgreSQL and BaaS), including time-anchored envelope releases and in-app bill payments.",
  },
  {
    company: "Techmaestrogroup Global Consult",
    role: "Senior Technical Consultant",
    period: "2024 - 2026",
    location: "Nigeria",
    description:
      "Architected mobile banking apps for tier-1 banks in three countries, turned Temenos T24 APIs into mobile Experience APIs, and optimised Spring Boot microservices for 99.9% uptime.",
  },
  {
    company: "ITSS Nigeria",
    role: "Associate Consultant",
    period: "2023 - 2024",
    location: "Nigeria",
    description:
      "Developed enterprise fintech apps with Temenos Quantum Visualizer, Spring Boot and MySQL; built REST APIs and production UI from Figma designs.",
  },
];

// The /about page.
export const aboutPage = {
  intro:
    "I'm Abraham, a full-stack software engineer from Lagos. I build products people depend on with their money and their time, and I treat every one of them like it's my own.",
  story: [
    "I studied Computer Engineering at the Federal University of Technology, Minna, and started my career at ITSS Nigeria building enterprise fintech apps with Temenos Quantum Visualizer, Spring Boot and MySQL.",
    "At Techmaestrogroup I moved up to Senior Technical Consultant, architecting mobile banking apps for tier-1 banks in Burkina Faso, Ethiopia and The Gambia, and turning rigid Temenos T24 core banking APIs into fast, mobile-ready Experience APIs.",
    "Today I'm the product engineer behind Wisemonie, a money-discipline app I've built end to end, from the Flutter app to the Spring Boot backend and ledger. I also build real-time backends for products like KinoxPlus and DGC Global.",
  ],
  values: [
    {
      title: "Ownership",
      text: "I care about the outcome, not just the ticket. If something I built breaks at 2am, it's my problem too.",
    },
    {
      title: "Reliability",
      text: "Thousands of hours of debugging taught me how systems fail. I design so they don't, and recover fast when they do.",
    },
    {
      title: "Clarity",
      text: "Clear scope, honest timelines and regular updates. You always know where your product stands.",
    },
  ],
  facts: [
    { label: "Based in", value: "Lagos, Nigeria (WAT)" },
    { label: "Experience", value: "4+ years in production fintech" },
    { label: "Education", value: "B.Eng. Computer Engineering, FUT Minna" },
    { label: "Focus", value: "Mobile, backend and fintech systems" },
  ],
};

// FAQ section on the About page.
export const faqs = [
  {
    question: "What exactly do you do?",
    answer:
      "I'm a full-stack software engineer. I build mobile apps (Flutter, React Native), backends and APIs (Spring Boot, Node.js, NestJS), and the fintech plumbing that connects them: payments, bill payments, BaaS and core banking integrations. I can take a product from idea to launch, or join your team to strengthen one part of it.",
  },
  {
    question: "What kind of projects do you take on?",
    answer:
      "Mobile apps, web apps, backend systems and APIs, and fintech integrations. I'm especially strong where money and reliability matter: banking apps, wallets, budgeting and payment products, and real-time systems like chat, live audio and watch-together streaming.",
  },
  {
    question: "Can you work on an existing app or codebase?",
    answer:
      "Yes. A lot of my work is improving systems that already exist: fixing stubborn bugs, speeding up slow apps and APIs, modernising legacy integrations and adding new features without breaking what already works.",
  },
  {
    question: "Do you have fintech and banking experience?",
    answer:
      "Yes, it's my core domain. I've built mobile banking apps for tier-1 banks in three countries, integrated Temenos T24, BaaS providers, payment gateways and biller aggregators, and built KYC and biometric authentication flows. I work closely with your compliance team and licensed partners.",
  },
  {
    question: "Do you work with clients outside Nigeria?",
    answer:
      "Yes. I'm based in Lagos (West Africa Time) and have shipped products used in Burkina Faso, Ethiopia and The Gambia. I'm comfortable working remotely across time zones with async updates and scheduled calls.",
  },
  {
    question: "How do we get started?",
    answer:
      "Click \"Hire me\" and tell me about your project. We'll have a short call to understand your goals, then I'll send a clear scope, timeline and estimate. Once we agree, I start building and keep you updated at every step.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "It depends on the scope. A focused feature or fix costs far less than a full product build. After our first conversation I'll give you a clear estimate, with no surprises later.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I don't disappear after shipping. I can stay on for support, monitoring, bug fixes and new features, so your product keeps running smoothly as it grows.",
  },
];
