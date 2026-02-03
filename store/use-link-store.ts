import { create } from 'zustand';
import { Store, Link, Profile } from '@/types';

const defaultProfile: Profile = {
  username: 'user',
  theme: 'light',
};

interface ExtendedStore extends Store {
    reorderLinks: (links: Link[]) => void;
    currentTemplate: string;
    setTemplate: (template: string) => void;
    currentFont: string;
    setFont: (font: string) => void;
}

export const useLinkStore = create<ExtendedStore>((set) => ({
  links: [],
  socials: [],
  profile: defaultProfile,
  currentTemplate: 'minimalist',
  addLink: (link) =>
    set((state) => ({ links: [...state.links, { ...link, image: "" }] })),
  updateLink: (id, updates) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...updates } : link
      ),
    })),
  removeLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),
  updateSocial: (platform, url, isActive) =>
    set((state) => {
        const existing = state.socials.find(s => s.platform === platform);
        let newSocials = [...state.socials];
        
        if (existing) {
            newSocials = newSocials.map(s => s.platform === platform ? { ...s, url, isActive } : s);
        } else {
            newSocials.push({ id: crypto.randomUUID(), platform, url, isActive });
        }
        return { socials: newSocials };
    }),
  setProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),
  reorderLinks: (newLinks) => set({ links: newLinks }),
  setTemplate: (template) => set({ currentTemplate: template }),
  // Font Logic
  currentFont: 'Inter',
  setFont: (font) => set({ currentFont: font }),
}));
