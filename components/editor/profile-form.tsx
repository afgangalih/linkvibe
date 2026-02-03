"use client";

import { useLinkStore } from "@/store/use-link-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProfileForm() {
  const profile = useLinkStore((state) => state.profile);
  const setProfile = useLinkStore((state) => state.setProfile);

  return (
    <div className="space-y-6 p-6 bg-[#09090b] border border-zinc-800/50 rounded-2xl">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Profile</h2>
        <p className="text-sm text-zinc-400">Manage your public profile information.</p>
      </div>

      <div className="space-y-4">
        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-zinc-300">Username</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">linkvibe.com/</span>
            <Input
              id="username"
              value={profile.username}
              onChange={(e) => setProfile({ username: e.target.value })}
              className="pl-28 bg-black/50 border-zinc-800 text-white focus:border-blue-600 focus:ring-0 rounded-xl"
              placeholder="username"
            />
          </div>
        </div>

        {/* Display Name */}
        <div className="space-y-2">
            <Label htmlFor="displayName" className="text-zinc-300">Display Name</Label>
            <Input
                id="displayName"
                value={profile.displayName || ""}
                onChange={(e) => setProfile({ displayName: e.target.value })}
                className="bg-black/50 border-zinc-800 text-white focus:border-blue-600 focus:ring-0 rounded-xl"
                placeholder="e.g. Sarah Smith"
            />
        </div>

        {/* Bio */}
        <div className="space-y-2">
            <Label htmlFor="bio" className="text-zinc-300">Bio</Label>
            <Textarea
                id="bio"
                value={profile.bio || ""}
                onChange={(e) => setProfile({ bio: e.target.value })}
                className="bg-black/50 border-zinc-800 text-white focus:border-blue-600 focus:ring-0 rounded-xl min-h-[100px] resize-none"
                placeholder="Tell your story..."
            />
        </div>
      </div>
    </div>
  );
}
