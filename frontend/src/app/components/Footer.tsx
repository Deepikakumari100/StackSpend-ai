import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-zinc-950/30 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Zap className="size-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">StackSpend</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-xs">
              Finance-grade AI spend optimization. Get instant recommendations to reduce your AI tool costs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Methodology
                </a>
              </li>
              <li>
                <a
                  href="#audit"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-center text-sm text-zinc-500">
            © 2026 StackSpend. Built with Next.js and Claude AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
