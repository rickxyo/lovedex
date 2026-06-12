import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  formatLocalDate,
  parseLocalDate
} = require("../.tmp-tests/date.js");

test("interpreta uma data ISO como data civil local", () => {
  const date = parseLocalDate("2022-12-12T00:00:00.000Z");

  assert.equal(date.getFullYear(), 2022);
  assert.equal(date.getMonth(), 11);
  assert.equal(date.getDate(), 12);
});

test("formata a data sem perder um dia pelo timezone", () => {
  assert.equal(
    formatLocalDate("2022-12-12T00:00:00.000Z"),
    "12/12/2022"
  );
});
