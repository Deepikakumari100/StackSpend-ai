import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 
      border-b border-white/5 
      bg-zinc-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex size-9 items-center justify-center rounded-lg 
            bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-600 
            transition-transform group-hover:scale-105">
              <Zap className="size-5 text-white" />
            </div>

            <span className="text-xl font-bold text-white">
              StackSpend
            </span>
          </Link>

          {/* LINKS */}
          <div className="flex items-center gap-8">

            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:block"
            >
              How it works
            </a>

            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:block"
            >
              Methodology
            </a>

            {/* 🔥 HYBRID CTA BUTTON */}
            <a
              href="#audit"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-xl px-5 py-2 text-sm font-semibold 
              text-white 
              bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 
              shadow-lg shadow-purple-500/20 
              transition-all hover:scale-105 hover:shadow-purple-500/40"
            >
              Run Free Audit
            </a>

          </div>
        </div>
      </div>
    </motion.nav>
  );
}