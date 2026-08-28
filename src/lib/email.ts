import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY ?? "";
const fromEmail =
  process.env.RESEND_FROM_EMAIL?.trim() || "hello@solveek.com";
const notifyEmail =
  process.env.LEAD_NOTIFY_EMAIL?.trim() ||
  process.env.RESEND_TO_EMAIL?.trim() ||
  "";

export function isLeadEmailConfigured(): boolean {
  return Boolean(resendApiKey && notifyEmail && fromEmail);
}

type LeadEmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * Best-effort lead notification. Never throws — form inserts should still succeed
 * if mail delivery fails (unverified domain, quota, etc.).
 */
export async function sendLeadNotification({
  subject,
  text,
  replyTo,
}: LeadEmailInput): Promise<{ sent: boolean; error?: string }> {
  if (!isLeadEmailConfigured()) {
    return { sent: false, error: "Lead email is not configured" };
  }

  try {
    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: `SOLVEEK <${fromEmail}>`,
      to: [notifyEmail],
      subject,
      text,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error("resend lead email", error.message);
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown mail error";
    console.error("resend lead email", message);
    return { sent: false, error: message };
  }
}
