import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 text-center">
        
       

            
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
          Your digital identity, <br />
          <span className="text-zinc-500">simplified.</span>
        </h1>

                <p className="mx-auto max-w-xl text-lg text-zinc-400 mb-10 leading-relaxed">
          LinkVibe is the professional link-in-bio tool for creators who value
          design and performance. Connect your audience to what matters most.
        </p>

        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 text-base font-medium">
            <Link href="/signup">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-zinc-800 bg-black hover:bg-zinc-900 text-zinc-300 hover:text-white px-8 text-base font-medium">
            <Link href="#features">Learn more</Link>
          </Button>
        </div>
      </div>

      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
    </section>
  );
}
