import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Youtube, Music2, ExternalLink } from "lucide-react";

const profileLinks = [
  { label: "My Portfolio", icon: ExternalLink },
  { label: "YouTube Channel", icon: Youtube },
  { label: "Instagram", icon: Instagram },
  { label: "Spotify Playlist", icon: Music2 },
];

function PhonePreview() {
  return (
    <div className="w-[280px] md:w-[300px] flex-shrink-0">
      <div className="rounded-[3rem] border border-zinc-800 bg-zinc-950 p-3 shadow-2xl">
        <div className="rounded-[2.4rem] bg-black overflow-hidden">
          <div className="flex items-center justify-between px-8 pt-4 pb-2">
            <span className="text-[10px] text-zinc-500 font-medium">9:41</span>
            <div className="w-20 h-5 bg-zinc-900 rounded-full" />
            <div className="flex gap-1">
              <div className="w-3.5 h-2 bg-zinc-700 rounded-sm" />
            </div>
          </div>

          <div className="px-6 pt-6 pb-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/80 to-blue-400/60 p-[2px] mb-4">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary/70">A</span>
              </div>
            </div>

            <h3 className="text-white font-bold text-base mb-1">@alexcreates</h3>
            <p className="text-zinc-500 text-xs text-center mb-6 max-w-[180px] leading-relaxed">
              Designer & Creator. Making things people love.
            </p>

            <div className="w-full space-y-2.5">
              {profileLinks.map((link, i) => (
                <div
                  key={link.label}
                  className={`w-full rounded-xl border px-4 py-3 flex items-center gap-3 transition-colors ${
                    i === 0
                      ? "bg-primary/10 border-primary/30 text-white"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400"
                  }`}
                >
                  <link.icon className={`w-4 h-4 flex-shrink-0 ${i === 0 ? "text-primary" : "text-zinc-600"}`} />
                  <span className="text-sm font-medium flex-1">{link.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-40" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pb-2">
            <div className="w-28 h-1 bg-zinc-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-black overflow-hidden pt-28 pb-16">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          <div className="flex-1 max-w-lg">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">
                LinkVibe
              </span>
              <div className="h-px w-10 bg-zinc-800" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              One link for<br />
              <span className="text-primary">everything</span> you create.
            </h1>

            <p className="text-lg text-zinc-500 mb-10 max-w-md leading-relaxed">
              Build a stunning link-in-bio page that reflects your brand. No code, no clutter, just results.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm tracking-wide transition-colors"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              <Link
                href="#features"
                className="text-sm text-zinc-600 hover:text-zinc-300 font-medium transition-colors"
              >
                Explore Features
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 flex justify-center">
            <PhonePreview />
          </div>

        </div>
      </div>
    </section>
  );
}
