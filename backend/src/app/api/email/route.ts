import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendAuditResultEmail } from '../../../services/email.service';
import { error } from '../../../lib/logger';

const auditEmailSchema = z.object({
  user_name: z.string().min(1),
  user_email: z.string().email(),
  savings: z.string().min(1),
  report_link: z.string().url(),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = auditEmailSchema.parse(payload);
    const emailResult = await sendAuditResultEmail(
      data.user_email,
      data.user_name,
      data.savings,
      data.report_link
    );

    return NextResponse.json({
      success: true,
      emailStatus: emailResult.status,
      emailMessage: emailResult.message,
    });
  } catch (err) {
    error('Audit email route error', err);

    if (err instanceof Error) {
      const status = err.name === 'ZodError' ? 400 : 500;
      return NextResponse.json({ error: err.message }, { status });
    }

    return NextResponse.json({ error: 'Invalid audit email submission' }, { status: 400 });
  }
}
