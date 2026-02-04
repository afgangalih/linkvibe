"use client";

import { Button } from "@/components/ui/button";
import { Eye, Share2, MoreHorizontal, User, CheckCircle2, RotateCw } from "lucide-react";
import { useLinkStore } from "@/store/use-link-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function EditorNavbar() {
  const syncStatus = useLinkStore((state) => state.syncStatus);
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="h-16 w-full border-b border-zinc-900 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Brand & Context */}
      <div className="flex items-center gap-4">
        <span className="text-white font-bold tracking-tighter text-xl">LinkVibe</span>
        <div className="h-4 w-[1px] bg-zinc-800 hidden md:block" />
        <div className="hidden md:flex items-center gap-2">
           {syncStatus === 'saving' ? (
                <div className="flex items-center gap-2 text-zinc-500">
                    <RotateCw className="w-3 h-3 animate-spin" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Syncing...</span>
                </div>
           ) : syncStatus === 'saved' ? (
                <div className="flex items-center gap-2 text-zinc-500">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-green-500/80">Changes Saved</span>
                </div>
           ) : (
             <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">Ready</span>
           )}
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
              <DropdownMenuItem 
                className="focus:bg-red-950 focus:text-red-400"
                onClick={handleSignOut}
              >
                Sign Out
              </DropdownMenuItem>
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