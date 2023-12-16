#! /bin/env node
import { Ollama } from "ollama-node";
import { Command } from "commander";
import { join } from "node:path";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("./package.json", "utf8"));
const program = new Command();
program.version(version);
program.name("Ollama CLI Interface");
program.usage("<prompt> [options]");
program.option("-m, --model <model>", "model to use", "llama2");
program.option("-j --json", "output as json");
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
