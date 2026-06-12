import type { LoveDex } from "@prisma/client";
import type { LoveDexViewData } from "@/types/lovedex";

export function serializeLovedex(lovedex: LoveDex): LoveDexViewData {
  return {
    ...lovedex,
    startDate: lovedex.startDate.toISOString(),
    createdAt: lovedex.createdAt.toISOString()
  };
}
