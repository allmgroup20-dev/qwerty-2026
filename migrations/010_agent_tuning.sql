-- Agent prompt version history
CREATE TABLE IF NOT EXISTS agent_prompt_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  prompt TEXT NOT NULL,
  source TEXT DEFAULT 'manual',
  feedback_triggered INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  avg_rating_before REAL DEFAULT 0,
  avg_rating_after REAL DEFAULT 0,
  total_feedback_before INTEGER DEFAULT 0,
  total_feedback_after INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_prompt_agent ON agent_prompt_versions(agent_id);
CREATE INDEX IF NOT EXISTS idx_prompt_active ON agent_prompt_versions(agent_id, active);

-- A/B test tracking
CREATE TABLE IF NOT EXISTS agent_ab_tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id TEXT NOT NULL,
  version_a INTEGER NOT NULL,
  version_b INTEGER NOT NULL,
  a_avg_rating REAL DEFAULT 0,
  b_avg_rating REAL DEFAULT 0,
  a_count INTEGER DEFAULT 0,
  b_count INTEGER DEFAULT 0,
  winner TEXT,
  status TEXT DEFAULT 'running',
  started_at TEXT DEFAULT (datetime('now')),
  ended_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_ab_agent ON agent_ab_tests(agent_id);

-- Agent improvement log
CREATE TABLE IF NOT EXISTS agent_tuning_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT DEFAULT '',
  old_prompt TEXT DEFAULT '',
  new_prompt TEXT DEFAULT '',
  rating_before REAL DEFAULT 0,
  rating_after REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tuning_agent ON agent_tuning_log(agent_id);
CREATE INDEX IF NOT EXISTS idx_tuning_created ON agent_tuning_log(created_at);

-- Add prompt_version to agent_feedback for tracking which version was used
ALTER TABLE agent_feedback ADD COLUMN prompt_version INTEGER DEFAULT 0;

-- Feedback analysis cache
CREATE TABLE IF NOT EXISTS agent_feedback_analysis (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id TEXT NOT NULL,
  total_feedback INTEGER DEFAULT 0,
  avg_rating REAL DEFAULT 0,
  positive_count INTEGER DEFAULT 0,
  negative_count INTEGER DEFAULT 0,
  common_issues TEXT DEFAULT '',
  common_praise TEXT DEFAULT '',
  improvement_suggestion TEXT DEFAULT '',
  analyzed_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_analysis_agent ON agent_feedback_analysis(agent_id);
