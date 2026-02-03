import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-white">LinkVibe</h3>
            <p className="text-sm text-zinc-500">
              The professional Link-in-Bio platform for creators and businesses.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium text-white">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="#features" className="hover:text-white transition-colors">Features</Link>
              <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="#" className="hover:text-white transition-colors">Changelog</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium text-white">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium text-white">Legal</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} LinkVibe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
