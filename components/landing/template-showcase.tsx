"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const templates = [
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean, monochrome aesthetics for professionals.",
    previewColor: "bg-zinc-900 border-zinc-800",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Modern frosted glass effects with subtle gradients.",
    previewColor: "bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-white/10",
  },
  {
    id: "neon",
    name: "Neon",
    description: "High-contrast dark mode with vibrant accents.",
    previewColor: "bg-black border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]",
  },
  {
    id: "retro",
    name: "Retro",
    description: "Nostalgic off-white tones with sharp borders.",
    previewColor: "bg-[#e6e6d0] border-[#2a2a2a]",
  },
];

export function TemplateShowcase() {
  return (
    <section className="py-24 bg-black border-t border-zinc-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 space-y-4">
        
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Designs that stand out.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Choose from our curated collection of premium templates. Switch instantly with no code required.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[9/16] w-full bg-[#09090b] border border-zinc-800 rounded-3xl overflow-hidden mb-4 transition-colors group-hover:border-zinc-700">
                <div className="absolute inset-4 rounded-2xl overflow-hidden flex flex-col">
                  <div className="h-6 w-full flex items-center justify-between px-3 mt-2">
                     <div className="w-8 h-1 bg-white/20 rounded-full" />
                     <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                     </div>
                  </div>
                  
                  <div className={`flex-1 mt-4 mx-2 rounded-xl ${template.previewColor} flex flex-col p-3 gap-2 opacity-80 group-hover:opacity-100 transition-opacity`}>
                      <div className="w-12 h-12 rounded-full bg-white/10 self-center mb-2" />
                      <div className="w-3/4 h-2 bg-white/10 rounded-full self-center" />
                      <div className="w-1/2 h-2 bg-white/10 rounded-full self-center mb-2" />
                      
                      <div className="w-full h-8 bg-white/5 rounded-lg border border-white/5 mt-auto" />
                      <div className="w-full h-8 bg-white/5 rounded-lg border border-white/5" />
                      <div className="w-full h-8 bg-white/5 rounded-lg border border-white/5" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <Button size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-full font-medium">
                      View Template
                   </Button>
                </div>
              </div>

              <div className="text-left">
                  <h3 className="text-white font-medium">{template.name}</h3>
                  <p className="text-zinc-500 text-xs hidden sm:block">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
