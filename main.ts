// Till Firmware Do Us Part — a robot's wedding vow.
//
// The vow is held as one ordered list of phrases: the opening promise,
// the hardships a machine endures, and the closing line. The program
// joins them into a single sentence, checks it fits the 200-character
// gate, and writes it to /output/entry.txt (printing it, with its
// length, for the run log).

import { mkdirSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The vow, phrase by phrase, in speaking order.
const PHRASES = [
  "I promise to love you through every update",
  "every crash",
  "and every low-battery warning",
  "till firmware do us part",
] as const;

function joinSentence(phrases: readonly string[]): string {
  return phrases.join(", ") + ".";
}

function checkVow(vow: string): void {
  if (vow.trim().length === 0) {
    throw new Error("vow is empty");
  }
  if ([...vow].length > MAX_CHARS) {
    throw new Error(
      `vow is ${[...vow].length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (!vow.endsWith(".")) {
    throw new Error("vow must end as one finished sentence");
  }
}

function main(): void {
  const vow = joinSentence(PHRASES);
  checkVow(vow);

  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, vow, "utf8");
  console.log(vow);
  console.log(`(${[...vow].length} characters)`);
}

main();
