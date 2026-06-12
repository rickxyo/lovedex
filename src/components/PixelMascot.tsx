"use client";

import { useState } from "react";
import type { LoveDexMascot } from "@/types/lovedex";

type PixelMascotProps = {
  mascot: LoveDexMascot | string | null | undefined;
  className?: string;
  interactive?: boolean;
};

type MascotDefinition = {
  id: LoveDexMascot;
  label: string;
  src: string;
  activeAnimation: "bounce" | "shake";
};

export const mascotOptions: MascotDefinition[] = [
  {
    id: "sushi",
    label: "Sushi",
    src: "/mascots/sushi.png",
    activeAnimation: "bounce"
  },
  {
    id: "tamagoyaki",
    label: "Tamagoyaki",
    src: "/mascots/tamagoyaki.png",
    activeAnimation: "bounce"
  },
  {
    id: "acai",
    label: "Açaí",
    src: "/mascots/acai.png",
    activeAnimation: "shake"
  }
];

export function normalizeMascot(
  mascot: PixelMascotProps["mascot"]
): LoveDexMascot {
  if (mascot === "sushi" || mascot === "tamagoyaki" || mascot === "acai") {
    return mascot;
  }

  return "sushi";
}

export function PixelMascot({
  mascot,
  className = "h-20 w-20",
  interactive = false
}: PixelMascotProps) {
  const [isTouched, setIsTouched] = useState(false);
  const normalized = normalizeMascot(mascot);
  const definition =
    mascotOptions.find((item) => item.id === normalized) || mascotOptions[0];

  return (
    <span
      className={`pixel-mascot pixel-mascot-${definition.activeAnimation} ${
        isTouched ? "is-active" : ""
      } ${className}`}
      onPointerDown={interactive ? () => setIsTouched(true) : undefined}
      onPointerUp={interactive ? () => setIsTouched(false) : undefined}
      onPointerCancel={interactive ? () => setIsTouched(false) : undefined}
      aria-label={definition.label}
      role="img"
    >
      <img
        src={definition.src}
        alt=""
        className="pixel-mascot-image"
        draggable={false}
      />
    </span>
  );
}
