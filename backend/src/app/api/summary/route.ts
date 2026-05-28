import { NextResponse } from 'next/server';
import { summarySchema } from '../../../lib/validator';
import { generateSummary } from '../../../services/anthropic.service';
import { error } from '../../../lib/logger';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = summarySchema.parse(payload);
    const summary = await generateSummary(data.context);
    return NextResponse.json({ summary });
  } catch (err) {
    error('Summary route error', err);
    return NextResponse.json(
      { summary: 'Summary generation is temporarily unavailable.' },
      { status: 200 }
    );
  }
}
