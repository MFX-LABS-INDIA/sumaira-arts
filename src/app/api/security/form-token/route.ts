import { NextRequest, NextResponse } from "next/server";
import {
  issueFormGuardToken,
  VALID_FORM_SCOPES,
  type FormGuardScope,
} from "@/lib/security/form-guard";
import { checkSubmissionRateLimit, getTrustedClientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

function isValidScope(value: string | null): value is FormGuardScope {
  return value !== null && (VALID_FORM_SCOPES as readonly string[]).includes(value);
}

export async function GET(request: NextRequest) {
  const secFetchSite = request.headers.get("sec-fetch-site")?.trim().toLowerCase();
  if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "none") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403, headers: NO_STORE_HEADERS },
    );
  }

  const scope = request.nextUrl.searchParams.get("scope");
  if (!isValidScope(scope)) {
    return NextResponse.json(
      { error: "Invalid scope" },
      { status: 400, headers: NO_STORE_HEADERS },
    );
  }

  const ip = getTrustedClientIp(request.headers);
  const limited = checkSubmissionRateLimit({
    scope: "token-issue",
    ip,
    maxPerScope: 60,
    windowMs: 10 * 60 * 1000,
  });

  if (limited) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: NO_STORE_HEADERS },
    );
  }

  const token = issueFormGuardToken(scope);
  return NextResponse.json({ token }, { status: 200, headers: NO_STORE_HEADERS });
}
