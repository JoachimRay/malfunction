import { NextResponse } from "next/server";
import { TEAM_SIZE } from "@/lib/event";

const emailOk = (v: unknown) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const textOk = (v: unknown) => typeof v === "string" && v.trim().length > 0 && v.length < 200;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots do not retry
  if (body.website) return NextResponse.json({ ok: true });

  const members = Array.isArray(body.members) ? body.members : [];
  const total = members.length + 1;
  const valid =
    body.registration_type === "team" &&
    textOk(body.team_name) && textOk(body.organization_name) &&
    textOk(body.leader_name) && emailOk(body.leader_email) && textOk(body.project_idea) &&
    members.every((m) => !!m && typeof m === "object" &&
      textOk((m as { name?: unknown }).name) && emailOk((m as { email?: unknown }).email)) &&
    total >= TEAM_SIZE.min && total <= TEAM_SIZE.max &&
    body.consent === true;
  if (!valid) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });

  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) return NextResponse.json({ error: "Registration is not set up yet." }, { status: 500 });

  try {
    const fields = new URLSearchParams({
      registration_type: "team",
      team_name: body.team_name as string,
      organization_name: body.organization_name as string,
      leader_name: body.leader_name as string,
      leader_email: body.leader_email as string,
      project_idea: body.project_idea as string,
      mentor_name: typeof body.mentor_name === "string" ? body.mentor_name : "",
    });
    members.forEach((member, index) => {
      const item = member as { name: string; email: string };
      const number = index + 2;
      fields.set(`member${number}_name`, item.name);
      fields.set(`member${number}_email`, item.email);
    });

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: fields,
      redirect: "follow",
    });
    const responseText = (await res.text()).trim();
    let confirmed = responseText === "Registration received.";
    try {
      confirmed ||= (JSON.parse(responseText) as { ok?: unknown }).ok === true;
    } catch { /* Apps Script may return its plain-text confirmation. */ }
    if (!res.ok || !confirmed) throw new Error(`Apps Script response: ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save your registration. Please try again." }, { status: 502 });
  }
}
