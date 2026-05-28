CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  team_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
