import { getDB } from "@/lib/db";
import { execute } from "@/lib/db/queries";

interface NotificationPayload {
  workerId: string;
  type: "in_app" | "whatsapp" | "email";
  templateId: string;
  data: Record<string, unknown>;
  priority: "high" | "medium" | "low";
}

export async function sendNotification(payload: NotificationPayload): Promise<boolean> {
  try {
    if (payload.type === "in_app") {
      return await sendInApp(payload);
    }
    if (payload.type === "whatsapp") {
      return await sendWhatsApp(payload);
    }
    if (payload.type === "email") {
      return await sendEmail(payload);
    }
    return false;
  } catch {
    return false;
  }
}

async function sendInApp(payload: NotificationPayload): Promise<boolean> {
  const env = await getDB();
  await execute(
    env as any,
    "INSERT INTO notifications (worker_id, title, message, type, priority, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))",
    [
      payload.workerId,
      (payload.data.title as string) || "Notification",
      (payload.data.message as string) || "",
      "system",
      payload.priority,
    ]
  );
  return true;
}

async function sendWhatsApp(payload: NotificationPayload): Promise<boolean> {
  const { sendMessage } = await import("@/lib/whatsapp/sender");

  const text = (payload.data.message as string) || (payload.data.title as string) || "Notification";
  const to = (payload.data.phone as string) || payload.workerId;
  if (!to) return false;

  const result = await sendMessage(to, text);
  return result.success;
}

async function sendEmail(_payload: NotificationPayload): Promise<boolean> {
  return false;
}

export async function sendBulkNotifications(
  payloads: NotificationPayload[]
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;
  for (const p of payloads) {
    const ok = await sendNotification(p);
    if (ok) success++;
    else failed++;
  }
  return { success, failed };
}
