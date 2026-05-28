import type { Recommendation, ToolUsage, Plan } from '../types';

export const mockCompanies = [
  { name: 'Acme AI', logo: '🚀' },
  { name: 'TechFlow', logo: '⚡' },
  { name: 'DataSync', logo: '📊' },
  { name: 'CloudBase', logo: '☁️' },
  { name: 'DevTools Inc', logo: '🔧' },
  { name: 'CodeLab', logo: '💻' },
];

// Plan pricing data (monthly per seat)
const PLAN_PRICING: Record<string, Record<Plan, number>> = {
  ChatGPT: {
    Free: 0,
    Plus: 20,
    Pro: 20,
    Team: 25,
    Enterprise: 60,
    'API Pay-as-you-go': 0,
    'API Usage-based': 0,
  },
  Claude: {
    Free: 0,
    Plus: 0,
    Pro: 20,
    Team: 30,
    Enterprise: 60,
    'API Pay-as-you-go': 0,
    'API Usage-based': 0,
  },
  Cursor: {
    Free: 0,
    Plus: 0,
    Pro: 20,
    Team: 40,
    Enterprise: 0,
    'API Pay-as-you-go': 0,
    'API Usage-based': 0,
  },
  'GitHub Copilot': {
    Free: 0,
    Plus: 0,
    Pro: 10,
    Team: 19,
    Enterprise: 39,
    'API Pay-as-you-go': 0,
    'API Usage-based': 0,
  },
  Gemini: {
    Free: 0,
    Plus: 0,
    Pro: 20,
    Team: 30,
    Enterprise: 0,
    'API Pay-as-you-go': 0,
    'API Usage-based': 0,
  },
  'OpenAI API': {
    Free: 0,
    Plus: 0,
    Pro: 0,
    Team: 0,
    Enterprise: 0,
    'API Pay-as-you-go': 0,
    'API Usage-based': 0,
  },
  'Anthropic API': {
    Free: 0,
    Plus: 0,
    Pro: 0,
    Team: 0,
    Enterprise: 0,
    'API Pay-as-you-go': 0,
    'API Usage-based': 0,
  },
  Windsurf: {
    Free: 0,
    Plus: 0,
    Pro: 15,
    Team: 30,
    Enterprise: 0,
    'API Pay-as-you-go': 0,
    'API Usage-based': 0,
  },
};

function getRecommendedPlan(usage: ToolUsage): Plan {
  const { tool, plan, seats, teamSize } = usage;

  // Team plans optimization
  if (plan === 'Team' && seats <= 3) {
    return 'Pro';
  }

  // Enterprise downgrades
  if (plan === 'Enterprise' && teamSize < 20) {
    return 'Team';
  }

  // API optimization
  if (plan === 'API Pay-as-you-go') {
    return 'API Usage-based';
  }

  // Default to one tier lower
  const planHierarchy: Plan[] = ['Free', 'Plus', 'Pro', 'Team', 'Enterprise'];
  const currentIndex = planHierarchy.indexOf(plan);
  if (currentIndex > 1) {
    return planHierarchy[currentIndex - 1];
  }

  return plan;
}

function calculateSavings(usage: ToolUsage, recommendedPlan: Plan): number {
  const { tool, plan, seats, monthlySpend } = usage;

  // Use actual spend if provided
  if (monthlySpend > 0) {
    const pricing = PLAN_PRICING[tool];
    if (pricing) {
      const currentPrice = pricing[plan] * seats;
      const recommendedPrice = pricing[recommendedPlan] * seats;
      if (currentPrice > 0 && recommendedPrice >= 0) {
        return Math.max(0, currentPrice - recommendedPrice);
      }
    }
    // Estimate 20-40% savings
    return monthlySpend * (0.2 + Math.random() * 0.2);
  }

  // Fallback to plan-based pricing
  const pricing = PLAN_PRICING[tool];
  if (pricing) {
    const currentPrice = pricing[plan] * seats;
    const recommendedPrice = pricing[recommendedPlan] * seats;
    return Math.max(0, currentPrice - recommendedPrice);
  }

  return 0;
}

function getReasoningText(usage: ToolUsage, recommendedPlan: Plan): string {
  const { tool, plan, seats, teamSize, useCase } = usage;

  if (plan === 'Team' && seats <= 3) {
    return `Your team size (${seats} seats) doesn't justify the Team plan premium. Individual ${recommendedPlan} subscriptions offer better value with your usage volume while maintaining full functionality.`;
  }

  if (plan === 'Enterprise' && teamSize < 20) {
    return `With a team size of ${teamSize}, the ${recommendedPlan} plan provides all necessary features at a lower cost. Enterprise features are designed for larger organizations.`;
  }

  if (plan === 'API Pay-as-you-go') {
    return 'Optimize API calls with caching and reduce redundant requests. Switch to batch processing for non-urgent tasks to lower per-request costs.';
  }

  if (useCase === 'Code Generation') {
    return `For ${useCase.toLowerCase()} workflows, the ${recommendedPlan} tier provides sufficient capabilities. Consider using API for high-volume tasks to optimize costs.`;
  }

  return `Based on your usage patterns for ${useCase.toLowerCase()}, ${recommendedPlan} offers the same core functionality at a lower price point. The premium tier features appear underutilized.`;
}

export function generateRecommendations(toolUsages: ToolUsage[]): Recommendation[] {
  return toolUsages.map((usage) => {
    const recommendedPlan = getRecommendedPlan(usage);
    const monthlySavings = calculateSavings(usage, recommendedPlan);
    const annualSavings = monthlySavings * 12;

    // Calculate confidence based on data quality
    let confidence = 75;
    if (usage.monthlySpend > 0) confidence += 10;
    if (usage.seats > 1) confidence += 5;
    if (monthlySavings > 0) confidence += 10;
    confidence = Math.min(95, confidence);

    return {
      tool: usage.tool,
      currentPlan: usage.plan,
      recommendedPlan,
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      confidenceScore: confidence,
      reasoning: getReasoningText(usage, recommendedPlan),
    };
  }).filter(rec => rec.monthlySavings > 0 || rec.currentPlan !== rec.recommendedPlan);
}
