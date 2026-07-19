-- Migration 017: Membership Tiers (General + Premium)
-- Rename 'active' → 'general' for the new 3-tier system
UPDATE workers SET membership_status = 'general' WHERE membership_status = 'active';

-- Add general member withdrawal tax (admin-configurable %)
INSERT OR IGNORE INTO company_settings (setting_key, setting_value, setting_type) VALUES
  ('general_member_withdrawal_tax_percent', '5', 'text');
