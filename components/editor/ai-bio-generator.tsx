"use client";

import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AIBioGenerator() {
  const [bioInput, setBioInput] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
          AI Bio Assistant
        </h3>
      </div>

      <div className="relative group">
        <Textarea
          placeholder="Describe your vibe (e.g. Designer based in NYC, coffee lover...)"
          value={bioInput}
          onChange={(e) => setBioInput(e.target.value)}
          className="bg-[#050505] border-zinc-900 text-sm min-h-[120px] p-4 pr-12 resize-none rounded-xl transition-all duration-200 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-600 outline-none"
        />
        
        <div className="absolute right-3 bottom-3">
          <Button
            size="icon"
            className="h-8 w-8 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            <Wand2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-[10px] text-zinc-600 italic px-1">
        Press the wand to magic up your bio.
      </p>
    </div>
  );
}