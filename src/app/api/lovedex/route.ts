import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateHash } from "@/lib/utils";
import type { LoveDexFormData, LoveDexTheme } from "@/types/lovedex";

const themes: LoveDexTheme[] = ["rose", "purple", "midnight"];

function isTheme(value: string | undefined): value is LoveDexTheme {
  return Boolean(value && themes.includes(value as LoveDexTheme));
}

function readText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LoveDexFormData>;
    const creatorName = readText(body.creatorName);
    const partnerName = readText(body.partnerName);
    const startDateValue = readText(body.startDate);

    if (!creatorName || !partnerName || !startDateValue) {
      return NextResponse.json(
        { error: "Preencha os campos obrigatórios." },
        { status: 400 }
      );
    }

    const startDate = new Date(`${startDateValue}T00:00:00`);

    if (Number.isNaN(startDate.getTime())) {
      return NextResponse.json(
        { error: "A data de início não é válida." },
        { status: 400 }
      );
    }

    const hash = generateHash();
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
      request.headers.get("origin") ||
      "http://localhost:3000";

    const lovedex = await prisma.loveDex.create({
      data: {
        hash,
        creatorName,
        partnerName,
        startDate,
        city: readText(body.city),
        openingMessage: readText(body.openingMessage)?.slice(0, 200),
        mainQuestion: readText(body.mainQuestion)?.slice(0, 100),
        message: readText(body.message)?.slice(0, 140),
        emoji: readText(body.emoji),
        theme: isTheme(body.theme) ? body.theme : "rose"
      }
    });

    return NextResponse.json({
      hash: lovedex.hash,
      url: `${baseUrl}/r/${lovedex.hash}`
    });
  } catch (error) {
    console.error("Erro ao criar Lovedex", error);

    return NextResponse.json(
      {
        error:
          "Não foi possível salvar agora. Confira o DATABASE_URL e tente novamente."
      },
      { status: 500 }
    );
  }
}
