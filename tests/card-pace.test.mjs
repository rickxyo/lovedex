import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("o card separa o label modo co-op do valor ativo", async () => {
  const source = await readFile(
    new URL("../src/components/LoveDexCard.tsx", import.meta.url),
    "utf8"
  );

  assert.equal(source.includes('label="modo co-op"'), true);
  assert.equal(source.includes('label="Ritmo"'), false);
});
