import { Project, Achievement, SocialLink, Skill, Stat, TimelineItem } from './types';
import { Github, Linkedin, Youtube, Instagram, BookOpen, Cpu, Heart, Code, Globe, Users, Coffee } from 'lucide-react';

export const BRAND_NAME = "Chatterjee House of Apps";
export const FOUNDER_NAME = "Indranil Chatterjee";
export const TAGLINE = "Building from curiosity.";
export const TAGLINE_PART_2 = "Creating for impact.";
export const SUB_TAGLINE = "Helping society—for free.";

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'YouTube', url: 'https://youtube.com', icon: Youtube },
  { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
];

export const PROJECT_CATEGORIES = ["All", "EdTech", "Web App", "Open Source", "Social"];

// Updated colors to match the Red/Black/Monochrome cinematic theme
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'PoroBangla AI',
    description: 'An Edtech initiative revolutionizing free education through accessible AI tutors for rural students.',
    tags: ['EdTech', 'AI', 'Mobile'],
    category: 'EdTech',
    color: 'from-red-600 to-red-900'
  },
  {
    id: '2',
    title: 'MindCanvas',
    description: 'A digital playground for creatives to brainstorm and visualize ideas using generative conceptual tools.',
    tags: ['React', 'Canvas', 'Creative'],
    category: 'Web App',
    color: 'from-neutral-800 to-neutral-900'
  },
  {
    id: '3',
    title: 'SocietyFirst',
    description: 'A platform connecting local volunteers with immediate community needs, completely open-source.',
    tags: ['Open Source', 'Community'],
    category: 'Social',
    color: 'from-red-500 to-orange-600'
  },
  {
    id: '4',
    title: 'DevCurio',
    description: 'A collection of experimental web components and UI libraries released for free to the developer community.',
    tags: ['UI/UX', 'Library'],
    category: 'Open Source',
    color: 'from-stone-800 to-stone-950'
  },
  {
    id: '5',
    title: 'EcoTrack',
    description: 'Personal carbon footprint tracker with gamified challenges to encourage sustainable living.',
    tags: ['Green Tech', 'Mobile'],
    category: 'Social',
    color: 'from-rose-700 to-pink-900'
  },
  {
    id: '6',
    title: 'AuraMusic',
    description: 'AI-generated ambient music based on your current mood and local weather conditions.',
    tags: ['AI', 'Music', 'API'],
    category: 'Web App',
    color: 'from-red-900 to-black'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React', level: 95, icon: '⚛️' },
  { name: 'TypeScript', level: 90, icon: '📘' },
  { name: 'AI/ML', level: 85, icon: '🤖' },
  { name: 'Node.js', level: 80, icon: '🟢' },
  { name: 'UI/UX', level: 88, icon: '🎨' },
  { name: 'Flutter', level: 75, icon: '📱' },
];

export const STATS: Stat[] = [
  { label: 'Years Experience', value: '4', suffix: '+' },
  { label: 'Projects Shipped', value: '15', suffix: '+' },
  { label: 'Lives Impacted', value: '10', suffix: 'k+' },
  { label: 'Cost to Users', value: '0', suffix: '$' },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2020',
    title: 'The Spark',
    description: 'Started coding with a vision to solve local problems using technology.'
  },
  {
    year: '2021',
    title: 'First Creation',
    description: 'Launched MindCanvas, gaining initial traction in the creative community.'
  },
  {
    year: '2022',
    title: 'Founded PoroBangla',
    description: 'Built an AI-driven education platform for rural students.'
  },
  {
    year: '2023',
    title: 'Chatterjee House of Apps',
    description: 'Formalized the mission: Building free, high-quality apps for society.'
  },
  {
    year: '2024',
    title: 'Scaling Impact',
    description: 'Reaching 10,000+ users across all platforms and growing.'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'PoroBangla AI',
    description: 'Providing free quality education to thousands.',
    icon: BookOpen
  },
  {
    id: 'a2',
    title: 'Open Source',
    description: 'Contributor to major frameworks and free tool creator.',
    icon: Github
  },
  {
    id: 'a3',
    title: 'AI Innovation',
    description: 'Building tools that democratize access to technology.',
    icon: Cpu
  },
  {
    id: 'a4',
    title: 'Social Impact',
    description: 'Every project is driven by a desire to help.',
    icon: Heart
  }
];