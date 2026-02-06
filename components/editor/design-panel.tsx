"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLinkStore } from "@/store/use-link-store";
import { AIBioGenerator } from "./ai-bio-generator";
import { Palette, Type, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import { TemplateThemes } from "./templates/template-registry";

const fonts = [
    { id: 'Inter', name: 'Inter', sub: 'Clean & Modern' },
    { id: 'Merriweather', name: 'Merriweather', sub: 'Classic Serif' },
    { id: 'Roboto Mono', name: 'Roboto Mono', sub: 'Tech / Code' },
    { id: 'Outfit', name: 'Outfit', sub: 'Bold Geometric' },
];

export function DesignPanel() {
  const { currentTemplate, setTemplate, currentFont, setFont } = useLinkStore();

  return (
    <div className="h-full flex flex-col bg-black border-l border-zinc-900">
      <div className="px-6 py-4 border-b border-zinc-900 bg-black flex items-center justify-between sticky top-0 z-20">
        <h2 className="text-sm font-semibold text-white">Design Studio</h2>
        <LayoutTemplate className="w-4 h-4 text-zinc-600" />
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8 pb-32">
            <section>
                <AIBioGenerator />
            </section>

            <div className="h-px bg-zinc-900" />

            <section className="space-y-6">
                <Tabs defaultValue="all" className="w-full">
                    <div className="flex items-center justify-between mb-4">
                         <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-3.5 h-3.5" /> Themes
                         </h3>
                         <TabsList className="h-7 bg-zinc-900/50 p-0.5 rounded-lg border border-zinc-800">
                            <TabsTrigger value="all" className="h-6 text-[10px] px-2 rounded-md data-[state=active]:bg-zinc-800 data-[state=active]:text-white">All</TabsTrigger>
                            <TabsTrigger value="dark" className="h-6 text-[10px] px-2 rounded-md data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Dark</TabsTrigger>
                            <TabsTrigger value="light" className="h-6 text-[10px] px-2 rounded-md data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Light</TabsTrigger>
                        </TabsList>
                    </div>
                    
                    {['all', 'dark', 'light'].map((tab) => (
                        <TabsContent key={tab} value={tab} className="mt-0">
                             <div className="grid grid-cols-2 gap-3">
                                {TemplateThemes.filter(t => tab === 'all' || t.type === tab).map((theme) => (
                                    <div
                                        key={theme.id}
                                        onClick={() => setTemplate(theme.id)}
                                        className={cn(
                                            "cursor-pointer aspect-square rounded-xl border-2 p-3 flex flex-col justify-end transition-all bg-[#050505] relative group overflow-hidden",
                                            currentTemplate === theme.id ? 'border-blue-600 ring-4 ring-blue-600/10' : 'border-zinc-900 hover:border-zinc-700'
                                        )}
                                    >
                                        <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity ${theme.color}`} />
                                        <div className={`w-8 h-8 rounded-lg ${theme.color} mb-auto relative z-10 shadow-lg`} />
                                        <span className={cn(
                                            "text-xs font-medium relative z-10",
                                            currentTemplate === theme.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                                        )}>
                                            {theme.name}
                                        </span>
                                    </div>
                                ))}
                             </div>
                        </TabsContent>
                    ))}
                </Tabs>

                 <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <Type className="w-3.5 h-3.5" /> Typography
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {fonts.map((font) => (
                            <div 
                                key={font.id} 
                                onClick={() => setFont(font.id)}
                                className={cn(
                                    "p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all",
                                    currentFont === font.id 
                                        ? "bg-blue-600/10 border-blue-600" 
                                        : "bg-black border-zinc-900 hover:border-zinc-700"
                                )}
                            >
                                <div>
                                    <p className="text-white text-sm font-medium">{font.name}</p>
                                    <p className="text-zinc-500 text-[10px]">{font.sub}</p>
                                </div>
                                {currentFont === font.id && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                            </div>
                        ))}
                    </div>
                 </div>
            </section>
        </div>
      </ScrollArea>
    </div>
  );
}
