import { notFound } from "next/navigation";
import { SharePageClient } from "@/components/SharePageClient";
import { serializeLovedex } from "@/lib/lovedex";
import { prisma } from "@/lib/prisma";
import { getRequestBaseUrl } from "@/lib/request-url";

type SharePageProps = {
  params: {
    hash: string;
  };
};

async function getLovedex(hash: string) {
  const lovedex = await prisma.loveDex.findUnique({
    where: {
      hash
    }
  });

  return lovedex ? serializeLovedex(lovedex) : null;
}

export default async function SharePage({ params }: SharePageProps) {
  const lovedex = await getLovedex(params.hash);

  if (!lovedex) {
    notFound();
  }

  const baseUrl = getRequestBaseUrl();
  const publicPath = `/r/${params.hash}`;
  const publicUrl = baseUrl ? `${baseUrl}${publicPath}` : publicPath;

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
