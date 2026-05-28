import { NextResponse } from 'next/server';
import { leadSchema } from '../../../lib/validator';
import { saveLead } from '../../../services/lead.service';
import { sendLeadEmail } from '../../../services/email.service';
import { error } from '../../../lib/logger';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = leadSchema.parse(payload);
    const created = await saveLead(data);
    const emailResult = await sendLeadEmail(created.email, created.company ?? 'StackSpend Lead', created.role ?? 'Team member');

    return NextResponse.json({
      success: true,
      lead: created,
      emailStatus: emailResult.status,
      emailMessage: emailResult.message
    });
  } catch (err) {
    error('Lead route error', err);

    if (err instanceof Error) {
      const status = err.name === 'ZodError' ? 400 : 500;
      return NextResponse.json({ error: err.message }, { status });
    }

    return NextResponse.json({ error: 'Invalid lead submission' }, { status: 400 });
  }
}
