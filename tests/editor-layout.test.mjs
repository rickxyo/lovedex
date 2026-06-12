import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("as etapas do editor participam do fluxo e crescem com o conteúdo", async () => {
  const source = await readFile(
    new URL("../src/components/EditorForm.tsx", import.meta.url),
    "utf8"
  );

  assert.equal(source.includes('className="absolute inset-0"'), false);
  assert.equal(source.includes("min-h-[760px]"), false);
  assert.equal(source.includes("min-h-[520px]"), false);
  assert.equal(source.includes("min-h-[430px]"), false);
});
