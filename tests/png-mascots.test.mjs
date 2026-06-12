import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("renderiza os três mascotes PNG sem SVG", async () => {
  const source = await readFile(
    new URL("../src/components/PixelMascot.tsx", import.meta.url),
    "utf8"
  );

  assert.equal(source.includes("<img"), true);
  assert.equal(source.includes("<svg"), false);
  assert.equal(source.includes("/mascots/sushi.png"), true);
  assert.equal(source.includes("/mascots/tamagoyaki.png"), true);
  assert.equal(source.includes("/mascots/acai.png"), true);
});
