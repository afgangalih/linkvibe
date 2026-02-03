"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProfileForm } from "@/components/editor/profile-form";
import { LinksEditor } from "@/components/editor/links-editor";
import { PreviewCanvas } from "@/components/editor/preview-canvas";
import { DesignPanel } from "@/components/editor/design-panel";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function EditorPage() {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden text-white">
      <EditorNavbar />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        <div className="flex-1 lg:flex-[0.30] min-w-0 border-r border-zinc-900 bg-black relative z-10 flex flex-col">
          <div className="px-6 py-4 border-b border-zinc-900 bg-black sticky top-0 z-20">
            <h2 className="text-sm font-semibold text-white tracking-wider">Content</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="w-full max-w-xl mx-auto p-6 space-y-8 pb-32">
              <ProfileForm />
              <div className="h-px bg-zinc-900 my-6" />
              <LinksEditor />
            </div>
          </ScrollArea>
        </div>

        <div className="lg:flex-[0.40] bg-[#050505] flex items-center justify-center relative overflow-hidden border-r border-zinc-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
          
          <div className="relative w-full h-full flex flex-col">
            <div className="absolute top-4 left-0 w-full flex justify-center z-10">
              <div className="flex items-center gap-1 bg-zinc-900/80 backdrop-blur rounded-full border border-zinc-800 p-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6 rounded-full text-zinc-400 hover:text-white"
                  onClick={handleZoomOut}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span 
                  className="text-[10px] font-medium text-zinc-400 w-10 text-center cursor-pointer" 
                  onClick={handleResetZoom}
                >
                  {Math.round(zoom * 100)}%
                </span>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6 rounded-full text-zinc-400 hover:text-white"
                  onClick={handleZoomIn}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <PreviewCanvas scale={zoom} />
          </div>
        </div>
        
        <div className="hidden lg:flex lg:flex-[0.30] min-w-0 bg-black flex-col">
          <DesignPanel />
        </div>
      
      </div>
    </div>
  );
}