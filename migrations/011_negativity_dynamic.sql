-- Negativity trigger patterns (which words/phrases trigger negative reactions in Bangladeshi context)
CREATE TABLE IF NOT EXISTS negativity_patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trigger_word TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  severity INTEGER DEFAULT 3 CHECK(severity >= 1 AND severity <= 5),
  context_notes TEXT DEFAULT '',
  alternative_wording TEXT DEFAULT '',
  detected_count INTEGER DEFAULT 0,
  last_detected_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_neg_pattern_word ON negativity_patterns(trigger_word);
CREATE INDEX IF NOT EXISTS idx_neg_pattern_cat ON negativity_patterns(category);

-- Negativity detection log (real-time detections)
CREATE TABLE IF NOT EXISTS negativity_detections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  conversation_text TEXT DEFAULT '',
  matched_pattern TEXT DEFAULT '',
  category TEXT DEFAULT '',
  severity INTEGER DEFAULT 3,
  intent TEXT DEFAULT '',
  department TEXT DEFAULT '',
  agent_advice TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_neg_detect_phone ON negativity_detections(phone);
CREATE INDEX IF NOT EXISTS idx_neg_detect_created ON negativity_detections(created_at);

-- Dynamic employees (self-spawned by other employees at runtime)
CREATE TABLE IF NOT EXISTS dynamic_employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_employee_id TEXT NOT NULL,
  employee_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_bn TEXT DEFAULT '',
  description TEXT DEFAULT '',
  expertise TEXT DEFAULT '',
  prompt_template TEXT DEFAULT '',
  primary_model TEXT DEFAULT 'llama-3.3-70b',
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_dyn_emp_parent ON dynamic_employees(parent_employee_id);
CREATE INDEX IF NOT EXISTS idx_dyn_emp_status ON dynamic_employees(status);

-- Negativity knowledge base (accumulated insights)
CREATE TABLE IF NOT EXISTS negativity_knowledge (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic TEXT NOT NULL UNIQUE,
  trigger_words TEXT DEFAULT '',
  sentiment_analysis TEXT DEFAULT '',
  safe_approach TEXT DEFAULT '',
  unsafe_phrases TEXT DEFAULT '',
  recommended_wording TEXT DEFAULT '',
  severity INTEGER DEFAULT 3,
  detection_count INTEGER DEFAULT 0,
  last_updated TEXT DEFAULT (datetime('now')),
  created_at TEXT DEFAULT (datetime('now'))
);
