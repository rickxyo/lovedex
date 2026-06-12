import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = {
  schema: "../prisma/schema.prisma",
  types: "../src/types/lovedex.ts",
  api: "../src/app/api/lovedex/route.ts",
  editor: "../src/components/EditorForm.tsx",
  publicExperience: "../src/components/PublicLoveDexExperience.tsx"
};

test("openingMessage atravessa persistência, editor e experiência pública", async () => {
  for (const [name, path] of Object.entries(files)) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.equal(
      source.includes("openingMessage"),
      true,
      `${name} precisa incluir openingMessage`
    );
  }
});
