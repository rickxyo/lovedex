"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LoveDexCard } from "@/components/LoveDexCard";
import { PixelIcon } from "@/components/PixelIcon";
import { PixelMascot } from "@/components/PixelMascot";
import { getMainQuestion, getOpeningMessage } from "@/lib/form-controls";
import type { LoveDexViewData } from "@/types/lovedex";

type PublicLoveDexExperienceProps = {
  lovedex: LoveDexViewData;
};

const confettiPieces = Array.from({ length: 28 }, (_, index) => index);

export function PublicLoveDexExperience({
  lovedex
}: PublicLoveDexExperienceProps) {
  const [phase, setPhase] = useState<
    "intro" | "sealed" | "question" | "card"
  >("intro");
  const [isOpening, setIsOpening] = useState(false);

  function openTicket() {
    if (isOpening || phase !== "sealed") {
      return;
    }

    setIsOpening(true);
    window.setTimeout(() => setPhase("question"), 980);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center px-4 py-8">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.section
            key="intro"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="pixel-panel w-full max-w-xl bg-cream-100 p-5 text-center sm:p-8"
          >
            <div className="dialog-box bg-cream-50 p-5 sm:p-7">
              <PixelIcon
                name="letter"
                className="mx-auto h-12 w-12 text-rosebit-500"
              />
              <p className="mx-auto mt-5 max-w-md text-base leading-7 text-midnight-800 sm:text-lg">
                {getOpeningMessage(lovedex.openingMessage)}
              </p>
              <button
                type="button"
                className="pixel-button mx-auto mt-6 bg-rosebit-500 px-6 py-3 text-white"
                onClick={() => setPhase("sealed")}
              >
                Continuar
              </button>
            </div>
          </motion.section>
        )}

        {phase === "sealed" && (
          <motion.section
            key="sealed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-md text-center"
          >
            <button
              type="button"
              className="group relative w-full"
              onClick={openTicket}
              aria-label="Abrir ticket"
            >
              <div className="pixel-panel relative overflow-hidden bg-cream-100 p-5">
                <div className="absolute inset-x-0 top-1/2 border-t-4 border-dashed border-rosebit-500" />
                <motion.div
                  className="relative border-4 border-midnight-700 bg-rosebit-100 p-7 shadow-pixel-rose"
                  animate={
                    isOpening
                      ? {
                          scaleY: [1, 0.08, 1.08],
                          opacity: [1, 0.7, 0]
                        }
                      : { scaleY: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  style={{ transformOrigin: "center" }}
                >
                  <div className="mx-auto mb-5 h-14 w-20 border-4 border-midnight-700 bg-cream-50 shadow-pixel-soft">
                    <PixelIcon
                      name="letter"
                      className="mx-auto mt-2 h-9 w-9 text-rosebit-500"
                    />
                  </div>
                  <p className="font-pixel text-xs text-rosebit-700">
                    EVENT TICKET
                  </p>
                  <h1 className="mt-3 font-pixel text-2xl leading-tight text-midnight-800">
                    Uma mensagem apareceu
                  </h1>
                  <p className="mt-4 text-sm leading-6 text-midnight-700">
                    Toque para abrir este evento especial.
                  </p>
                </motion.div>
              </div>
            </button>

            {isOpening && <Confetti />}
          </motion.section>
        )}

        {phase === "question" && (
          <motion.section
            key="question"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -18 }}
            className="pixel-panel relative w-full max-w-xl bg-cream-100 p-5 text-center sm:p-7"
          >
            <Confetti />
            <div className="dialog-box bg-cream-50 p-5">
              <p className="font-pixel text-xs text-rosebit-700">
                NOVO EVENTO DESBLOQUEADO
              </p>
              <PixelMascot
                mascot={lovedex.emoji}
                className="mx-auto mt-4 h-20 w-20"
              />
              <h1 className="mt-4 font-pixel text-2xl leading-tight text-midnight-800 sm:text-3xl">
                {getMainQuestion(lovedex.mainQuestion)}
              </h1>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="pixel-button gap-2 bg-rosebit-500 px-5 py-3 text-white"
                onClick={() => setPhase("card")}
              >
                <PixelIcon name="heart" className="h-5 w-5" />
                Abrir
              </button>
            </div>
          </motion.section>
        )}

        {phase === "card" && (
          <motion.section
            key="card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <LoveDexCard lovedex={lovedex} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {confettiPieces.map((piece) => {
        const left = 8 + ((piece * 17) % 86);
        const delay = (piece % 7) * 70;
        const colorClass =
          piece % 3 === 0
            ? "bg-rosebit-500"
            : piece % 3 === 1
              ? "bg-violetbit-500"
              : "bg-cream-200";

        return (
          <span
            key={piece}
            className={`confetti-piece ${colorClass}`}
            style={{
              left: `${left}%`,
              animationDelay: `${delay}ms`
            }}
          />
        );
      })}
    </div>
  );
}
