-- Agent persistent memory: remembers user context across sessions
CREATE TABLE IF NOT EXISTS agent_memory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  agent_id TEXT NOT NULL DEFAULT '',
  key TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  category TEXT DEFAULT 'general',
  priority INTEGER DEFAULT 0,
  expires_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(phone, agent_id, key)
);

CREATE INDEX IF NOT EXISTS idx_memory_phone ON agent_memory(phone);
CREATE INDEX IF NOT EXISTS idx_memory_agent ON agent_memory(agent_id);
CREATE INDEX IF NOT EXISTS idx_memory_category ON agent_memory(category);
CREATE INDEX IF NOT EXISTS idx_memory_phone_agent ON agent_memory(phone, agent_id);
CREATE INDEX IF NOT EXISTS idx_memory_expires ON agent_memory(expires_at);

-- Scheduled agent tasks (cron-like)
CREATE TABLE IF NOT EXISTS agent_schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL DEFAULT '',
  agent_id TEXT NOT NULL,
  task_type TEXT NOT NULL DEFAULT 'report',
  cron_expression TEXT NOT NULL DEFAULT '0 9 * * *',
  params TEXT DEFAULT '{}',
  enabled INTEGER DEFAULT 1,
  last_run_at TEXT,
  next_run_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_schedule_next ON agent_schedule(next_run_at);
CREATE INDEX IF NOT EXISTS idx_schedule_enabled ON agent_schedule(enabled);
CREATE INDEX IF NOT EXISTS idx_schedule_phone ON agent_schedule(phone);
