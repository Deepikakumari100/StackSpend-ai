import { NextResponse } from 'next/server';
import { auditSchema } from '../../../lib/validator';
import { generateAudit } from '../../../lib/audit-engine';
import { saveAudit } from '../../../services/audit.service';
import { isRateLimited } from '../../../lib/rate-limit';
import { error } from '../../../lib/logger';
import { sendAuditResultEmail } from '../../../services/email.service';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const payload = await request.json();
    const data = auditSchema.parse(payload);
    const auditResult = generateAudit(data);
    const savedRecord = await saveAudit(data, auditResult);

    await sendAuditResultEmail(
        data.email ?? 'demo@example.com',
        data.company ?? 'User',
        `$${auditResult.annualSavings.toLocaleString()}`,
        `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/audit/${savedRecord.slug}`
      );

    return NextResponse.json({ ...auditResult, slug: savedRecord.slug });
  } catch (err) {
    error('Audit route error', err);
    return NextResponse.json({ error: 'Invalid audit submission' }, { status: 400 });
  }
}
