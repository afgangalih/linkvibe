import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassTemplate } from "@/components/editor/templates/glass-template";
import { RetroTemplate } from "@/components/editor/templates/retro-template";
import { MinimalistTemplate } from "@/components/editor/templates/minimalist-template";
import { NeonTemplate } from "@/components/editor/templates/neon-template";
import { LiquidTemplate } from "@/components/editor/templates/liquid-template";
import { LuxuryTemplate } from "@/components/editor/templates/luxury-template";
import { fontVariables } from "./font-registry";
import { FontStyleInjector } from "./font-loader";

interface PageProps {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { username } = await params;
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();
    
    if (!profile) return { title: 'User Not Found' };

    return {
        title: `${profile.display_name} (@${profile.username}) | LinkVibe`,
        description: profile.bio || "Check out my links on LinkVibe",
        openGraph: {
            title: profile.display_name,
            description: profile.bio || "Check out my links on LinkVibe",
            images: profile.avatar_url ? [profile.avatar_url] : [],
        }
    };
}

export default async function PublicProfilePage({ params }: PageProps) {
    const { username } = await params;

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

    if (!profile) notFound();

    const [linksResult, socialsResult] = await Promise.all([
        supabase
            .from('links')
            .select('*')
            .eq('user_id', profile.id)
            .eq('is_active', true)
            .order('sort_order', { ascending: true }),
        supabase
            .from('social_links')
            .select('*')
            .eq('user_id', profile.id)
            .eq('is_active', true)
    ]);

    const links = linksResult.data || [];
    const socials = socialsResult.data || [];

    const themeMap: Record<string, any> = {
        'glassmorphism': GlassTemplate,
        'retro': RetroTemplate,
        'minimalist': MinimalistTemplate,
        'neon': NeonTemplate,
        'liquid-blue': LiquidTemplate,
        'liquid-pink': LiquidTemplate,
        'liquid-mint': LiquidTemplate,
        'liquid-vivid': LiquidTemplate,
        'luxury-dark': LuxuryTemplate,
    };

    const templateKey = profile.theme_id || 'minimalist';
    let SelectedTemplate = themeMap[templateKey];
    
    if (!SelectedTemplate) {
        if (templateKey.startsWith('liquid')) SelectedTemplate = LiquidTemplate;
        else if (templateKey === 'glass') SelectedTemplate = GlassTemplate;
        else SelectedTemplate = MinimalistTemplate;
    }

    const mappedProfile = {
        username: profile.username,
        displayName: profile.display_name,
        bio: profile.bio,
        avatarUrl: profile.avatar_url,
        theme: profile.theme_id
    };

    const mappedLinks = links.map((l: any) => ({
        id: l.id,
        title: l.title,
        url: l.url,
        isActive: Boolean(l.is_active),
        image: l.image || "",
        icon: l.icon || "",
    }));

    const mappedSocials = socials.map((s: any) => ({
        id: s.id,
        platform: s.platform.toLowerCase(),
        url: s.url,
        isActive: Boolean(s.is_active)
    }));

    const backgroundMap: Record<string, string> = {
        'glassmorphism': 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
        'glass': 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
        'retro': 'bg-[#f0f0e0]',
        'minimalist': 'bg-black',
        'neon': 'bg-[#050505]',
        'liquid-blue': 'bg-gradient-to-b from-blue-900 via-indigo-900 to-black',
        'liquid-pink': 'bg-gradient-to-b from-pink-400 via-rose-300 to-white',
        'liquid-mint': 'bg-gradient-to-b from-teal-400 via-emerald-300 to-white',
        'liquid-vivid': 'bg-gradient-to-b from-violet-600 via-fuchsia-600 to-black',
        'luxury-dark': 'bg-[#0a0a0c]',
    };

    const outerBg = backgroundMap[templateKey] || 'bg-black';

    return (
        <div className={`w-full min-h-screen flex items-center justify-center relative ${fontVariables}`}>
             <div className={`fixed inset-0 z-[-1] ${outerBg}`} />
             
             <div className="w-full max-w-2xl flex flex-col justify-center min-h-screen px-4 md:px-8 relative z-10">
                <FontStyleInjector fontId={profile.font_id}>
                    <SelectedTemplate 
                        profile={mappedProfile} 
                        links={mappedLinks} 
                        socials={mappedSocials} 
                        font={profile.font_id || 'Inter'}
                        theme={templateKey} 
                    />
                </FontStyleInjector>
             </div>
        </div>
    );
}