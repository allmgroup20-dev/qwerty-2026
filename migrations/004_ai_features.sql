-- AI Smart Router Features — New tables
-- Cloudflare D1 (SQLite)

CREATE TABLE IF NOT EXISTS ai_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'new',
  priority_score INTEGER DEFAULT 0,
  source TEXT DEFAULT 'whatsapp',
  gender_guess TEXT,
  age_group_guess TEXT,
  sector TEXT,
  language TEXT DEFAULT 'bn',
  pain_points TEXT,
  interests TEXT,
  total_chats INTEGER DEFAULT 0,
  last_chat_at TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ai_leads_status ON ai_leads(status);
CREATE INDEX IF NOT EXISTS idx_ai_leads_priority ON ai_leads(priority_score);
