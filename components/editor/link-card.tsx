"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link as LinkType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, Trash2, Image as ImageIcon, X } from "lucide-react";
import { useLinkStore } from "@/store/use-link-store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LinkCardProps {
  link: LinkType;
}

export function LinkCard({ link }: LinkCardProps) {
  const updateLink = useLinkStore((state) => state.updateLink);
  const removeLink = useLinkStore((state) => state.removeLink);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateLink(link.id, { image: imageUrl });
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div className="bg-[#09090b] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
        <div className="p-4 flex items-center gap-4">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400 p-1"
          >
            <GripVertical className="w-5 h-5" />
          </div>

          <div className="flex-1 grid gap-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
             <h3 className="text-sm font-medium text-white truncate">{link.title || "Untitled Link"}</h3>
             <p className="text-xs text-zinc-500 truncate">{link.url || "No URL"}</p>
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
                className={`w-8 h-8 rounded-full ${link.isActive ? 'text-green-500 bg-green-500/10' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
                <div className={`w-2 h-2 rounded-full ${link.isActive ? 'bg-current' : 'bg-current'}`} />
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
                    className="overflow-hidden border-t border-zinc-800/50 bg-black/20"
                >
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-[80px_1fr] gap-4">
                            {/* Image Upload */}
                            <div className="relative group/image">
                                <div className="w-20 h-20 rounded-lg border border-dashed border-zinc-700 flex items-center justify-center bg-black overflow-hidden relative">
                                    {link.image ? (
                                        <>
                                            <img src={link.image} alt="Thumbnail" className="w-full h-full object-cover" />
                                            <button 
                                                onClick={() => updateLink(link.id, { image: "" })}
                                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity"
                                            >
                                                <X className="w-5 h-5 text-white" />
                                            </button>
                                        </>
                                    ) : (
                                        <label className="cursor-pointer w-full h-full flex items-center justify-center text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900 transition-colors">
                                            <ImageIcon className="w-6 h-6" />
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Input
                                    value={link.title}
                                    onChange={(e) => updateLink(link.id, { title: e.target.value })}
                                    className="h-9 bg-black/50 border-zinc-800 text-sm"
                                    placeholder="Title"
                                />
                                <Input
                                    value={link.url}
                                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                                    className="h-9 bg-black/50 border-zinc-800 text-sm text-zinc-400"
                                    placeholder="URL"
                                />
                            </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                             <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeLink(link.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 text-xs"
                            >
                                <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete Link
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
