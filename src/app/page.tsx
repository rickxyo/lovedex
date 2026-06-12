import { EditorForm } from "@/components/EditorForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-tile px-4 py-8 sm:py-12">
      <section className="mx-auto mb-6 max-w-xl text-center">
        <div className="mx-auto mb-4 inline-flex border-2 border-midnight-700 bg-cream-50 px-3 py-2 font-pixel text-xs shadow-pixel-soft">
          SAVE SLOT • ROMANCE
        </div>
        <h1 className="font-pixel text-3xl leading-tight text-midnight-800 sm:text-5xl">
          Lovedex
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-midnight-700 sm:text-base">
          Crie um card retrô com as estatísticas do casal e envie como uma
          surpresa jogável.
        </p>
      </section>
      <EditorForm />
    </main>
  );
}
