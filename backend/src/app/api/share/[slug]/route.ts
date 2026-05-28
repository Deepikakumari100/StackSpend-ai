import { NextResponse } from 'next/server';
import { getAuditBySlug } from '../../../../services/audit.service';
import { error } from '../../../../lib/logger';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const audit = await getAuditBySlug(params.slug);
    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    return NextResponse.json({ audit });
  } catch (err) {
    error('Share slug route error', err);
    return NextResponse.json({ error: 'Unable to load audit' }, { status: 500 });
  }
}
