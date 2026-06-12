import { headers } from "next/headers";

export function getRequestBaseUrl(): string {
  const headerList = headers();
  const host =
    headerList.get("x-forwarded-host") || headerList.get("host");
  const protocol =
    headerList.get("x-forwarded-proto") ||
    (process.env.VERCEL ? "https" : "http");

  if (host) {
    return `${protocol}://${host}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "";
}
