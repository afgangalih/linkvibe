import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto bg-zinc-950 border border-zinc-900 rounded-3xl p-12 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] pointer-events-none" />
            
            <h2 className="relative z-10 text-3xl font-bold tracking-tight text-white mb-6">
                Ready to elevate your online presence?
            </h2>
            <p className="relative z-10 text-zinc-400 mb-8 max-w-xl mx-auto">
                Join thousands of creators using LinkVibe to manage their links with style and simplicity.
            </p>
            <Button asChild size="lg" className="relative z-10 h-12 rounded-full bg-white text-black hover:bg-zinc-200 px-8 font-medium">
                <Link href="/signup">Create your page</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
