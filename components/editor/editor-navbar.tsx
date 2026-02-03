"use client";

import { Button } from "@/components/ui/button";
import { Eye, Share2, MoreHorizontal, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function EditorNavbar() {
  return (
    <header className="h-16 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Brand & Context */}
      <div className="flex items-center gap-4">
        <span className="text-white font-bold tracking-tighter text-xl">LinkVibe</span>
        <div className="h-4 w-[1px] bg-zinc-800 hidden md:block" />
        <div className="hidden md:flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2].map((i) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center">
                <User className="w-2.5 h-2.5 text-zinc-500" />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-zinc-500 font-medium">Viewing as Editor</span>
        </div>
      </div>

     

      {/* Action Suite */}
      <div className="flex items-center gap-2">
        <div className="flex items-center mr-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white transition-colors">
            <Eye className="w-4 h-4" />
          </Button>
          <div className="h-4 w-[1px] bg-zinc-800 mx-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-zinc-400">
              <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white">Analytics</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white">Settings</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-red-950 focus:text-red-400">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button className="h-9 px-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-900/10 active:scale-95">
          <Share2 className="w-3.5 h-3.5 mr-2" />
          Publish
        </Button>
      </div>
    </header>
  );
}