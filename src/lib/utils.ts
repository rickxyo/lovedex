import { nanoid } from "nanoid";
import { getRelationshipPace } from "@/lib/form-controls";
import type { DurationParts, RelationshipStats } from "@/types/lovedex";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function generateHash(): string {
  return nanoid(10);
}

export function getDaysTogether(startDate: Date): number {
  const today = new Date();
  const startUtc = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return Math.max(0, Math.floor((todayUtc - startUtc) / DAY_IN_MS));
}

export function formatDuration(days: number): DurationParts {
  const years = Math.floor(days / 365);
  const remainingAfterYears = days % 365;
  const months = Math.floor(remainingAfterYears / 30);
  const remainingDays = remainingAfterYears % 30;

  return {
    years,
    months,
    days: remainingDays
  };
}

export function getRelationshipStats(
  startDate: Date,
  city?: string
): RelationshipStats {
  const days = getDaysTogether(startDate);
  const duration = formatDuration(days);

  return {
    pace: getRelationshipPace(),
    distance: days,
    elevation: duration.years * 12 + duration.months,
    location: city?.trim() || "Nosso mundo"
  };
}
