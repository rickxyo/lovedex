import { notFound } from "next/navigation";
import { PublicLoveDexExperience } from "@/components/PublicLoveDexExperience";
import { serializeLovedex } from "@/lib/lovedex";
import { prisma } from "@/lib/prisma";

type PublicPageProps = {
  params: {
    hash: string;
  };
};

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
