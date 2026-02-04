"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
        // 1. Sign Up
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });
        
        if (signUpError) {
            setError(signUpError.message);
            return;
        }

        if (data.user) {
            // 2. Create Initial Profile
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    username: email.split('@')[0], // Default username
                    display_name: 'New User',
                    updated_at: new Date().toISOString()
                });
            
            if (profileError) {
                console.error("Profile Creation Failed:", profileError);
                // We don't block the user, but we log it. 
                // Alternatively, we could show an error, but let's assume they can fix it in editor.
            }
        }

        // 3. Redirect
        router.push("/editor");
    } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        console.error("Unexpected Error:", err);
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback` 
            }
        });
        if (error) setError(error.message);
    } catch (err) {
        setError("Could not connect to Google.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="absolute top-0 left-0 -mt-16 sm:-ml-12">
        <Button asChild variant="ghost" className="text-zinc-500 hover:text-white hover:bg-transparent pl-0 gap-2">
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center space-y-8 w-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-white text-black flex items-center justify-center font-bold text-xs">L</div>
          <span className="text-lg font-semibold tracking-tight text-white">LinkVibe</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full relative"
        >
          <div className="relative w-full bg-[#09090b]/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-xl font-medium text-white tracking-tight">Create an account</h1>
              <p className="text-sm text-zinc-500 mt-2">Enter your email to get started</p>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-3 text-xs"
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>{error}</p>
                    </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/40 border-zinc-800 text-white focus:border-white/20 focus:ring-0 rounded-xl h-11 transition-all placeholder:text-zinc-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-400 text-xs uppercase tracking-wider font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/40 border-zinc-800 text-white focus:border-white/20 focus:ring-0 rounded-xl h-11 pr-10 transition-all placeholder:text-zinc-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-600 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 pl-1">Must be at least 8 characters long.</p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#09090b] px-2 text-zinc-600">Or</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={handleGoogleLogin}
              className="w-full h-11 rounded-xl bg-transparent border-zinc-700 text-zinc-300 hover:bg-white/5 hover:text-white hover:border-zinc-500 transition-all flex items-center justify-center gap-2"
            >
              <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Google
            </Button>
          </div>
        </motion.div>

        <p className="text-zinc-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-all">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}