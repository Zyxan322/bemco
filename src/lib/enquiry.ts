import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200),
});

const duplicateWindowSeconds = 120;

async function redisCommand(command: string[]): Promise<unknown> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    throw new Error(
      "The enquiry service is not configured. Please contact BEMCO by phone or email.",
    );
  }

  const response = await fetch(`${redisUrl.replace(/\/+$/, "")}/${command.join("/")}`, {
    headers: { Authorization: `Bearer ${redisToken}` },
  });
  if (!response.ok) {
    console.error(`Enquiry spam protection rejected a request with status ${response.status}.`);
    throw new Error(
      "We could not send your enquiry right now. Please try again or contact BEMCO directly.",
    );
  }

  const result = (await response.json()) as { result?: unknown; error?: string };
  if (result.error || !("result" in result)) {
    console.error("Enquiry spam protection returned an invalid response.");
    throw new Error(
      "We could not send your enquiry right now. Please try again or contact BEMCO directly.",
    );
  }
  return result.result;
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website.trim()) {
      throw new Error("Unable to submit this enquiry. Please try again.");
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !from) {
      throw new Error(
        "The enquiry service is not configured. Please contact BEMCO by phone or email.",
      );
    }

    const emailDigest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(data.email.toLowerCase()),
    );
    const emailKey = Array.from(new Uint8Array(emailDigest), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
    const reservationKey = `bemco:enquiry:${emailKey}`;
    const reservation = await redisCommand([
      "set",
      reservationKey,
      String(Date.now()),
      "NX",
      "EX",
      String(duplicateWindowSeconds),
    ]);
    if (reservation !== "OK") {
      throw new Error(
        "An enquiry from this email address was recently submitted. Please wait before retrying.",
      );
    }

    let accepted = false;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [process.env.ENQUIRY_TO_EMAIL || "info@bemcoalu.com"],
          reply_to: data.email,
          subject: `Website enquiry: ${data.subject.replace(/[\r\n]/g, " ")}`,
          text: [
            `Name: ${data.name}`,
            `Company: ${data.company || "Not provided"}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone || "Not provided"}`,
            `Subject: ${data.subject}`,
            "",
            data.message,
          ].join("\n"),
        }),
      });

      if (!response.ok) {
        console.error(
          `Enquiry email service rejected a submission with status ${response.status}.`,
        );
        throw new Error(
          "We could not send your enquiry right now. Please try again or contact BEMCO directly.",
        );
      }

      accepted = true;
      return { accepted: true };
    } finally {
      if (!accepted) await redisCommand(["del", reservationKey]);
    }
  });
