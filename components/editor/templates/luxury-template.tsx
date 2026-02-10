"use client";

import { TemplateProps } from "./types";
import { getIcon } from "./icon-map";
import { Link2, Instagram, Twitter, Linkedin, Github, Youtube, Facebook, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const socialIcons: Record<string, any> = {
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    github: Github,
    youtube: Youtube,
    facebook: Facebook,
};

export function LuxuryTemplate({ profile, links, socials, font }: TemplateProps) {
    const activeSocials = socials.filter(s => s.isActive);
    const activeLinks = links.filter(l => l.isActive);

    return (
        <div className={`min-h-full flex flex-col items-center py-12 px-6 bg-[#0a0a0c] text-white relative overflow-hidden ${font}`}>
            <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[50%] bg-[#5b13ec]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[50%] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center mb-10 z-10">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] to-[#5b13ec] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative h-32 w-32 rounded-full border-2 border-transparent bg-[#0a0a0c] p-[2px] overflow-hidden" style={{ background: 'linear-gradient(#0a0a0c, #0a0a0c) padding-box, linear-gradient(to right, #D4AF37, #5b13ec) border-box' }}>
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <div className="w-full h-full bg-zinc-800 rounded-full" />
                        )}
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-1 capitalize">
                        {profile.displayName || profile.username}
                    </h1>
                    <p className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-2 opacity-90">
                        @{profile.username}
                    </p>
                    <p className="text-slate-400 text-sm max-w-[280px] leading-relaxed">
                        {profile.bio || "Welcome to my page"}
                    </p>
                </div>
            </div>

            <div className="w-full space-y-4 mb-12 z-10">
                <AnimatePresence mode="popLayout">
                    {activeLinks.map((link, index) => {
                        const Icon = link.icon ? getIcon(link.icon) : null;
                        const isPrimary = index === 0;

                        return (
                            <motion.a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group flex items-center justify-between h-16 px-8 rounded-full transition-all active:scale-95 ${
                                    isPrimary 
                                    ? "bg-[#5b13ec] text-white shadow-[0_0_20px_rgba(91,19,236,0.3)]" 
                                    : "bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10"
                                }`}
                            >
                                <span className="flex items-center gap-3 font-semibold tracking-wide">
                                    {Icon && <Icon className={`w-5 h-5 ${!isPrimary && "text-[#D4AF37]"}`} />}
                                    <span className="truncate max-w-[200px]">{link.title || "Untitled Link"}</span>
                                </span>
                                {isPrimary ? (
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                ) : (
                                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                                )}
                            </motion.a>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="mt-auto pt-8 flex justify-center items-center gap-8 z-10">
                {activeSocials.map((social) => {
                    const Icon = socialIcons[social.platform.toLowerCase()] || Link2;
                    return (
                        <a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-[#5b13ec] transition-all duration-300 hover:scale-110"
                        >
                            <Icon className="w-6 h-6" />
                        </a>
                    );
                })}
            </div>

            <div className="mt-12 text-center opacity-40 flex items-center gap-1.5">
                <Link2 className="w-3 h-3" />
                <span className="text-[10px] font-medium uppercase tracking-[0.2em]">LinkVibe</span>
            </div>
        </div>
    );
}