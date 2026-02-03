"use client";

import { TemplateProps } from "./types";
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

export function NeonTemplate({ profile, links, socials, font }: TemplateProps) {
  const activeSocials = socials.filter(s => s.isActive);
  const activeLinks = links.filter(l => l.isActive);

  return (
    <div className={`min-h-full flex flex-col items-center pt-16 pb-6 px-5 bg-[#050505] text-cyan-400 ${font}`}>
      {/* Profile */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8 w-full">
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden relative rounded-full bg-white/5 border border-white/10">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-zinc-800 to-zinc-900" />
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{profile.displayName || "@username"}</h1>
          <p className="text-sm line-clamp-2 mt-1 px-2 opacity-70">{profile.bio || "Welcome to my page"}</p>
        </div>
      </div>

      {/* Links */}
      <div className="w-full space-y-3 mb-8">
        <AnimatePresence mode="popLayout">
          {activeLinks.map((link) => (
            <motion.a
              layout
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="block w-full text-center text-sm font-medium transition-all duration-200 overflow-hidden group relative flex items-center justify-center bg-black border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] rounded-none uppercase tracking-widest hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-[1.02] p-3.5"
            >
              {link.image ? (
                <div className="flex items-center w-full h-full">
                  <div className="w-14 h-14 overflow-hidden flex-shrink-0 bg-black/20">
                    <img src={link.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="flex-1 text-center pr-14 truncate">{link.title || "Untitled Link"}</span>
                </div>
              ) : (
                <span>{link.title || "Untitled Link"}</span>
              )}
            </motion.a>
          ))}
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
  );
}
