export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("T")[0].split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function formatLocalDate(dateString: string): string {
  const localDate = parseLocalDate(dateString);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(localDate);
}
