export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}

export function composeIsoDate(
  day?: number,
  month?: number,
  year?: number
): string {
  if (!day || !month || !year || day > daysInMonth(month, year)) {
    return "";
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

export function canSubmitLovedex(
  step: number,
  explicitlyRequested: boolean
): boolean {
  return step === 2 && explicitlyRequested;
}

export function getRelationshipPace(): string {
  return "ativo";
}

export function getOpeningMessage(openingMessage?: string | null): string {
  return (
    openingMessage?.trim() ||
    "Alguém especial criou isso pra você. Abre com calma."
  );
}

export function getMainQuestion(mainQuestion?: string | null): string {
  return mainQuestion?.trim() || "Quer ser meu(minha) namorado(a)?";
}
