import { MinimalistTemplate } from "./minimalist-template";
import { GlassTemplate } from "./glass-template";
import { NeonTemplate } from "./neon-template";
import { RetroTemplate } from "./retro-template";
import { LiquidTemplate } from "./liquid-template";

export const TemplateRegistry: Record<string, React.FC<any>> = {
    "minimalist": MinimalistTemplate,
    "glassmorphism": GlassTemplate,
    "neon": NeonTemplate,
    "retro": RetroTemplate,
    "liquid-blue": LiquidTemplate,
    "liquid-pink": LiquidTemplate,
    "liquid-mint": LiquidTemplate,
    "liquid-vivid": LiquidTemplate,
};

export const TemplateThemes = [
    { id: "minimalist", name: "Minimalist", type: 'dark', color: "bg-zinc-900 border-zinc-700" },
    { id: "glassmorphism", name: "Glass", type: 'dark', color: "bg-gradient-to-br from-indigo-900 to-purple-900 border-white/20" },
    { id: "neon", name: "Neon", type: 'dark', color: "bg-black border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]" },
    { id: "retro", name: "Retro", type: 'light', color: "bg-[#e6e6d0] border-[#2a2a2a]" },
    { id: "liquid-blue", name: "Liquid Blue", type: 'dark', color: "bg-gradient-to-b from-blue-900 to-black border-blue-900" },
    { id: "liquid-pink", name: "Liquid Pink", type: 'light', color: "bg-gradient-to-b from-pink-400 to-white border-pink-200" },
    { id: "liquid-mint", name: "Liquid Mint", type: 'light', color: "bg-gradient-to-b from-teal-400 to-white border-teal-200" },
    { id: "liquid-vivid", name: "Liquid Vivid", type: 'dark', color: "bg-gradient-to-b from-violet-600 to-black border-violet-600" },
];
