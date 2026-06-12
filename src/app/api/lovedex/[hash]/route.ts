import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: {
    hash: string;
  };
};

export async function GET(_request: Request, { params }: RouteContext) {
  const lovedex = await prisma.loveDex.findUnique({
    where: {
      hash: params.hash
    }
  });

  if (!lovedex) {
    return NextResponse.json(
      { error: "Este Lovedex não existe." },
      { status: 404 }
    );
  }

  return NextResponse.json(lovedex);
}
