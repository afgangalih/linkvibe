export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string; // lucide icon name or url
  image?: string; // URL for the link thumbnail
  isActive: boolean;
}

export interface SocialLink {
  id: string;
  platform: string; // 'twitter' | 'instagram' | 'linkedin' | 'github'
  url: string;
  isActive: boolean;
}

export interface Profile {
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  theme: 'light' | 'dark' | 'custom';
}

export interface Store {
  links: Link[];
  socials: SocialLink[];
  profile: Profile;
  addLink: (link: Link) => void;
  updateLink: (id: string, updates: Partial<Link>) => void;
  removeLink: (id: string) => void;
  updateSocial: (platform: string, url: string, isActive: boolean) => void;
  setProfile: (profile: Partial<Profile>) => void;
  // Font State
  currentFont: string;
  setFont: (font: string) => void;
}
