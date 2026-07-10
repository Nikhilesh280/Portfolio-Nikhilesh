export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "AWS" | "Cryptographic Vault" | "MERN Stack" | "AWS Cloud" | "Full-Stack";
  tags: string[];
  description: string;
  longDescription: string;
  architecture?: string[];
  features: string[];
  securitySpecs?: string[];
  githubUrl: string;
  liveUrl?: string;
  confStatus?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
  verifyUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; level: number }[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: "education" | "experience" | "achievement" | "certification";
  description: string[];
  iconName: string;
}
