export type SkillItem = {
  name: string;
  level: number; // percentage (e.g. 90)
  iconKey: string;
};

export type SkillCategory = {
  id: string;
  index: string;
  title: string;
  description: string;
  skills: SkillItem[];
};

export const featuredTechPills: { name: string; iconKey: string; level: number; category: string }[] = [
  { name: "React", iconKey: "siReact", level: 92, category: "Frontend" },
  { name: "JavaScript", iconKey: "siJavascript", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", iconKey: "siTailwindcss", level: 95, category: "Frontend" },
  { name: "Python", iconKey: "siPython", level: 88, category: "Backend & AI" },
  { name: "FastAPI", iconKey: "siFastapi", level: 85, category: "Backend" },
  { name: "PostgreSQL", iconKey: "siPostgresql", level: 82, category: "Database" },
  { name: "scikit-learn", iconKey: "siScikitlearn", level: 80, category: "Machine Learning" },
  { name: "Git & GitHub", iconKey: "siGithub", level: 90, category: "Workflow" },
  { name: "C++", iconKey: "siCplusplus", level: 84, category: "Systems" },
  { name: "HTML5 / CSS3", iconKey: "siHtml5", level: 96, category: "Frontend" },
  { name: "PHP & MySQL", iconKey: "siPhp", level: 82, category: "Backend" },
  { name: "Linux / OS", iconKey: "siLinux", level: 85, category: "Systems" },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend & Interfaces",
    description: "Component architecture, fluid layouts, responsive styling, and modern design systems.",
    skills: [
      { name: "React", level: 92, iconKey: "siReact" },
      { name: "JavaScript", level: 90, iconKey: "siJavascript" },
      { name: "Tailwind CSS", level: 95, iconKey: "siTailwindcss" },
      { name: "HTML5 & CSS3", level: 96, iconKey: "siHtml5" },
      { name: "Bootstrap", level: 88, iconKey: "siBootstrap" },
      { name: "Figma UI/UX", level: 85, iconKey: "siFigma" },
    ],
  },
  {
    id: "backend",
    index: "02",
    title: "Backend & APIs",
    description: "RESTful endpoints, authentication mechanisms, token security, and database integration.",
    skills: [
      { name: "Python", level: 88, iconKey: "siPython" },
      { name: "FastAPI", level: 85, iconKey: "siFastapi" },
      { name: "PHP", level: 82, iconKey: "siPhp" },
      { name: "REST APIs", level: 92, iconKey: "siPostman" },
      { name: "JWT Auth", level: 88, iconKey: "siJsonwebtokens" },
      { name: "PostgreSQL", level: 84, iconKey: "siPostgresql" },
    ],
  },
  {
    id: "aiml",
    index: "03",
    title: "Applied AI & Data Science",
    description: "Data preprocessing, classification algorithms, decision-support tools, and exploratory NLP.",
    skills: [
      { name: "scikit-learn", level: 82, iconKey: "siScikitlearn" },
      { name: "NumPy & Pandas", level: 86, iconKey: "siNumpy" },
      { name: "TensorFlow", level: 75, iconKey: "siTensorflow" },
      { name: "PyTorch", level: 72, iconKey: "siPytorch" },
      { name: "Jupyter Workflows", level: 88, iconKey: "siJupyter" },
      { name: "Hugging Face", level: 78, iconKey: "siHuggingface" },
    ],
  },
  {
    id: "systems",
    index: "04",
    title: "Systems, Tools & Core CS",
    description: "Object-oriented programming, data structures, algorithms, version control, and Linux environments.",
    skills: [
      { name: "C++ Programming", level: 85, iconKey: "siCplusplus" },
      { name: "Data Structures & OOP", level: 88, iconKey: "siCplusplus" },
      { name: "Git & Version Control", level: 92, iconKey: "siGit" },
      { name: "GitHub Collaboration", level: 90, iconKey: "siGithub" },
      { name: "Linux Environments", level: 85, iconKey: "siLinux" },
      { name: "SQLite & Databases", level: 86, iconKey: "siSqlite" },
    ],
  },
];
