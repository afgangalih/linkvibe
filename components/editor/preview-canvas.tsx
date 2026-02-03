"use client";

import { useLinkStore } from "@/store/use-link-store";
import { useEffect, useState } from "react";
import { Battery, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { Inter, Merriweather, Roboto_Mono, Outfit } from "next/font/google";
import { TemplateRegistry } from "./templates/template-registry";
import { MinimalistTemplate } from "./templates/minimalist-template";

const inter = Inter({ subsets: ["latin"] });
const merriweather = Merriweather({ weight: ["400", "700"], subsets: ["latin"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

const fontMap: Record<string, any> = {
    'Inter': inter,
    'Merriweather': merriweather,
    'Roboto Mono': robotoMono,
    'Outfit': outfit,
};

interface PreviewCanvasProps {
    scale?: number;
}

export function PreviewCanvas({ scale = 1 }: PreviewCanvasProps) {
  const { links, socials, profile, currentTemplate, currentFont } = useLinkStore();
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const ActiveTemplate = TemplateRegistry[currentTemplate] || MinimalistTemplate;
  const activeFont = fontMap[currentFont] || inter;
  
  const isLightMode = ['retro', 'liquid-pink', 'liquid-mint'].includes(currentTemplate);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden">
      {/* Mobile Device Mockup */}
      <motion.div 
        layout
        style={{ transform: `scale(${scale})` }}
        className="w-[320px] h-[640px] border-[8px] border-[#1a1a1a] rounded-[3rem] bg-black overflow-hidden shadow-2xl relative ring-1 ring-white/10 transition-transform duration-300 ease-out origin-center block"
      >
        
        {/* Notch/Status Bar */}
        <div className={`absolute top-0 w-full z-20 px-6 py-3 flex justify-between items-center text-[10px] subpixel-antialiased font-medium transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3 h-3" />
            </div>
        </div>

        {/* Template Render */}
        <div className="h-full w-full overflow-y-auto relative no-scrollbar bg-black">
             <ActiveTemplate 
                profile={profile}
                links={links}
                socials={socials}
                font={activeFont.className}
                theme={currentTemplate} 
             />
        </div>

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
