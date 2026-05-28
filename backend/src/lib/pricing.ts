import { PlanCostMap, PricingSchema } from '../types/pricing';

export const pricingData: PricingSchema = {
  chatgpt: {
    plus: 20,
    team: 30,
    enterprise: 60
  },
  cursor: {
    pro: 20,
    business: 40,
    enterprise: 75
  },
  claude: {
    pro: 20,
    team: 30,
    max: 100
  }
};

export function getToolPrice(tool: string, plan: string) {
  const toolKey = tool.toLowerCase();
  const planKey = plan.toLowerCase();
  return pricingData[toolKey]?.[planKey] ?? 0;
}

export function calculateToolMonthlyCost(tool: string, plan: string, seats: number) {
  const unitCost = getToolPrice(tool, plan);
  return unitCost * Math.max(1, seats);
}

export function comparePlans(tool: string, planA: string, planB: string, seats: number) {
  return calculateToolMonthlyCost(tool, planA, seats) - calculateToolMonthlyCost(tool, planB, seats);
}

export const fallbackPlans: Record<string, string> = {
  chatgpt: 'plus',
  cursor: 'pro',
  claude: 'pro'
};

export const validToolPlans: Record<string, string[]> = {
  chatgpt: ['plus', 'team', 'enterprise'],
  cursor: ['pro', 'business', 'enterprise'],
  claude: ['pro', 'team', 'max']
};
