"use client";

import { useRef, useState } from "react";
import { PixelIcon } from "@/components/PixelIcon";
import { PixelMascot } from "@/components/PixelMascot";
import { getDaysTogether, getRelationshipStats } from "@/lib/utils";
import type { LoveDexTheme, LoveDexViewData } from "@/types/lovedex";

type LoveDexCardProps = {
  lovedex: LoveDexViewData;
  showExportButton?: boolean;
};

type ThemeClasses = {
  shell: string;
  badge: string;
  panel: string;
  text: string;
  muted: string;
  accent: string;
  button: string;
};

const themeClasses: Record<LoveDexTheme, ThemeClasses> = {
  rose: {
    shell: "bg-cream-100 text-midnight-800 shadow-pixel-rose",
    badge: "bg-rosebit-500 text-white",
    panel: "bg-cream-50 border-midnight-700",
    text: "text-midnight-800",
    muted: "text-midnight-700",
    accent: "text-rosebit-700",
    button: "bg-rosebit-500 text-white"
  },
  purple: {
    shell: "bg-violetbit-100 text-midnight-800 shadow-pixel-purple",
    badge: "bg-violetbit-500 text-white",
    panel: "bg-cream-50 border-midnight-700",
    text: "text-midnight-800",
    muted: "text-midnight-700",
    accent: "text-violetbit-700",
    button: "bg-violetbit-500 text-white"
  },
  midnight: {
    shell: "bg-midnight-900 text-white shadow-pixel-purple",
    badge: "bg-indigo-400 text-midnight-900",
    panel: "bg-midnight-800 border-indigo-300",
    text: "text-white",
    muted: "text-indigo-100",
    accent: "text-indigo-200",
    button: "bg-indigo-400 text-midnight-900"
  }
};

function normalizeTheme(theme: string): LoveDexTheme {
  if (theme === "purple" || theme === "midnight") {
    return theme;
  }

  return "rose";
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(value));
}

export function LoveDexCard({
  lovedex,
  showExportButton = true
}: LoveDexCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const theme = normalizeTheme(lovedex.theme);
  const classes = themeClasses[theme];
  const startDate = new Date(lovedex.startDate);
  const daysTogether = getDaysTogether(startDate);
  const stats = getRelationshipStats(startDate, lovedex.city || undefined);

  async function exportCard() {
    if (!cardRef.current) {
      return;
    }

    setIsExporting(true);
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    });
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "lovedex.png";
    link.click();
    setIsExporting(false);
  }

  return (
    <div className="w-full">
      <div
        ref={cardRef}
        className={`pixel-card relative mx-auto w-full max-w-[430px] overflow-hidden border-4 border-midnight-700 p-4 ${classes.shell}`}
      >
        <div className="scanline pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative">
          <header className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className={`font-pixel text-xs tracking-normal ${classes.muted}`}>
                LOVEDEX
              </p>
              <div className="mt-2 flex items-center gap-3">
                <PixelMascot
                  mascot={lovedex.emoji}
                  className="h-14 w-14 shrink-0"
                />
                <h2
                  className={`font-pixel text-lg leading-tight ${classes.text}`}
                >
                  {lovedex.creatorName} + {lovedex.partnerName}
                </h2>
              </div>
            </div>
            <span
              className={`border-2 border-midnight-700 px-2 py-1 font-pixel text-[10px] uppercase ${classes.badge}`}
            >
              {theme}
            </span>
          </header>

          <section
            className={`mb-4 border-2 p-4 text-center shadow-pixel-soft ${classes.panel}`}
          >
            <p className={`font-pixel text-xs ${classes.muted}`}>
              Métrica principal
            </p>
            <p className={`mt-3 font-pixel text-4xl leading-none ${classes.accent}`}>
              {daysTogether}
            </p>
            <p className={`mt-2 font-pixel text-sm ${classes.text}`}>
              dias juntos
            </p>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <StatTile
              icon="distance"
              label="Distância"
              value={`${stats.distance} dias juntos`}
              classes={classes}
            />
            <StatTile
              icon="calendar"
              label="Desde"
              value={formatDate(lovedex.startDate)}
              classes={classes}
            />
            <StatTile
              icon="pace"
              label="modo co-op"
              value={stats.pace}
              classes={classes}
            />
            <StatTile
              icon="location"
              label="Local"
              value={stats.location}
              classes={classes}
            />
          </section>

          {lovedex.message && (
            <blockquote
              className={`mt-4 border-2 p-4 text-center text-sm italic leading-6 shadow-pixel-soft ${classes.panel} ${classes.text}`}
            >
              “{lovedex.message}”
            </blockquote>
          )}

          <footer
            className={`mt-4 flex items-center justify-center gap-2 border-t-2 border-dashed pt-3 text-center font-pixel text-xs ${classes.muted}`}
          >
            <span>{lovedex.creatorName}</span>
            <PixelIcon name="heart" className="h-4 w-4 text-rosebit-500" />
            <span>{lovedex.partnerName}</span>
          </footer>
        </div>
      </div>

      {showExportButton && (
        <button
          type="button"
          className={`pixel-button mx-auto mt-4 flex px-5 py-3 ${classes.button}`}
          onClick={exportCard}
          disabled={isExporting}
        >
          {isExporting ? "Preparando PNG..." : "Baixar card PNG"}
        </button>
      )}
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  classes
}: {
  icon: "distance" | "calendar" | "pace" | "location";
  label: string;
  value: string;
  classes: ThemeClasses;
}) {
  return (
    <div className={`min-h-24 border-2 p-3 shadow-pixel-soft ${classes.panel}`}>
      <div className={`flex items-center gap-2 ${classes.muted}`}>
        <PixelIcon name={icon} className="h-4 w-4 shrink-0" />
        <p className="font-pixel text-[10px] leading-4">{label}</p>
      </div>
      <p className={`mt-2 text-sm font-bold leading-5 ${classes.text}`}>{value}</p>
    </div>
  );
}
