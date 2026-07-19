-- Demo Bonus System
-- Adds columns for display/promotional bonus that deducts on withdrawal

ALTER TABLE workers ADD COLUMN demo_bonus REAL DEFAULT 0;
ALTER TABLE workers ADD COLUMN demo_bonus_original REAL DEFAULT 0;

INSERT OR IGNORE INTO company_settings (setting_key, setting_value, setting_type) VALUES
  ('demo_bonus_enabled', '1', 'text'),
  ('demo_bonus_deduction_percent', '10', 'text'),
  ('demo_bonus_default_amount', '50', 'text');
