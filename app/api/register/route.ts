import { NextResponse } from "next/server";

const SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL;

export async function POST(request: Request) {
  try {
    if (!SCRIPT_URL) {
      throw new Error("Missing Google Apps Script URL");
    }

    const formData = await request.formData();
    formData.set("registration_type", "solo");

    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, typeof value === "string" ? value : value.name);
    }

    const scriptResponse = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params,
      cache: "no-store",
    });
    const responseText = (await scriptResponse.text()).trim();
    const returnedHtml = /text\/html/i.test(scriptResponse.headers.get("content-type") ?? "");

    if (
      scriptResponse.status >= 400 ||
      returnedHtml ||
      responseText !== "Registration received."
    ) {
      return NextResponse.json(
        { error: "Google Apps Script did not confirm the registration." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: "Registration submitted successfully." });
  } catch (error) {
    console.error("Registration forwarding failed:", error);

    return NextResponse.json(
      { error: "Registration could not be sent. Please try again." },
      { status: 502 },
    );
  }
}
