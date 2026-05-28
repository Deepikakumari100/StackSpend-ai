import { POST as auditPost } from '../app/api/audit/route';
import { POST as leadPost } from '../app/api/lead/route';

describe('API routes', () => {
  it('returns an audit result for valid payload', async () => {
    const request = new Request('http://localhost/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tools: [
          { name: 'chatgpt', plan: 'team', seats: 2, monthlySpend: 120 }
        ]
      })
    });

    const response = await auditPost(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.monthlySavings).toBeGreaterThanOrEqual(0);
    expect(body.slug).toBeDefined();
  });

  it('captures a lead when email delivery is not configured', async () => {
    delete process.env.RESEND_API_KEY;

    const request = new Request('http://localhost/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'buyer@example.com',
        company: 'Acme Inc',
        role: 'Engineering Manager'
      })
    });

    const response = await leadPost(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.emailStatus).toBe('skipped');
  });
});
