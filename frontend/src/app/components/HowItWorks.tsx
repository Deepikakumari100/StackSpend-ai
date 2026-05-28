import { motion } from 'framer-motion';
import { Upload, Sparkles, FileText, Share2 } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Enter Your Tools',
    description: 'Tell us about your current AI tool subscriptions, plans, and usage patterns.',
  },
  {
    icon: Sparkles,
    title: 'AI Analysis',
    description: 'Our AI analyzes your spend, identifies overlaps, and finds optimization opportunities.',
  },
  {
    icon: FileText,
    title: 'Get Recommendations',
    description: 'Receive detailed recommendations with savings estimates and confidence scores.',
  },
  {
    icon: Share2,
    title: 'Share & Implement',
    description: 'Export your report, share with your team, and start saving immediately.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">How It Works</h2>
          <p className="text-lg text-zinc-400">
            Get AI spend insights in four simple steps
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.05]">
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <step.icon className="size-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 translate-x-full bg-gradient-to-r from-white/20 to-transparent lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
