import { NextResponse } from "next/server";
import { TEAM_SIZE } from "@/lib/event";

const emailOk = (v: unknown) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const textOk = (v: unknown) => typeof v === "string" && v.trim().length > 0 && v.length < 200;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots do not retry
  if (body.website) return NextResponse.json({ ok: true });

  const members = Array.isArray(body.members) ? body.members : [];
  const total = members.length + 1;
  const valid =
    textOk(body.team?.name) && textOk(body.team?.organization) &&
    textOk(body.leader?.name) && emailOk(body.leader?.email) && textOk(body.leader?.phone) &&
    members.every((m: { name?: unknown; email?: unknown }) => textOk(m.name) && emailOk(m.email)) &&
    total >= TEAM_SIZE.min && total <= TEAM_SIZE.max &&
    body.consent === true;
  if (!valid) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });

  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) return NextResponse.json({ error: "Registration is not set up yet." }, { status: 500 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight on Apps Script
      body: JSON.stringify(body),
      redirect: "follow",
    });
    const responseText = await res.text();
    const result = JSON.parse(responseText) as { ok?: unknown };
    if (!res.ok || result.ok !== true) throw new Error(`Apps Script response: ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not save your registration. Please try again." }, { status: 502 });
  }
}
