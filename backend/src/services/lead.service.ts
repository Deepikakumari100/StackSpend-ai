import { randomUUID } from 'crypto';
import { supabase, hasSupabase } from '../lib/supabase';
import type { LeadRequest, LeadRecord } from '../types/lead';

const fallbackLeadStore = new Map<string, LeadRecord>();

export async function saveLead(lead: LeadRequest) {
  const record: LeadRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...lead
  };

  if (hasSupabase && supabase) {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        email: record.email,
        company: record.company,
        role: record.role,
        team_size: record.teamSize
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      email: data.email,
      company: data.company,
      role: data.role,
      teamSize: data.team_size,
      createdAt: data.created_at
    };
  }

  fallbackLeadStore.set(record.id, record);
  return record;
}
