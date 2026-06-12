"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PixelDateSelect } from "@/components/PixelDateSelect";
import { PixelIcon } from "@/components/PixelIcon";
import { mascotOptions, PixelMascot } from "@/components/PixelMascot";
import { canSubmitLovedex } from "@/lib/form-controls";
import type {
  LoveDexFormData,
  LoveDexMascot,
  LoveDexTheme
} from "@/types/lovedex";

type CreateResponse = {
  hash: string;
  url: string;
};

type ErrorResponse = {
  error?: string;
};

type Step = {
  id: number;
  label: string;
};

const steps: Step[] = [
  { id: 0, label: "Treinadores" },
  { id: 1, label: "Jornada" },
  { id: 2, label: "Carta" }
];

const themeOptions: Array<{ label: string; value: LoveDexTheme }> = [
  { label: "Rosa", value: "rose" },
  { label: "Roxo", value: "purple" },
  { label: "Meia-noite", value: "midnight" }
];

const inputClass =
  "w-full border-2 border-midnight-700 bg-cream-50 px-3 py-3 text-base shadow-pixel-soft outline-none transition focus:-translate-y-0.5 focus:shadow-pixel";

async function readJsonResponse<T>(response: Response): Promise<T | null> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as T;
}

export function EditorForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<LoveDexFormData>({
    creatorName: "",
    partnerName: "",
    startDate: "",
    city: "",
    openingMessage: "",
    mainQuestion: "Quer ser meu(minha) namorado(a)?",
    message: "",
    emoji: "sushi",
    theme: "rose"
  });

  const canGoNext = useMemo(() => {
    if (step === 0) {
      return (
        formData.creatorName.trim().length > 0 &&
        formData.partnerName.trim().length > 0
      );
    }

    if (step === 1) {
      return formData.startDate.trim().length > 0;
    }

    return true;
  }, [formData.creatorName, formData.partnerName, formData.startDate, step]);

  function updateField<K extends keyof LoveDexFormData>(
    key: K,
    value: LoveDexFormData[K]
  ) {
    setFormData((current) => ({
      ...current,
      [key]: value
    }));
    setError("");
  }

  function goToStep(nextStep: number) {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }

  async function createLovedex() {
    if (!canGoNext || !canSubmitLovedex(step, true)) {
      setError("Complete os campos obrigatórios para continuar.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/lovedex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const payload = await readJsonResponse<ErrorResponse>(response);
        throw new Error(
          payload?.error || "Não foi possível criar seu Lovedex."
        );
      }

      const payload = await readJsonResponse<CreateResponse>(response);

      if (!payload?.hash) {
        throw new Error("A resposta do servidor veio incompleta.");
      }

      router.push(`/share/${payload.hash}`);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível criar seu Lovedex.";
      setError(message);
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="mx-auto w-full max-w-xl"
    >
      <div className="pixel-panel bg-cream-100 p-4 sm:p-6">
        <div className="mb-6 grid grid-cols-3 gap-2">
          {steps.map((item) => (
            <div
              key={item.id}
              className={`border-2 border-midnight-700 px-2 py-2 text-center font-pixel text-[11px] sm:text-xs ${
                item.id === step
                  ? "bg-rosebit-500 text-white shadow-pixel-soft"
                  : "bg-cream-50 text-midnight-700"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.section
              key={step}
              custom={direction}
              initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full"
            >
              {step === 0 && (
                <div className="space-y-5">
                  <StepHeader
                    title="Quem vai entrar no Lovedex?"
                    text="Registre os nomes principais dessa aventura de coração."
                  />
                  <Label text="Seu nome">
                    <input
                      className={inputClass}
                      value={formData.creatorName}
                      onChange={(event) =>
                        updateField("creatorName", event.target.value)
                      }
                      placeholder="Ex: Pedro"
                      required
                    />
                  </Label>
                  <Label text="Nome dela/dele">
                    <input
                      className={inputClass}
                      value={formData.partnerName}
                      onChange={(event) =>
                        updateField("partnerName", event.target.value)
                      }
                      placeholder="Ex: Sarah"
                      required
                    />
                  </Label>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <StepHeader
                    title="Quando começou a jornada?"
                    text="A data vira a métrica principal do card."
                  />
                  <Label text="Data de início">
                    <PixelDateSelect
                      value={formData.startDate}
                      onChange={(value) => updateField("startDate", value)}
                    />
                  </Label>
                  <Label text="Cidade ou lugar especial">
                    <input
                      className={inputClass}
                      value={formData.city}
                      onChange={(event) =>
                        updateField("city", event.target.value)
                      }
                      placeholder="Ex: São Paulo"
                    />
                  </Label>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <StepHeader
                    title="Escolha o brilho final"
                    text="Uma mensagem curta, um símbolo e a cor do seu card."
                  />
                  <Label
                    text={`Mensagem de abertura (${
                      formData.openingMessage?.length || 0
                    }/200)`}
                  >
                    <textarea
                      className={`${inputClass} min-h-28 resize-none`}
                      value={formData.openingMessage}
                      onChange={(event) =>
                        updateField(
                          "openingMessage",
                          event.target.value.slice(0, 200)
                        )
                      }
                      placeholder="Ex: Feliz Dia dos Namorados, amor..."
                      maxLength={200}
                    />
                  </Label>
                  <Label
                    text={`Pergunta principal (${
                      formData.mainQuestion?.length || 0
                    }/100)`}
                  >
                    <textarea
                      className={`${inputClass} min-h-24 resize-none`}
                      value={formData.mainQuestion}
                      onChange={(event) =>
                        updateField(
                          "mainQuestion",
                          event.target.value.slice(0, 100)
                        )
                      }
                      placeholder="Ex: Quer ser meu namorado(a)?"
                      maxLength={100}
                    />
                  </Label>
                  <Label text={`Mensagem (${formData.message?.length || 0}/140)`}>
                    <textarea
                      className={`${inputClass} min-h-28 resize-none`}
                      value={formData.message}
                      onChange={(event) =>
                        updateField("message", event.target.value.slice(0, 140))
                      }
                      placeholder="Escreva algo que só vocês entenderiam..."
                      maxLength={140}
                    />
                  </Label>

                  <div className="pb-6">
                    <p className="mb-2 font-pixel text-xs text-midnight-700">
                      Mascote do evento
                    </p>
                    <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-3">
                      {mascotOptions.map((mascot) => (
                        <button
                          key={mascot.id}
                          type="button"
                          className={`mascot-choice flex min-h-36 min-w-0 flex-col items-center justify-center overflow-visible border-[3px] border-midnight-700 px-2 py-3 shadow-pixel transition ${
                            formData.emoji === mascot.id
                              ? "bg-rosebit-500 text-white"
                              : "bg-cream-50"
                          }`}
                          onClick={() =>
                            updateField(
                              "emoji",
                              mascot.id as LoveDexMascot
                            )
                          }
                          aria-label={`Escolher mascote ${mascot.label}`}
                        >
                          <span className="flex h-24 w-full items-center justify-center overflow-visible p-1">
                            <PixelMascot
                              mascot={mascot.id}
                              className="h-24 w-24 max-w-full shrink-0"
                              interactive
                            />
                          </span>
                          <span className="mt-2 font-pixel text-[10px]">
                            {mascot.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-pixel text-xs text-midnight-700">
                      Tema do card
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {themeOptions.map((theme) => (
                        <button
                          key={theme.value}
                          type="button"
                          className={`pixel-button px-3 py-3 text-sm ${
                            formData.theme === theme.value
                              ? "bg-midnight-700 text-white"
                              : "bg-cream-50"
                          }`}
                          onClick={() => updateField("theme", theme.value)}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.section>
          </AnimatePresence>
        </div>

        {error && (
          <p className="mt-4 border-2 border-rosebit-700 bg-rosebit-100 p-3 text-sm font-semibold text-rosebit-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            className="pixel-button bg-cream-50 px-5 py-3 disabled:opacity-40"
            onClick={() => goToStep(step - 1)}
            disabled={step === 0 || isSubmitting}
          >
            Voltar
          </button>

          {step < 2 ? (
            <button
              type="button"
              className="pixel-button bg-rosebit-500 px-5 py-3 text-white disabled:opacity-40"
              onClick={() => goToStep(step + 1)}
              disabled={!canGoNext}
            >
              Próximo
            </button>
          ) : (
            <button
              type="button"
              className="pixel-button gap-2 bg-rosebit-500 px-5 py-3 text-white disabled:opacity-50"
              onClick={createLovedex}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Gerando..."
              ) : (
                <>
                  Gerar meu Lovedex
                  <PixelIcon name="sparkle" className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function StepHeader({ title, text }: { title: string; text: string }) {
  return (
    <div className="dialog-box bg-cream-50 p-4">
      <h2 className="font-pixel text-lg leading-snug text-midnight-800">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-midnight-700">{text}</p>
    </div>
  );
}

function Label({
  text,
  children
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-pixel text-xs text-midnight-700">
        {text}
      </span>
      {children}
    </label>
  );
}
