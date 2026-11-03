// Receives the "Start a project" form and emails it to the site owner via Resend.
// Needs RESEND_API_KEY and CONTACT_TO_EMAIL (see .env.example).

import { projectTypes } from "@/data/portfolio";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Basic per-IP throttle: 5 submissions per 10 minutes per server instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function validate(body) {
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const projectType = String(body?.projectType ?? "").trim();
  const errors = {};

  if (name.length < 2 || name.length > 100) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Tell me a little more (at least 10 characters).";
  if (message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
  if (projectType && !projectTypes.includes(projectType)) errors.projectType = "Pick one of the options.";

  return { errors, data: { name, email, message, projectType } };
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field, bots usually do.
  if (body?.company) return Response.json({ ok: true });

  const { errors, data } = validate(body);
  if (Object.keys(errors).length) {
    return Response.json({ error: "Please fix the highlighted fields.", fields: errors }, { status: 400 });
  }

  // Only valid submissions count toward the limit, so fixing typos never locks anyone out.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  // A local binding keeps these as runtime lookups. Direct process.env.NAME
  // access can be copied into the Turbopack cache and fail Netlify's secret scan.
  const env = process.env;
  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set; message not sent.");
    return Response.json(
      { error: "The contact form isn't connected yet. Please email me directly." },
      { status: 503 }
    );
  }

  const { name, email, message, projectType } = data;
  const subject = `New project enquiry from ${name}${projectType ? ` (${projectType})` : ""}`;
  const text = [`Name: ${name}`, `Email: ${email}`, `Project type: ${projectType || "Not specified"}`, "", message].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#071013">
      <h2 style="margin:0 0 16px">New project enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
      <strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br/>
      <strong>Project type:</strong> ${escapeHtml(projectType || "Not specified")}</p>
      <p style="white-space:pre-wrap;border-left:3px solid #23b5d3;padding-left:12px">${escapeHtml(message)}</p>
      <p style="color:#75abbc;font-size:12px">Sent from your portfolio contact form. Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend rejected the message:", res.status, await res.text());
      return Response.json({ error: "Your message couldn't be sent. Please email me directly." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Could not reach Resend:", err);
    return Response.json({ error: "Your message couldn't be sent. Please email me directly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
