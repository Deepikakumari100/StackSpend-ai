import { calculateToolMonthlyCost } from '../lib/pricing';

describe('pricing model', () => {
  it('calculates tool cost using seats and plan', () => {
    const totalCost = calculateToolMonthlyCost('chatgpt', 'team', 3);
    expect(totalCost).toBe(90);
  });
});
