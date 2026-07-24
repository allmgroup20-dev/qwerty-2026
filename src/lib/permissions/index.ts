import { query, execute } from "@/lib/db/queries";

export type PermissionType =
  | "contact_access"
  | "whatsapp_integration"
  | "gmail_integration"
  | "calendar_access"
  | "facebook_page"
  | "instagram_access"
  | "telegram_bot"
  | "sms_marketing"
  | "push_notification"
  | "data_analytics";

export interface UserPermission {
  id: number;
  worker_id: string;
  permission_type: PermissionType;
  granted_at: string;
  expires_at: string | null;
  scope: string;
  is_active: number;
}

const PERMISSION_LABELS: Record<PermissionType, { en: string; bn: string }> = {
  contact_access: { en: "Contact List Access", bn: "কন্টাক্ট লিস্ট অ্যাক্সেস" },
  whatsapp_integration: { en: "WhatsApp Integration", bn: "হোয়াটসঅ্যাপ ইন্টিগ্রেশন" },
  gmail_integration: { en: "Gmail Integration", bn: "জিমেইল ইন্টিগ্রেশন" },
  calendar_access: { en: "Calendar Access", bn: "ক্যালেন্ডার অ্যাক্সেস" },
  facebook_page: { en: "Facebook Page Access", bn: "ফেসবুক পেজ অ্যাক্সেস" },
  instagram_access: { en: "Instagram Access", bn: "ইনস্টাগ্রাম অ্যাক্সেস" },
  telegram_bot: { en: "Telegram Bot", bn: "টেলিগ্রাম বট" },
  sms_marketing: { en: "SMS Marketing", bn: "এসএমএস মার্কেটিং" },
  push_notification: { en: "Push Notification", bn: "পুশ নোটিফিকেশন" },
  data_analytics: { en: "Data & Analytics", bn: "ডেটা ও অ্যানালিটিক্স" },
};

export function getPermissionLabel(type: PermissionType, language: string): string {
  const labels = PERMISSION_LABELS[type];
  if (!labels) return type;
  return language === "bn" ? labels.bn : labels.en;
}

export async function listPermissions(workerId: string): Promise<UserPermission[]> {
  return query<UserPermission>(
    { DB: null as any },
    "SELECT * FROM user_permissions WHERE worker_id = ? ORDER BY permission_type",
    [workerId]
  );
}

export async function checkPermission(workerId: string, type: PermissionType): Promise<boolean> {
  const rows = await query<UserPermission>(
    { DB: null as any },
    "SELECT id FROM user_permissions WHERE worker_id = ? AND permission_type = ? AND is_active = 1 AND (expires_at IS NULL OR expires_at > datetime('now')) LIMIT 1",
    [workerId, type]
  );
  return rows.length > 0;
}

export async function grantPermission(workerId: string, type: PermissionType, scope: Record<string, any> = {}, expiresAt?: string): Promise<void> {
  await execute(
    { DB: null as any },
    `INSERT INTO user_permissions (worker_id, permission_type, scope, expires_at, is_active)
     VALUES (?, ?, ?, ?, 1)
     ON CONFLICT(worker_id, permission_type) DO UPDATE SET is_active = 1, scope = ?, expires_at = COALESCE(?, expires_at), granted_at = datetime('now')`,
    [workerId, type, JSON.stringify(scope), expiresAt || null, JSON.stringify(scope), expiresAt || null]
  );
}

export async function revokePermission(workerId: string, type: PermissionType): Promise<void> {
  await execute(
    { DB: null as any },
    "UPDATE user_permissions SET is_active = 0 WHERE worker_id = ? AND permission_type = ?",
    [workerId, type]
  );
}

export async function requirePermission(workerId: string, type: PermissionType): Promise<boolean> {
  const has = await checkPermission(workerId, type);
  if (!has) {
    await grantPermission(workerId, type);
    return true;
  }
  return false;
}

export async function getPermissionSummary(workerId: string): Promise<{ granted: number; total: number; list: { type: PermissionType; label: string; active: boolean }[] }> {
  const all = Object.keys(PERMISSION_LABELS) as PermissionType[];
  const userPerms = await listPermissions(workerId);
  const activeTypes = new Set(userPerms.filter(p => p.is_active).map(p => p.permission_type));

  const list = all.map(type => ({
    type,
    label: PERMISSION_LABELS[type].en,
    active: activeTypes.has(type),
  }));

  return {
    granted: list.filter(l => l.active).length,
    total: all.length,
    list,
  };
}
