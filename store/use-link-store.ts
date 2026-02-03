import { create } from 'zustand';
import { Store, Link, Profile } from '@/types';

const defaultProfile: Profile = {
  username: 'user',
  theme: 'light',
};

export const useLinkStore = create<Store>((set) => ({
  links: [],
  profile: defaultProfile,
  addLink: (link) =>
    set((state) => ({ links: [...state.links, link] })),
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
}));
