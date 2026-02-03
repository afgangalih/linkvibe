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
}

export const useLinkStore = create<ExtendedStore>((set) => ({
  links: [],
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
  setProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),
  reorderLinks: (newLinks) => set({ links: newLinks }),
  setTemplate: (template) => set({ currentTemplate: template }),
}));
