"use client";

import { useLinkStore } from "@/store/use-link-store";
import { useEffect, useState } from "react";
import { Battery, Wifi, Link2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Template Style Definitions
const templates: Record<string, any> = {
    minimalist: {
        bg: "bg-black",
        text: "text-white",
        card: "bg-zinc-900 border border-zinc-800",
        cardHover: "hover:scale-[1.02] active:scale-[0.98]",
        font: "font-sans",
        button: "rounded-xl",
    },
    glassmorphism: {
        bg: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900",
        text: "text-white",
        card: "bg-white/10 border border-white/20 backdrop-blur-md",
        cardHover: "hover:bg-white/20 hover:scale-[1.02]",
        font: "font-sans",
        button: "rounded-2xl",
    },
    neon: {
        bg: "bg-[#050505]",
        text: "text-cyan-400",
        card: "bg-black border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
        cardHover: "hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-[1.02]",
        font: "font-mono",
        button: "rounded-none uppercase tracking-widest",
    },
    retro: {
        bg: "bg-[#f0f0e0]",
        text: "text-[#2a2a2a]",
        card: "bg-[#e6e6d0] border-2 border-[#2a2a2a] shadow-[4px_4px_0px_#2a2a2a]",
        cardHover: "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2a2a2a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        font: "font-serif",
        button: "rounded-sm",
    }
};

export function PreviewCanvas() {
  const links = useLinkStore((state) => state.links);
  const profile = useLinkStore((state) => state.profile);
  const currentTemplate = useLinkStore((state) => state.currentTemplate);
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const theme = templates[currentTemplate] || templates.minimalist;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Mobile Device Mockup - Floating Effect */}
      <motion.div 
        layout
        className="w-[320px] h-[640px] border-[8px] border-[#1a1a1a] rounded-[3rem] bg-black overflow-hidden shadow-2xl relative ring-1 ring-white/10 transition-all duration-500"
      >
        
        {/* Notch/Status Bar */}
        <div className={`absolute top-0 w-full z-20 px-6 py-3 flex justify-between items-center text-[10px] subpixel-antialiased font-medium transition-colors duration-500 ${currentTemplate === 'retro' ? 'text-black' : 'text-white'}`}>
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3 h-3" />
            </div>
        </div>

        {/* Dynamic Content Container - Animated Background Transition */}
        <motion.div 
            className={`h-full w-full overflow-y-auto relative no-scrollbar transition-colors duration-500 ${theme.bg} ${theme.text} ${theme.font}`}
            initial={false}
            animate={{ backgroundColor: theme.bg }} // Although class changes, explicit animate helps sometimes
        >
            
            <div className="pt-16 pb-12 px-5 flex flex-col items-center min-h-full relative z-10 text-inherit">
                
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center space-y-4 mb-8 w-full">
                    <div className={`w-24 h-24 flex items-center justify-center overflow-hidden relative ${currentTemplate === 'retro' ? 'rounded-full border-2 border-[#2a2a2a]' : 'rounded-full bg-white/5 border border-white/10'}`}>
                         {profile.avatarUrl ? (
                             <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                         ) : (
                             <div className={`w-full h-full ${currentTemplate === 'retro' ? 'bg-[#d0d0c0]' : 'bg-gradient-to-tr from-zinc-800 to-zinc-900'}`} />
                         )}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">{profile.displayName || "@username"}</h1>
                        <p className={`text-sm line-clamp-2 mt-1 px-2 opacity-70`}>{profile.bio || "Welcome to my page"}</p>
                    </div>
                </div>

                {/* Links List */}
                <div className="w-full space-y-3">
                    <AnimatePresence mode="popLayout">
                        {links.filter(l => l.isActive).map((link) => (
                            <motion.a
                                layout
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`block w-full text-center text-sm font-medium transition-all duration-200 overflow-hidden group relative flex items-center justify-center ${theme.card} ${theme.cardHover} ${theme.button} ${link.image ? 'h-16 p-1' : 'p-3.5'}`}
                            >
                                {link.image ? (
                                    <div className="flex items-center w-full h-full">
                                        <div className={`w-14 h-14 overflow-hidden flex-shrink-0 bg-black/20 ${theme.button}`}>
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

                {/* Footer Branding */}
                <div className="mt-auto pt-8 pb-4 flex items-center justify-center gap-1.5 opacity-50">
                    <Link2 className="w-3 h-3" />
                    <span className="text-[10px] font-medium tracking-wide">LinkVibe</span>
                </div>

            </div>
        </motion.div>

        {/* Custom Scrollbar Hide */}
        <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
      </motion.div>
    </div>
  );
}
