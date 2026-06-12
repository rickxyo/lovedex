import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("a página de compartilhamento acessa Prisma sem fetch interno", async () => {
  const source = await readFile(
    new URL("../src/app/share/[hash]/page.tsx", import.meta.url),
    "utf8"
  );

  assert.equal(source.includes("fetch("), false);
  assert.equal(source.includes("prisma.loveDex.findUnique"), true);
  assert.equal(source.includes("localhost:3000"), false);
});

test("rotas server-side não usam localhost como fallback", async () => {
  const files = [
    "../src/app/api/lovedex/route.ts",
    "../src/app/share/[hash]/page.tsx",
    "../src/app/r/[hash]/page.tsx"
  ];

  for (const file of files) {
    const source = await readFile(new URL(file, import.meta.url), "utf8");
    assert.equal(source.includes("http://localhost:3000"), false);
  }
});
