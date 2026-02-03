"use client";

import { useLinkStore } from "@/store/use-link-store";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Github, Instagram, Linkedin, Twitter, Youtube, Facebook, Music } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const socials = [
  { id: "instagram", label: "Instagram", icon: Instagram, placeholder: "instagram.com/username" },
  { id: "twitter", label: "Twitter", icon: Twitter, placeholder: "twitter.com/username" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "linkedin.com/in/username" },
  { id: "github", label: "GitHub", icon: Github, placeholder: "github.com/username" },
  { id: "youtube", label: "YouTube", icon: Youtube, placeholder: "youtube.com/@channel" },
  { id: "facebook", label: "Facebook", icon: Facebook, placeholder: "facebook.com/username" },
];

export function SocialsEditor() {
  const { socials: activeSocials, updateSocial } = useLinkStore();

  const getSocial = (platform: string) => activeSocials.find(s => s.platform === platform);

  const handleToggle = (platform: string, checked: boolean) => {
    const existing = getSocial(platform);
    updateSocial(platform, existing?.url || "", checked);
  };

  const handleChange = (platform: string, url: string) => {
     updateSocial(platform, url, true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-white tracking-tight">Social Icons</h3>
      <div className="bg-[#09090b] border border-zinc-900 rounded-xl overflow-hidden">
         {socials.map((social) => {
             const isActive = getSocial(social.id)?.isActive || false;
             const url = getSocial(social.id)?.url || "";

             return (
                 <div key={social.id} className="border-b border-zinc-900 last:border-0">
                     <div className="p-3 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className={`p-1.5 rounded-lg ${isActive ? 'bg-blue-600/10 text-blue-500' : 'bg-zinc-900 text-zinc-500'}`}>
                                 <social.icon className="w-4 h-4" />
                             </div>
                             <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-zinc-500'}`}>{social.label}</span>
                         </div>
                         <Switch 
                            checked={isActive}
                            onCheckedChange={(checked) => handleToggle(social.id, checked)}
                            className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-zinc-800"
                         />
                     </div>
                     <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-black/40"
                            >
                                <div className="p-3 pt-0">
                                    <Input
                                        value={url}
                                        onChange={(e) => handleChange(social.id, e.target.value)}
                                        placeholder={social.placeholder}
                                        className="h-8 bg-[#050505] border-zinc-800 text-xs text-zinc-300 focus-visible:ring-blue-600/30"
                                    />
                                </div>
                            </motion.div>
                        )}
                     </AnimatePresence>
                 </div>
             )
         })}
      </div>
    </div>
  );
}
