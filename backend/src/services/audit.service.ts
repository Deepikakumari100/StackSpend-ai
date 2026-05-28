import { randomUUID } from 'crypto';
import { supabase, hasSupabase } from '../lib/supabase';
import { slugify } from '../lib/utils';
import type { AuditRequest, AuditResult, AuditRecord } from '../types/audit';

const fallbackAuditStore = new Map<string, AuditRecord>();

export async function saveAudit(payload: AuditRequest, result: AuditResult) {
  const slug = slugify(`${payload.company ?? 'audit'}-${Date.now()}`);
  const record: AuditRecord = {
    id: randomUUID(),
    slug,
    payload,
    result,
    monthlySavings: result.monthlySavings,
    annualSavings: result.annualSavings,
    createdAt: new Date().toISOString()
  };

  if (hasSupabase && supabase) {
    const { data, error } = await supabase
      .from('audits')
      .insert({
        slug: record.slug,
        payload: record.payload,
        result: record.result,
        monthly_savings: record.monthlySavings,
        annual_savings: record.annualSavings
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      ...record,
      id: data.id,
      createdAt: data.created_at
    };
  }

  fallbackAuditStore.set(record.slug, record);
  return record;
}

export async function getAuditBySlug(slug: string) {
  if (hasSupabase && supabase) {
    const { data, error } = await supabase
      .from('audits')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      return null;
    }

    return {
      id: data.id,
      slug: data.slug,
      payload: data.payload,
      result: data.result,
      monthlySavings: Number(data.monthly_savings),
      annualSavings: Number(data.annual_savings),
      createdAt: data.created_at
    } as AuditRecord;
  }

  return fallbackAuditStore.get(slug) ?? null;
}
