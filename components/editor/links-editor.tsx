"use client";

import { useLinkStore } from "@/store/use-link-store";
import { Button } from "@/components/ui/button";
import { Plus, Globe, Youtube, Mail, Instagram, Music } from "lucide-react";
import { 
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LinkCard } from "./link-card";
import { SocialsEditor } from "./socials-editor";

// Icon map for active bar
const iconMap: Record<string, any> = {
    globe: Globe,
    youtube: Youtube,
    mail: Mail,
    instagram: Instagram,
    music: Music,
};

export function LinksEditor() {
  const links = useLinkStore((state) => state.links);
  const addLink = useLinkStore((state) => state.addLink);
  const reorderLinks = useLinkStore((state) => state.reorderLinks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = links.findIndex((item) => item.id === active.id);
      const newIndex = links.findIndex((item) => item.id === over?.id);
      reorderLinks(arrayMove(links, oldIndex, newIndex));
    }
  };

  const handleAddLink = () => {
    addLink({
      id: crypto.randomUUID(),
      title: "",
      url: "",
      icon: "link",
      isActive: true,
      image: "",
    });
  };

  const activeLinks = links.filter(l => l.isActive);

  return (
    <div className="space-y-10">
      {/* Links Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-base font-semibold text-white tracking-tight">Your Links</h2>
                {activeLinks.length > 0 && (
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {activeLinks.map((link) => {
                            const Icon = iconMap[link.icon] || Globe;
                            return (
                                <div key={link.id} className="w-5 h-5 rounded bg-zinc-900 flex items-center justify-center border border-zinc-800" title={link.title}>
                                    <Icon className="w-3 h-3 text-zinc-400" />
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <Button onClick={handleAddLink} size="sm" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-900/20">
                <Plus className="w-4 h-4 mr-2" /> Add Link
            </Button>
        </div>

        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext 
                items={links}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-3">
                    {links.map((link) => (
                        <LinkCard key={link.id} link={link} />
                    ))}
                    
                    {links.length === 0 && (
                        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-black/40">
                            <p className="text-zinc-600 text-xs">No links yet. Start building your page.</p>
                        </div>
                    )}
                </div>
            </SortableContext>
        </DndContext>
      </div>

      {/* Socials Section */}
      <div className="pt-6 border-t border-zinc-900">
        <SocialsEditor />
      </div>
    </div>
  );
}
