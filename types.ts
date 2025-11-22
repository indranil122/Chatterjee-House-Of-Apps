import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  link?: string;
  image?: string;
  color: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string; // Emoji or icon name
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}
