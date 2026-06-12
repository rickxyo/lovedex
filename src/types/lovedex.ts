export type LoveDexTheme = "rose" | "purple" | "midnight";
export type LoveDexMascot = "sushi" | "tamagoyaki" | "acai";

export type LoveDexFormData = {
  creatorName: string;
  partnerName: string;
  startDate: string;
  city?: string;
  openingMessage?: string;
  mainQuestion?: string;
  message?: string;
  emoji?: LoveDexMascot | string;
  theme?: LoveDexTheme;
};

export type LoveDexRecord = {
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
};

export type LoveDexViewData = {
  id: string;
  hash: string;
  creatorName: string;
  partnerName: string;
  startDate: string;
  city: string | null;
  openingMessage: string | null;
  mainQuestion: string | null;
  message: string | null;
  emoji: string | null;
  theme: string;
  createdAt: string;
};

export type RelationshipStats = {
  pace: string;
  distance: number;
  elevation: number;
  location: string;
};

export type DurationParts = {
  years: number;
  months: number;
  days: number;
};
