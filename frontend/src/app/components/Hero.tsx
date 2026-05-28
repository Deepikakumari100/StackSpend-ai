import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full 
            border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <Sparkles className="size-4 text-purple-400" />
            <span className="text-sm text-zinc-300">
              Finance-grade AI spend analysis
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Stop Overpaying for{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              AI Tools
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 sm:text-xl"
          >
            Get a finance-grade audit of your AI stack in 60 seconds. Instant savings analysis, vendor optimization, and shareable reports.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >

            {/* PRIMARY CTA (HYBRID GRADIENT) */}
            <a
              href="#audit"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 rounded-xl 
              bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600 
              px-6 py-3 font-semibold text-white 
              shadow-lg shadow-purple-500/20 
              transition-all hover:scale-105 hover:shadow-purple-500/40"
            >
              Run Free Audit
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>

            {/* SECONDARY CTA */}
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-xl 
              border border-white/10 bg-white/5 px-6 py-3 font-medium 
              text-white backdrop-blur-sm transition-all 
              hover:bg-white/10"
            >
              See How It Works
            </a>

          </motion.div>

          {/* FEATURE PILLS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {[
              'Instant savings analysis',
              'Vendor optimization',
              'AI-generated recommendations',
              'Shareable reports'
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-full border border-white/10 
                bg-white/5 px-4 py-2 text-sm text-zinc-300 
                backdrop-blur-sm hover:border-purple-500/30 transition"
              >
                {feature}
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}