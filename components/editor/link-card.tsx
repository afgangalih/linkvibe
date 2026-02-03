"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link as LinkType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, Trash2, Youtube, Mail, Globe, Sparkles, Instagram, Music } from "lucide-react";
import { useLinkStore } from "@/store/use-link-store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  link: LinkType;
}

const itemIcons = [
    { name: "globe", icon: Globe, label: "Website" },
    { name: "youtube", icon: Youtube, label: "YouTube" },
    { name: "mail", icon: Mail, label: "Email" },
    { name: "instagram", icon: Instagram, label: "Instagram" },
    { name: "music", icon: Music, label: "Spotify" },
];

export function LinkCard({ link }: LinkCardProps) {
  const updateLink = useLinkStore((state) => state.updateLink);
  const removeLink = useLinkStore((state) => state.removeLink);
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to render icon
  const getIcon = (iconName: string) => {
    const found = itemIcons.find(i => i.name === iconName);
    return found ? found.icon : Globe;
  };

  const SelectedIcon = getIcon(link.icon || "globe");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div className={cn(
        "bg-[#09090b] border border-zinc-900 rounded-lg overflow-hidden hover:border-zinc-700 transition-all",
        link.isActive ? "bg-[#09090b]" : "opacity-75"
      )}>
        <div className="p-3 flex items-center gap-3">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400 p-1"
          >
            <GripVertical className="w-4 h-4" />
          </div>

          <div className="flex-1 grid gap-0.5 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
             <div className="flex items-center gap-2">
                 <SelectedIcon className="w-3.5 h-3.5 text-blue-500" />
                 <h3 className="text-sm font-medium text-white truncate">{link.title || "Untitled Link"}</h3>
             </div>
             {link.url && <p className="text-[10px] text-zinc-500 truncate">{link.url}</p>}
          </div>
            
          <div className="flex items-center gap-2">
            {/* Active Toggle */}
            <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                    e.stopPropagation();
                    updateLink(link.id, { isActive: !link.isActive });
                }}
                className={cn(
                    "w-7 h-7 rounded-full transition-colors",
                    link.isActive ? "text-green-500 bg-green-500/10" : "text-zinc-600 hover:text-zinc-400"
                )}
            >
                <div className={cn("w-1.5 h-1.5 rounded-full", link.isActive ? "bg-current" : "bg-zinc-600")} />
            </Button>
          </div>
        </div>
        
        {/* Expanded Details */}
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-zinc-900 bg-[#050505]"
                >
                    <div className="p-3 space-y-3">
                        <div className="grid grid-cols-[50px_1fr] gap-3">
                            {/* Icon Popover Trigger */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="w-12 h-12 rounded-lg border border-dashed border-zinc-800 flex flex-col items-center justify-center bg-[#09090b] hover:bg-zinc-900 hover:border-blue-600/50 transition-all group/icon">
                                        <SelectedIcon className="w-5 h-5 text-zinc-400 group-hover/icon:text-white" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-3 bg-[#09090b] border-zinc-800" align="start">
                                    <h4 className="text-xs font-semibold text-white mb-3">Select Icon</h4>
                                    <div className="grid grid-cols-4 gap-2">
                                        {itemIcons.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => updateLink(link.id, { icon: item.name })}
                                                className={cn(
                                                    "aspect-square rounded-md flex flex-col items-center justify-center gap-1 transition-colors border",
                                                    link.icon === item.name 
                                                        ? "bg-blue-600/10 border-blue-600/50 text-blue-500" 
                                                        : "bg-black border-transparent hover:bg-zinc-900 hover:border-zinc-800 text-zinc-400"
                                                )}
                                            >
                                                <item.icon className="w-5 h-5" />
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <div className="space-y-2">
                                <Input
                                    value={link.title}
                                    onChange={(e) => updateLink(link.id, { title: e.target.value })}
                                    className="h-8 bg-black border-zinc-800 text-xs focus-visible:ring-blue-600/30"
                                    placeholder="Link Title"
                                />
                                <Input
                                    value={link.url}
                                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                                    className="h-8 bg-black border-zinc-800 text-xs text-zinc-400 focus-visible:ring-blue-600/30"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="pt-2 flex justify-between items-center border-t border-zinc-900 mt-2">
                             <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLink(link.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-950/30 h-6 text-[10px] px-2 ml-auto"
                            >
                                <Trash2 className="w-3 h-3 mr-2" /> Delete Link
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
}
