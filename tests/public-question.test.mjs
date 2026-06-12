import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("a pergunta pública mostra apenas a ação Abrir", async () => {
  const source = await readFile(
    new URL("../src/components/PublicLoveDexExperience.tsx", import.meta.url),
    "utf8"
  );

  assert.equal(source.includes("preparou esse convite"), false);
  assert.equal(source.includes(">Não<"), false);
  assert.equal(source.includes("Sim, com todo meu coração"), false);
  assert.equal(source.includes("Abrir"), true);
  assert.equal(source.includes('name="heart"'), true);
});
