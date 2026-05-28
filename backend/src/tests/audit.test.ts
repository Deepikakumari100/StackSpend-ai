import { generateAudit } from '../lib/audit-engine';

describe('audit engine', () => {
  it('recommend a downgrade for ChatGPT Team with 2 seats', () => {
    const result = generateAudit({
      tools: [
        {
          name: 'chatgpt',
          plan: 'team',
          seats: 2,
          monthlySpend: 100,
          enterpriseUsage: false
        }
      ]
    });

    expect(result.recommendations[0].recommendedPlan).toBe('plus');
    expect(result.monthlySavings).toBeGreaterThan(0);
  });
});
