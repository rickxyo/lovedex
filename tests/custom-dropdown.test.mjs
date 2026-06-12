import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("o seletor de data não usa select nativo", async () => {
  const source = await readFile(
    new URL("../src/components/PixelDateSelect.tsx", import.meta.url),
    "utf8"
  );

  assert.equal(source.includes("<select"), false);
  assert.equal(source.includes("<PixelDropdown"), true);
});
