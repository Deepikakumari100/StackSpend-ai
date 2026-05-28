import { generateAudit } from '../lib/audit-engine';

describe('recommendation logic', () => {
  it('does not recommend savings when current plan is already efficient', () => {
    const result = generateAudit({
      tools: [
        { name: 'claude', plan: 'pro', seats: 1, monthlySpend: 30 }
      ]
    });
    expect(result.monthlySavings).toBe(0);
    expect(result.recommendations[0].recommendedPlan).toBe('pro');
  });
});
