import { calculateToolMonthlyCost, comparePlans, fallbackPlans, getToolPrice } from './pricing';
import type { AuditRequest, AuditResult, Recommendation, AuditToolInput } from '../types/audit';

function normalizeToolName(value: string) {
  return value.trim().toLowerCase();
}

function recommendPlan(tool: AuditToolInput): Recommendation {
  const name = normalizeToolName(tool.name);
  const currentCost = calculateToolMonthlyCost(name, tool.plan, tool.seats);
  const savingsRules: { plan: string; reason: string }[] = [];

  if (name === 'chatgpt') {
    if (tool.plan.toLowerCase() === 'team' && tool.seats <= 2) {
      savingsRules.push({ plan: 'plus', reason: 'Collaboration features are underutilized for a small team.' });
    }
    if (tool.plan.toLowerCase() === 'enterprise' && !tool.enterpriseUsage) {
      const target = tool.seats <= 2 ? 'plus' : 'team';
      savingsRules.push({ plan: target, reason: 'Enterprise tier does not match current AI usage patterns.' });
    }
  }

  if (name === 'cursor') {
    if (tool.plan.toLowerCase() === 'business' && tool.seats < 5) {
      savingsRules.push({ plan: 'pro', reason: 'Business tier is too expensive for a small technical team.' });
    }
    if (tool.plan.toLowerCase() === 'enterprise' && tool.monthlySpend < 200) {
      savingsRules.push({ plan: 'business', reason: 'Enterprise capacity is not justified by current usage.' });
    }
  }

  if (name === 'claude') {
    if (tool.plan.toLowerCase() === 'max' && tool.monthlySpend < 250) {
      savingsRules.push({ plan: 'pro', reason: 'High-end Claude plan is not aligned with observed spend.' });
    }
    if (tool.plan.toLowerCase() === 'team' && tool.seats <= 2) {
      savingsRules.push({ plan: 'pro', reason: 'Team plan has extra features that may not be needed for a small group.' });
    }
  }

  const recommendedPlan = savingsRules.length > 0 ? savingsRules[0].plan : tool.plan;
  const reason = savingsRules.length > 0 ? savingsRules[0].reason : 'Current configuration appears cost efficient for the reported usage.';
  const recommendedCost = calculateToolMonthlyCost(name, recommendedPlan, tool.seats);
  const monthlySavings = Math.max(0, currentCost - recommendedCost);

  return {
    tool: tool.name,
    currentPlan: tool.plan,
    recommendedPlan,
    currentCost,
    recommendedCost,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    reason
  };
}

function calculateBaselineCost(tools: AuditToolInput[]) {
  return tools.reduce((sum, tool) => sum + calculateToolMonthlyCost(normalizeToolName(tool.name), tool.plan, tool.seats), 0);
}

export function generateAudit(payload: AuditRequest): AuditResult {
  const normalizedTools = payload.tools.map((tool) => ({
    ...tool,
    name: normalizeToolName(tool.name),
    plan: tool.plan.trim().toLowerCase()
  }));

  const recommendations = normalizedTools.map(recommendPlan);
  const currentCost = calculateBaselineCost(normalizedTools);
  const optimizedCost = recommendations.reduce((sum, item) => sum + item.recommendedCost, 0);
  const monthlySavings = Math.max(0, currentCost - optimizedCost);
  const annualSavings = monthlySavings * 12;

  const slugBase = normalizedTools.map((item) => item.name).join('-') + '-' + Math.round(currentCost + monthlySavings);
  const slug = `${slugBase}-${Date.now().toString(36)}`.replace(/[^a-z0-9-]/g, '').slice(0, 32);

  return {
    recommendations,
    currentCost,
    optimizedCost,
    monthlySavings,
    annualSavings,
    slug
  };
}
