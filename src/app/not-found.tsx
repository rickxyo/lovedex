import Link from "next/link";
import { PixelIcon } from "@/components/PixelIcon";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-tile px-4 py-10">
      <section className="pixel-panel max-w-md bg-cream-100 p-5 text-center">
        <div className="dialog-box bg-cream-50 p-5">
          <p className="font-pixel text-xs text-rosebit-700">404 • SLOT VAZIO</p>
          <PixelIcon
            name="broken-heart"
            className="mx-auto mt-4 h-12 w-12 text-rosebit-700"
          />
          <h1 className="mt-4 font-pixel text-2xl leading-tight text-midnight-800">
            Este Lovedex não existe... ainda
          </h1>
          <p className="mt-4 text-sm leading-6 text-midnight-700">
            O link pode estar incompleto ou essa aventura ainda não foi salva.
          </p>
          <Link
            href="/"
            className="pixel-button mt-6 inline-flex bg-rosebit-500 px-5 py-3 text-white"
          >
            Criar um Lovedex
          </Link>
        </div>
      </section>
    </main>
  );
}
