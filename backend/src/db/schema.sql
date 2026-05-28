CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  payload JSONB NOT NULL,
  result JSONB NOT NULL,
  monthly_savings NUMERIC NOT NULL,
  annual_savings NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  team_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
