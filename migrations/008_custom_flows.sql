-- Custom agent chain flows — drag-and-drop chain definitions
CREATE TABLE IF NOT EXISTS custom_flows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  steps TEXT NOT NULL DEFAULT '[]',
  department_ids TEXT DEFAULT '',
  created_by TEXT DEFAULT '',
  is_active INTEGER DEFAULT 1,
  run_count INTEGER DEFAULT 0,
  last_run_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_flows_active ON custom_flows(is_active);
CREATE INDEX IF NOT EXISTS idx_flows_created ON custom_flows(created_at);

-- Flow execution log
CREATE TABLE IF NOT EXISTS flow_executions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flow_id INTEGER NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'running' CHECK(status IN ('running','completed','failed')),
  current_step INTEGER DEFAULT 0,
  total_steps INTEGER DEFAULT 0,
  steps_log TEXT DEFAULT '[]',
  result TEXT DEFAULT '',
  started_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_flow_exec_flow ON flow_executions(flow_id);
CREATE INDEX IF NOT EXISTS idx_flow_exec_phone ON flow_executions(phone);
CREATE INDEX IF NOT EXISTS idx_flow_exec_status ON flow_executions(status);
