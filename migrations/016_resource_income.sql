-- Resource Income System (replaces Demo Bonus)
-- Resource income can ONLY be used to unlock premium resources at 99 BDT each

ALTER TABLE workers RENAME COLUMN demo_bonus TO resource_income;
ALTER TABLE workers RENAME COLUMN demo_bonus_original TO resource_income_original;

UPDATE company_settings SET setting_key = 'resource_income_enabled' WHERE setting_key = 'demo_bonus_enabled';
UPDATE company_settings SET setting_key = 'resource_income_default_amount' WHERE setting_key = 'demo_bonus_default_amount';
DELETE FROM company_settings WHERE setting_key = 'demo_bonus_deduction_percent';

INSERT OR IGNORE INTO company_settings (setting_key, setting_value, setting_type) VALUES
  ('resource_unlock_price', '99', 'text');
