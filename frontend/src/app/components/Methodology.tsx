import { motion } from 'framer-motion';
import { Shield, TrendingUp, Database, Zap } from 'lucide-react';

const methodology = [
  {
    icon: Database,
    title: 'Pricing Intelligence',
    description:
      'We maintain an up-to-date database of all major AI tool pricing plans, features, and usage limits across ChatGPT, Claude, Cursor, Copilot, and more.',
  },
  {
    icon: TrendingUp,
    title: 'Usage Pattern Analysis',
    description:
      'Our algorithms analyze your team size, seats, and use cases to identify underutilized features and redundant subscriptions.',
  },
  {
    icon: Zap,
    title: 'Optimization Engine',
    description:
      'We match your requirements with the most cost-effective plan combinations, considering volume discounts and API alternatives.',
  },
  {
    icon: Shield,
    title: 'Confidence Scoring',
    description:
      'Each recommendation includes a confidence score based on data quality, market pricing stability, and implementation complexity.',
  },
];

export function Methodology() {
  return (
    <section id="pricing" className="border-y border-white/5 bg-white/[0.02] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Our Methodology</h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Finance-grade analysis powered by real-time pricing data and AI optimization algorithms
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {methodology.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10">
                <item.icon className="size-6 text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-zinc-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-8 text-center backdrop-blur-sm"
        >
          <h3 className="mb-2 text-xl font-semibold text-white">Transparent & Unbiased</h3>
          <p className="text-zinc-400">
            We're not affiliated with any AI tool vendors. Our recommendations are based purely on data analysis and your specific needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
