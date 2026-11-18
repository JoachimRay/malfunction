import { NextResponse } from "next/server";

// Registration is closed. Reject every submission on the server so stale
// pages, cached forms, or direct requests can no longer register.
// The previous handler is in git history (see commit b0f69f2 and earlier).
const closed = () =>
  NextResponse.json({ error: "Applications are closed." }, { status: 403 });

// GET lets you open this URL in a browser and see that registration is closed.
export const GET = closed;
export const POST = closed;
