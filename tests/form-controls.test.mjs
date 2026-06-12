import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  canSubmitLovedex,
  composeIsoDate,
  daysInMonth,
  getMainQuestion,
  getOpeningMessage,
  getRelationshipPace
} = require("../.tmp-tests/form-controls.js");

test("calcula fevereiro em ano bissexto", () => {
  assert.equal(daysInMonth(2, 2024), 29);
  assert.equal(daysInMonth(2, 2023), 28);
});

test("compõe uma data ISO somente com valores completos e válidos", () => {
  assert.equal(composeIsoDate(7, 4, 2022), "2022-04-07");
  assert.equal(composeIsoDate(31, 2, 2022), "");
  assert.equal(composeIsoDate(undefined, 4, 2022), "");
});

test("permite criação somente na etapa final após clique explícito", () => {
  assert.equal(canSubmitLovedex(1, true), false);
  assert.equal(canSubmitLovedex(2, false), false);
  assert.equal(canSubmitLovedex(2, true), true);
});

test("usa modo cooperativo como ritmo do relacionamento", () => {
  assert.equal(getRelationshipPace(), "ativo");
});

test("usa a mensagem de abertura padrão quando o campo está vazio", () => {
  assert.equal(
    getOpeningMessage(""),
    "Alguém especial criou isso pra você. Abre com calma."
  );
  assert.equal(getOpeningMessage("  Uma surpresa chegou.  "), "Uma surpresa chegou.");
});

test("usa a pergunta principal padrão quando o campo está vazio", () => {
  assert.equal(
    getMainQuestion(""),
    "Quer ser meu(minha) namorado(a)?"
  );
  assert.equal(
    getMainQuestion("  Vamos jogar juntos pra sempre?  "),
    "Vamos jogar juntos pra sempre?"
  );
});
