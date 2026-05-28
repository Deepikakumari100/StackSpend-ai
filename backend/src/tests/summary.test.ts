import { generateSummary } from '../services/anthropic.service';

describe('summary service', () => {
  it('returns a fallback message when AI is unavailable', async () => {
    const summary = await generateSummary('A short audit context.');
    expect(typeof summary).toBe('string');
    expect(summary.length).toBeGreaterThan(0);
  });
});
