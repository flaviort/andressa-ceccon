import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Sends a plain-text e-mail to the firm's inbox through Resend. Returns false
 * when it could not be sent, so the form can tell the visitor.
 */
export async function sendToInbox({
  tag,
  subject,
  text,
  replyTo,
}: {
  /** Prefix for server logs, e.g. "contato". */
  tag: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Lets the forms be tested locally before the key exists.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[${tag}] RESEND_API_KEY ausente, mensagem não enviada:\n${text}`);
      return true;
    }
    console.error(`[${tag}] RESEND_API_KEY ausente`);
    return false;
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.RESEND_FROM ?? `Site ${site.shortName} <onboarding@resend.dev>`,
    to: process.env.CONTACT_TO ?? site.contactInbox,
    replyTo: replyTo || undefined,
    subject,
    text,
  });

  if (error) {
    console.error(`[${tag}] Resend:`, error);
    return false;
  }
  return true;
}
