export interface SocialLinks {
  email: string;
  phone: string;
  whatsapp?: string;
  linkedin: string;
  github?: string;
  location: string;
  cvUrl?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string[];
  aboutFocus: {
    label: string;
    title: string;
    description: string;
  }[];
  social: SocialLinks;
}

export interface Skill {
  name: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  items: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
  type: "work" | "internship" | "organization";
}

export interface Project {
  name: string;
  category: string;
  badge: string;
  period: string;
  description: string;
  tech?: string[];
  thumbnail?: string;
  images?: string[];
  demoUrl?: string;
  playUrl?: string;
  link?: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  period: string;
}

export interface Education {
  school: string;
  major: string;
  period: string;
  gpa?: string;
  note?: string;
}

export interface Cv {
  profile: Profile;
  skills: SkillGroup[];
  experiences: Experience[];
  projects: Project[];
  certificates: Certificate[];
  educations: Education[];
}

export type Locale = "id" | "en";
