#! /usr/bin/env node
import { Ollama } from "ollama-node";
import { Command } from "commander";
import { join, dirname } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
//#region get version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { version } = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf8")
);
//#endregion
//#region command line setup
const program = new Command();
program.version(version);
program.name("Ollama CLI Interface");
program.description(`Generate text from an installed model using Ollama from the command line
Requires Ollama to be running  - check your top bar for the cute head
Example: ollama-cli "Why Is the Sky Blue"`);
program.usage("<prompt> [options]");
program.option("-m, --model <model>", "model to use", "llama2");
program.option("-j --json", "output as json");
//#endregion
//#region command line execution
program.parse(process.argv);
const prompt = program.args[0];
const model = program.getOptionValue("model");
const isJson = program.getOptionValue("json");
if (!prompt) program.help();
else
  (async () => {
    const ollama = new Ollama();
    await ollama.setModel(model);
    const obj = await ollama.generate(prompt);
    if (isJson) {
      console.log(JSON.stringify(obj));
      return;
    } else {
      console.log(obj.output);
    }
  })();
//#endregion
