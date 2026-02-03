"use client";

import { Button } from "@/components/ui/button";
import { Eye, Share2, ChevronDown, ChevronRight, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLinkStore } from "@/store/use-link-store";

export function EditorNavbar() {
  const currentTemplate = useLinkStore((state) => state.currentTemplate);
  const setTemplate = useLinkStore((state) => state.setTemplate);
  
  const templates = [
      { id: 'minimalist', name: 'Minimalist' },
      { id: 'glassmorphism', name: 'Glassmorphism' },
      { id: 'neon', name: 'Neon' },
      { id: 'retro', name: 'Retro' },
  ];

  return (
    <header className="h-16 w-full border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-zinc-500 font-medium">Dashboard</span>
        <ChevronRight className="w-4 h-4 text-zinc-700" />
        <span className="text-zinc-500 font-medium">Editor</span>
        <ChevronRight className="w-4 h-4 text-zinc-700" />
        <span className="text-white font-medium tracking-tight">My LinkVibe</span>
      </div>

      {/* Right: Actions & Template Selector */}
      <div className="flex items-center gap-3">
        {/* Template Selector */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-black border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 gap-2 h-9">
                    <Palette className="w-4 h-4" />
                    <span className="capitalize">{currentTemplate}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#09090b] border-zinc-800 text-zinc-300">
                <DropdownMenuLabel className="text-xs text-zinc-500 font-normal uppercase tracking-wider">Select Template</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                {templates.map((template) => (
                    <DropdownMenuItem 
                        key={template.id}
                        onClick={() => setTemplate(template.id)}
                        className={`cursor-pointer focus:bg-zinc-900 focus:text-white ${currentTemplate === template.id ? 'bg-zinc-900 text-white font-medium' : ''}`}
                    >
                        {template.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white gap-2">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
        </Button>
        <Button size="sm" className="rounded-full bg-white text-black hover:bg-zinc-200 gap-2 h-9 px-4 font-medium">
            <Share2 className="w-4 h-4" />
            Share
        </Button>
      </div>
    </header>
  );
}
