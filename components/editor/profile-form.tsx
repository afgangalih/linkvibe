import { useState, useEffect } from "react";
import { useLinkStore } from "@/store/use-link-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUpload } from "./avatar-upload";
import { supabase } from "@/lib/supabase";
import { Loader2, Check, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; 

export function ProfileForm() {
  const profile = useLinkStore((state) => state.profile);
  const setProfile = useLinkStore((state) => state.setProfile); 

  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'loading' | 'available' | 'taken'>('idle');
  const [localUsername, setLocalUsername] = useState(profile.username);
  
  useEffect(() => {
      setLocalUsername(profile.username);
  }, [profile.username]);

  useEffect(() => {
    const checkUsername = async () => {
        if (!localUsername || localUsername.length < 3) {
            setUsernameStatus('idle');
            return;
        }

        if (localUsername === profile.username && usernameStatus !== 'taken') {
             setUsernameStatus('idle'); 
             return;
        }

        setUsernameStatus('loading');

        try {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (!currentUser) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('id')
                .eq('username', localUsername)
                .neq('id', currentUser.id)
                .single();

            if (data) {
                setUsernameStatus('taken');
            } else {
                setUsernameStatus('available');
                setProfile({ username: localUsername });
            }
        } catch (error) {
            console.error(error);
            setUsernameStatus('idle');
        }
    };

    const timer = setTimeout(checkUsername, 500);
    return () => clearTimeout(timer);
  }, [localUsername]);

  return (
    <div className="space-y-6 p-6 bg-[#09090b] border border-zinc-800/50 rounded-2xl">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Profile</h2>
        <p className="text-sm text-zinc-400">Manage your public profile information.</p>
      </div>

      <AvatarUpload 
        avatarUrl={profile.avatarUrl}
        onUploadComplete={(url) => setProfile({ avatarUrl: url ?? "" })}
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-zinc-300">Username</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-zinc-500 text-sm">linkvibe.com/</span>
            <Input
              id="username"
              value={localUsername}
              onChange={(e) => setLocalUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
              className={`pl-28 bg-black/50 border-zinc-800 text-white focus:ring-0 rounded-xl ${
                  usernameStatus === 'taken' ? 'border-red-500 focus:border-red-500' : 
                  usernameStatus === 'available' ? 'border-green-500 focus:border-green-500' : 
                  'focus:border-blue-600'
              }`}
              placeholder="username"
            />
            <div className="absolute right-3 top-2.5">
                {usernameStatus === 'loading' && <Loader2 className="w-4 h-4 text-zinc-500 animate-spin" />}
                {usernameStatus === 'available' && <Check className="w-4 h-4 text-green-500" />}
                {usernameStatus === 'taken' && <X className="w-4 h-4 text-red-500" />}
            </div>
          </div>
          {usernameStatus === 'taken' && (
              <p className="text-xs text-red-500 mt-1">Username is already taken.</p>
          )}
        </div>

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
