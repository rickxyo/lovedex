import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { SharePageClient } from "@/components/SharePageClient";
import type { LoveDexViewData } from "@/types/lovedex";

type SharePageProps = {
  params: {
    hash: string;
  };
};

function getRequestBaseUrl(): string {
  const headerList = headers();
  const host = headerList.get("host") || "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

async function getLovedex(hash: string): Promise<LoveDexViewData | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || getRequestBaseUrl();
  const response = await fetch(`${baseUrl}/api/lovedex/${hash}`, {
    cache: "no-store"
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Não foi possível carregar este Lovedex.");
  }

  return (await response.json()) as LoveDexViewData;
}

export default async function SharePage({ params }: SharePageProps) {
  const lovedex = await getLovedex(params.hash);

  if (!lovedex) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || getRequestBaseUrl();
  const publicPath = `/r/${params.hash}`;
  const publicUrl = `${baseUrl}${publicPath}`;

  return (
    <main className="min-h-screen bg-tile px-4 py-8 sm:py-12">
      <div className="mx-auto flex max-w-6xl justify-center">
        <SharePageClient
          lovedex={lovedex}
          publicPath={publicPath}
          publicUrl={publicUrl}
        />
      </div>
    </main>
  );
}
