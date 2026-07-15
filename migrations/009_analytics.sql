-- User feedback on brain responses
CREATE TABLE IF NOT EXISTS agent_feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  message_id TEXT DEFAULT '',
  intent TEXT DEFAULT '',
  department TEXT DEFAULT '',
  rating INTEGER DEFAULT 0 CHECK(rating >= 0 AND rating <= 5),
  feedback_text TEXT DEFAULT '',
  model_used TEXT DEFAULT '',
  processing_ms INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_feedback_phone ON agent_feedback(phone);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON agent_feedback(rating);
CREATE INDEX IF NOT EXISTS idx_feedback_dept ON agent_feedback(department);
CREATE INDEX IF NOT EXISTS idx_feedback_created ON agent_feedback(created_at);

-- Token usage ledger for cost analytics
CREATE TABLE IF NOT EXISTS token_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL DEFAULT '',
  agent_id TEXT DEFAULT '',
  department TEXT DEFAULT '',
  model TEXT DEFAULT '',
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  cost_estimate REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_token_phone ON token_usage(phone);
CREATE INDEX IF NOT EXISTS idx_token_dept ON token_usage(department);
CREATE INDEX IF NOT EXISTS idx_token_model ON token_usage(model);
CREATE INDEX IF NOT EXISTS idx_token_created ON token_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_token_agent ON token_usage(agent_id);
