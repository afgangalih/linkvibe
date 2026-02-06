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
    syncStatus: 'idle' | 'saving' | 'saved' | 'error';
    fetchUserPage: (username: string) => Promise<void>;
}

let syncTimer: NodeJS.Timeout;

const triggerSync = (get: () => ExtendedStore, set: (partial: Partial<ExtendedStore>) => void) => {
    set({ syncStatus: 'saving' });
    clearTimeout(syncTimer);
    
    syncTimer = setTimeout(async () => {
        const state = get();
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
             console.warn("Sync blocked: No authenticated user.");
             set({ syncStatus: 'error' });
             return;
        }

        try {
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({ 
                    id: user.id,
                    username: state.profile.username || user.email?.split('@')[0] || 'user',
                    display_name: state.profile.displayName,
                    bio: state.profile.bio,
                    avatar_url: state.profile.avatarUrl,
                    theme_id: state.currentTemplate,
                    font_id: state.currentFont,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (profileError) {
                console.error("Profile Sync Error:", profileError.message);
                throw profileError;
            }

            const currentIds = state.links.map(l => l.id);
            
            if (currentIds.length > 0) {
                 const { error: deleteError } = await supabase
                    .from('links')
                    .delete()
                    .eq('user_id', user.id)
                    .not('id', 'in', `(${currentIds.join(',')})`);
                 
                 if (deleteError) throw deleteError;
            } else {
                 const { error: deleteAllError } = await supabase
                    .from('links')
                    .delete()
                    .eq('user_id', user.id);
                 
                 if (deleteAllError) throw deleteAllError;
            }

            if (state.links.length > 0) {
                const { error: linksError } = await supabase
                    .from('links')
                    .upsert(
                        state.links.map((link, index) => ({
                            id: link.id,
                            user_id: user.id,
                            title: link.title,
                            url: link.url,
                            icon: link.icon,
                            image: link.image,
                            is_active: link.isActive,
                            sort_order: index
                        })),
                        { onConflict: 'id' }
                    );

                if (linksError) throw linksError;
            }

            const { error: socialsError } = await supabase
                .from('social_links')
                .upsert(
                    state.socials.map((social) => ({
                        id: social.id,
                        user_id: user.id,
                        platform: social.platform,
                        url: social.url,
                        is_active: social.isActive
                    })),
                    { onConflict: 'id' }
                );
            
            if (socialsError) throw socialsError;
            
            set({ syncStatus: 'saved' });
        } catch (error) {
            console.error("Sync Critical Error:", error);
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

  addLink: (link) => {
    set((state) => ({ links: [...state.links, { ...link, image: "", icon: "" }] }));
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

  fetchUserPage: async (username) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
          console.log("Hydrating active user:", user.id);
          
          const [profileResponse, linksResponse, socialsResponse] = await Promise.all([
              supabase.from('profiles').select('*').eq('id', user.id).single(),
              supabase.from('links').select('*').eq('user_id', user.id).order('sort_order', { ascending: true }),
              supabase.from('social_links').select('*').eq('user_id', user.id)
          ]);

          const { data: profileData, error: profileError } = profileResponse;
          const { data: linksData, error: linksError } = linksResponse;
          const { data: socialsData, error: socialsError } = socialsResponse;

          if (profileData && !profileError) {
             set({
                 profile: {
                     username: profileData.username ?? '',
                     displayName: profileData.display_name ?? '',
                     bio: profileData.bio ?? '',
                     avatarUrl: profileData.avatar_url ?? '',
                     theme: profileData.theme_id ?? 'light'
                 },
                 currentTemplate: profileData.theme_id ?? 'minimalist',
                 currentFont: profileData.font_id ?? 'Inter'
             });
          }

          if (linksData && !linksError) {
              const mappedLinks = linksData.map((l: any) => ({
                  id: l.id,
                  title: l.title,
                  url: l.url,
                  isActive: l.is_active,
                  image: l.image || "",
                  icon: l.icon ?? ""
              }));
              set({ links: mappedLinks });
          }

          if (socialsData && !socialsError) {
              const mappedSocials = socialsData.map((s: any) => ({
                  id: s.id,
                  platform: s.platform,
                  url: s.url,
                  isActive: s.is_active
              }));
              set({ socials: mappedSocials });
          }
          
      } else {
          console.log("No active session, fetching public page:", username);
      }
  }
}));
