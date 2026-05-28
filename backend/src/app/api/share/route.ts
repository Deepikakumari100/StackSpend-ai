import { NextResponse } from 'next/server';
import { getAuditBySlug } from '../../../services/audit.service';
import { error } from '../../../lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'Missing audit slug' }, { status: 400 });
    }

    const audit = await getAuditBySlug(slug);
    if (!audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    return NextResponse.json({ audit });
  } catch (err) {
    error('Share route error', err);
    return NextResponse.json({ error: 'Unable to fetch shared audit' }, { status: 500 });
  }
}
