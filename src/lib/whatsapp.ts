import { sendMessage, enqueueMessage, processQueue, getQueueStats, getPendingWebMessages, markWebSent } from "./whatsapp/index";

export { sendMessage, enqueueMessage, processQueue, getQueueStats, getPendingWebMessages, markWebSent } from "./whatsapp/index";
export type { WhatsAppAccount, SendResult, MessagePriority } from "./whatsapp/types";

export async function sendWhatsAppMessage(
  message: { to: string; text: string },
  _apiKey?: string,
  _apiUrl?: string
): Promise<boolean> {
  const result = await sendMessage(message.to, message.text);
  return result.success;
}

export async function sendBulkWhatsApp(
  messages: { to: string; text: string }[],
  _apiKey?: string,
  _apiUrl?: string
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;
  for (const msg of messages) {
    const ok = await sendWhatsAppMessage(msg);
    if (ok) success++;
    else failed++;
  }
  return { success, failed };
}

export function generateWhatsAppTemplate(workerName: string, type: "welcome" | "commission" | "order" | "withdrawal" | "premium_upgrade" | "general_welcome" | "referral_share"): string {
  const templates: Record<string, string> = {
    welcome: `Welcome ${workerName} to Jobayer Group Career! Start your journey today and build your team.`,
    commission: `Congratulations ${workerName}! You have received a new commission. Check your dashboard for details.`,
    order: `Hello ${workerName}, your order has been placed successfully. Track it from your dashboard.`,
    withdrawal: `Dear ${workerName}, your withdrawal request has been processed. Thank you for being with Jobayer Group Career.`,
    premium_upgrade: `🎉 Congratulations ${workerName}! You are now a PREMIUM Member! Enjoy zero tax on withdrawals, automatic payouts, and unlimited resource unlocks. Thank you for your trust!`,
    general_welcome: `👋 Welcome ${workerName}! You are now a General Member of Jobayer Group Career. ✅ Refer friends and earn commissions ✅ Access free resources ✅ Upgrade to Premium to unlock: zero tax, auto payouts, unlimited unlocks. Visit your dashboard to start!`,
    referral_share: `🎯 Join Jobayer Group Career for FREE! Register now and get access to free resources, training, and community support. Use my referral code: {{refCode}}. Register here: {{refLink}}`,
  };
  return templates[type] || `Hello ${workerName}, thank you for being with Jobayer Group Career.`;
}
