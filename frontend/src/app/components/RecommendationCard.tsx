import { motion } from 'framer-motion';
import { ArrowRight, TrendingDown, Award } from 'lucide-react';
import type { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

export function RecommendationCard({ recommendation, index }: RecommendationCardProps) {
  const {
    tool,
    currentPlan,
    recommendedPlan,
    monthlySavings,
    annualSavings,
    confidenceScore,
    reasoning,
  } = recommendation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:from-white/[0.05] hover:to-white/[0.02]"
    >
      <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl transition-opacity group-hover:opacity-75" />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-xl font-bold text-white">{tool}</h3>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-400">
                {currentPlan}
              </span>
              <ArrowRight className="size-3" />
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-green-400">
                {recommendedPlan}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg bg-blue-500/10 px-3 py-1.5">
            <Award className="size-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">{confidenceScore}%</span>
          </div>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs text-green-400">
              <TrendingDown className="size-3" />
              Monthly Savings
            </div>
            <div className="text-2xl font-bold text-green-400">
              ${monthlySavings.toLocaleString()}
            </div>
          </div>

          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
            <div className="mb-1 text-xs text-emerald-400">Annual Savings</div>
            <div className="text-2xl font-bold text-emerald-400">
              ${annualSavings.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white/[0.02] p-4">
          <p className="text-sm leading-relaxed text-zinc-300">{reasoning}</p>
        </div>
      </div>
    </motion.div>
  );
}
