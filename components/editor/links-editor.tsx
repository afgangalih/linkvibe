"use client";

import { useLinkStore } from "@/store/use-link-store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">Links</h2>
            <p className="text-sm text-zinc-400">Add and reorder your links.</p>
        </div>
        <Button onClick={handleAddLink} size="sm" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white border-0">
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
                    <div className="text-center py-12 border-2 border-dashed border-zinc-900 rounded-xl bg-[#09090b]/50">
                        <p className="text-zinc-500 text-sm">No links added yet. Click "Add Link" to get started.</p>
                    </div>
                )}
            </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
