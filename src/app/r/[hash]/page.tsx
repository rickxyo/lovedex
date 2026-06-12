import { notFound } from "next/navigation";
import { PublicLoveDexExperience } from "@/components/PublicLoveDexExperience";
import { prisma } from "@/lib/prisma";
import type { LoveDexViewData } from "@/types/lovedex";

type PublicPageProps = {
  params: {
    hash: string;
  };
};

function serializeLovedex(lovedex: {
  id: string;
  hash: string;
  creatorName: string;
  partnerName: string;
  startDate: Date;
  city: string | null;
  openingMessage: string | null;
  mainQuestion: string | null;
  message: string | null;
  emoji: string | null;
  theme: string;
  createdAt: Date;
}): LoveDexViewData {
  return {
    ...lovedex,
    startDate: lovedex.startDate.toISOString(),
    createdAt: lovedex.createdAt.toISOString()
  };
}

export default async function PublicPage({ params }: PublicPageProps) {
  const lovedex = await prisma.loveDex.findUnique({
    where: {
      hash: params.hash
    }
  });

  if (!lovedex) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-tile">
      <PublicLoveDexExperience lovedex={serializeLovedex(lovedex)} />
    </main>
  );
}
