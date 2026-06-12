"use client";

import { useState } from "react";
import { LoveDexCard } from "@/components/LoveDexCard";
import type { LoveDexViewData } from "@/types/lovedex";

type SharePageClientProps = {
  lovedex: LoveDexViewData;
  publicPath: string;
  publicUrl: string;
};

export function SharePageClient({
  lovedex,
  publicPath,
  publicUrl
}: SharePageClientProps) {
  const [copyLabel, setCopyLabel] = useState("Copiar link");

  async function copyLink() {
    await navigator.clipboard.writeText(publicUrl);
    setCopyLabel("Copiado!");
    window.setTimeout(() => setCopyLabel("Copiar link"), 1600);
  }

  function openPublicView() {
    window.open(publicPath, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <section className="pixel-panel bg-cream-100 p-4 sm:p-6">
        <div className="dialog-box bg-cream-50 p-4">
          <p className="font-pixel text-xs text-rosebit-700">SAVE COMPLETE</p>
          <h1 className="mt-3 font-pixel text-2xl leading-tight text-midnight-800">
            Seu Lovedex foi criado!
          </h1>
          <p className="mt-3 text-sm leading-6 text-midnight-700">
            Agora envie o link abaixo para abrir a surpresa em modo evento.
          </p>
        </div>

        <div className="mt-5 border-2 border-midnight-700 bg-cream-50 p-3 shadow-pixel-soft">
          <p className="break-all text-sm font-semibold text-midnight-800">
            {publicUrl}
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="pixel-button bg-rosebit-500 px-4 py-3 text-white"
            onClick={copyLink}
          >
            {copyLabel}
          </button>
          <button
            type="button"
            className="pixel-button bg-cream-50 px-4 py-3"
            onClick={openPublicView}
          >
            Ver como ela vai ver
          </button>
        </div>
      </section>

      <section>
        <p className="mb-3 text-center font-pixel text-xs text-midnight-700">
          Prévia do card
        </p>
        <LoveDexCard lovedex={lovedex} />
      </section>
    </div>
  );
}
