import { Ollama } from "ollama-node";
import { Command } from "commander";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import packageInfo from "./package.json" assert { type: "json" };
const { version } = packageInfo;
const program = new Command();
program.version(version);
program.name("Ollama CLI Interface");
program.usage("<prompt> [options]");

program.addOption("-m, --model <model>", "model to use", "llama2");

program.parse(process.argv);
prompt = program.args[0];
model = program.model;
(async () => {
  const ollama = new Ollama();
  await ollama.setModel(model);
  const { output } = await ollama.generate(prompt);
  console.log(output);
})();
