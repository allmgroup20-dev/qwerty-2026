export interface WhatsAppAccountRow {
  id: number;
  account_id: string;
  phone?: string;
  provider: "meta" | "bridge" | "web" | "log";
  status: string;
  daily_limit: number;
  daily_sent: number;
  total_sent: number;
  config?: string;
  session_data?: string | null;
  last_used_at?: string;
}

export interface WhatsAppAccount {
  accountId: string;
  phone?: string;
  provider: "meta" | "bridge" | "web" | "log";
  status: string;
  dailyLimit: number;
  dailySent: number;
  totalSent: number;
  config?: Record<string, string>;
  sessionData?: string | null;
}

export function mapRowToAccount(row: WhatsAppAccountRow): WhatsAppAccount {
  return {
    accountId: row.account_id,
    phone: row.phone,
    provider: row.provider,
    status: row.status,
    dailyLimit: row.daily_limit,
    dailySent: row.daily_sent,
    totalSent: row.total_sent,
    config: row.config ? JSON.parse(row.config) : undefined,
    sessionData: row.session_data,
  };
}

export interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export type MessagePriority = 0 | 1 | 2;

export interface MessageQueueItem {
  id?: number;
  to: string;
  text: string;
  priority: MessagePriority;
  status: "queued" | "sending" | "sent" | "failed";
  accountId?: string;
  campaignId?: string;
  messageType: string;
  attempts: number;
  error?: string;
}

export interface BA_PhoneNumber {
  prefix: string;
  operator: string;
}
