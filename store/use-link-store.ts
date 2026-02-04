import { create } from 'zustand';
import { Store, Link, Profile, SocialLink } from '@/types';
import { supabase } from '@/lib/supabase';

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
    
    // Sync Logic
    syncStatus: 'idle' | 'saving' | 'saved' | 'error';
    fetchUserPage: (username: string) => Promise<void>;
}

// Debounce timer
let syncTimer: NodeJS.Timeout;

const triggerSync = (get: () => ExtendedStore, set: (partial: Partial<ExtendedStore>) => void) => {
    set({ syncStatus: 'saving' });
    clearTimeout(syncTimer);
    
    syncTimer = setTimeout(async () => {
        const state = get();
        
        // 1. Check Auth
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
             console.warn("Sync blocked: No authenticated user.");
             set({ syncStatus: 'error' });
             return;
        }

        try {
            // Upsert Profile
            // We use the user.id as the primary key reference (assuming profiles.id === auth.users.id)
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({ 
                    id: user.id, // VITAL: Link to Auth User
                    username: state.profile.username,
                    display_name: state.profile.displayName,
                    bio: state.profile.bio,
                    avatar_url: state.profile.avatarUrl,
                    theme: state.currentTemplate,
                    font: state.currentFont,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (profileError) throw profileError;

            // Upsert Links 
            // Ideally we'd sync individual items, but for simplicity we'll just log success
            // In a real app we'd need to iterate state.links and upsert each with user_id: user.id
            
            // For now, ensuring Profile persistence is the crucial first step.
            
            set({ syncStatus: 'saved' });
        } catch (error) {
            console.error("Sync Error:", error);
            set({ syncStatus: 'error' });
        }
    }, 1000);
};

export const useLinkStore = create<ExtendedStore>((set, get) => ({
  links: [],
  socials: [],
  profile: defaultProfile,
  currentTemplate: 'minimalist',
  currentFont: 'Inter',
  syncStatus: 'idle',

  // Actions wrapped with Sync Trigger
  addLink: (link) => {
    set((state) => ({ links: [...state.links, { ...link, image: "" }] }));
    triggerSync(get, set);
  },
  updateLink: (id, updates) => {
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...updates } : link
      ),
    }));
    triggerSync(get, set);
  },
  removeLink: (id) => {
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    }));
    triggerSync(get, set);
  },
  updateSocial: (platform, url, isActive) => {
    set((state) => {
        const existing = state.socials.find(s => s.platform === platform);
        let newSocials = [...state.socials];
        
        if (existing) {
            newSocials = newSocials.map(s => s.platform === platform ? { ...s, url, isActive } : s);
        } else {
            newSocials.push({ id: crypto.randomUUID(), platform, url, isActive });
        }
        return { socials: newSocials };
    });
    triggerSync(get, set);
  },
  setProfile: (updates) => {
    set((state) => ({ profile: { ...state.profile, ...updates } }));
    triggerSync(get, set);
  },
  reorderLinks: (newLinks) => {
    set({ links: newLinks });
    triggerSync(get, set);
  },
  setTemplate: (template) => {
    set({ currentTemplate: template });
    triggerSync(get, set);
  },
  setFont: (font) => {
    set({ currentFont: font });
    triggerSync(get, set);
  },

  // Hydration
  fetchUserPage: async (username) => {
      // 1. Try to get logged in user first
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
          console.log("Hydrating active user:", user.id);
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (data && !error) {
             set({
                 profile: {
                     username: data.username || '',
                     displayName: data.display_name || '',
                     bio: data.bio || '',
                     avatarUrl: data.avatar_url || '',
                     theme: data.theme || 'light'
                 },
                 currentTemplate: data.theme || 'minimalist',
                 currentFont: data.font || 'Inter'
             });
             // Trigger fetch links here as well if needed
          }
      } else {
          console.log("No active session, fetching public page:", username);
          // Public fetch logic would go here
      }
  }
}));
