"use client";

import { TemplateProps } from "./types";
import { getIcon } from "./icon-map";
import { Link2, Link as LinkIcon, Instagram, Twitter, Linkedin, Github, Youtube, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const socialIcons: Record<string, any> = {
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    youtube: Youtube,
    facebook: Facebook,
};

const variants: Record<string, { header: string; bg: string; text: string; card: string; cardText: string }> = {
    "liquid-blue": {
        header: "bg-gradient-to-b from-blue-900 via-indigo-900 to-black",
        bg: "bg-black",
        text: "text-white",
        card: "bg-zinc-900/50 border border-zinc-800",
        cardText: "text-white"
    },
    "liquid-pink": {
        header: "bg-gradient-to-b from-pink-400 via-rose-300 to-white",
        bg: "bg-white",
        text: "text-zinc-900",
        card: "bg-white border border-zinc-200 shadow-sm",
        cardText: "text-zinc-900"
    },
    "liquid-mint": {
        header: "bg-gradient-to-b from-teal-400 via-emerald-300 to-white",
        bg: "bg-white",
        text: "text-teal-900",
        card: "bg-white border border-teal-100 shadow-sm",
        cardText: "text-teal-900"
    },
    "liquid-vivid": {
        header: "bg-gradient-to-b from-violet-600 via-fuchsia-600 to-black",
        bg: "bg-black",
        text: "text-white",
        card: "bg-zinc-900/80 border border-white/10",
        cardText: "text-white"
    }
};

export function LiquidTemplate({ profile, links, socials, font, theme = "liquid-blue" }: TemplateProps & { theme?: string }) {
  const activeSocials = socials.filter(s => s.isActive);
  const activeLinks = links.filter(l => l.isActive);
  
  const style = variants[theme] || variants["liquid-blue"];

  return (
    <div className={`min-h-full flex flex-col items-center relative ${style.bg} ${style.text} ${font}`}>
      {/* Curved Header */}
      <div className={`absolute top-0 left-0 w-full h-[35%] rounded-b-[60px] overflow-hidden ${style.header}`}>
         <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* Content Container (Padded to account for header) */}
      <div className="z-10 w-full flex flex-col items-center pt-[20%] px-5 pb-6 flex-1">
        
        {/* Profile (Overlapping) */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8 w-full">
            <div className="w-28 h-28 flex items-center justify-center overflow-hidden relative rounded-full border-4 border-transparent bg-white shadow-xl ring-4 ring-black/5">
            {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-zinc-200" />
            )}
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight drop-shadow-sm">{profile.displayName || "@username"}</h1>
                <p className="text-sm line-clamp-2 mt-1 px-2 opacity-80">{profile.bio || "Welcome to my page"}</p>
            </div>
        </div>

        {/* Links */}
        <div className="w-full space-y-3 mb-8">
            <AnimatePresence mode="popLayout">
            {activeLinks.map((link) => {
                const Icon = link.icon ? getIcon(link.icon) : null;
                return (
                <motion.a
                layout
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`block w-full text-center text-sm font-medium transition-all duration-200 overflow-hidden group relative flex items-center justify-center rounded-2xl hover:scale-[1.02] active:scale-[0.98] p-4 ${style.card} ${style.cardText}`}
                >
                {link.image ? (
                    <div className="flex items-center w-full h-full">
                    <div className="w-12 h-12 overflow-hidden flex-shrink-0 bg-black/10 rounded-lg">
                        <img src={link.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex items-center justify-center pr-12">
                         {Icon && <Icon className="w-4 h-4 mr-2 opacity-80" />}
                         <span className="truncate max-w-[150px]">{link.title || "Untitled Link"}</span>
                    </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        {/* Icon */}
                        {Icon && (
                             <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="opacity-90"
                             >
                                <Icon className="w-5 h-5" />
                             </motion.div>
                        )}
                        <span>{link.title || "Untitled Link"}</span>
                    </div>
                )}
                </motion.a>
            )})}
            </AnimatePresence>
        </div>

        {/* Socials */}
        {activeSocials.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
            {activeSocials.map((social) => {
                const Icon = socialIcons[social.platform] || LinkIcon;
                return (
                <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
                >
                    <Icon className="w-5 h-5" />
                </a>
                );
            })}
            </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 pb-2 flex items-center justify-center gap-1.5 opacity-50">
            <Link2 className="w-3 h-3" />
            <span className="text-[10px] font-medium tracking-wide">LinkVibe</span>
        </div>

      </div>
    </div>
  );
}
