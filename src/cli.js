import arg from "arg";
import inquirer from "inquirer";
import { chakatiFire } from "./main.js";

function parseArgumnetsOptions(rawArguments) {
  let args = arg(
    {
      "--git": Boolean,
      "--help": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "--g": "--git",
      "--h": "--help",
      "--y": "--yes",
      "--i": "--install",
    },
    {
      argv: rawArguments.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
  };
}

async function promptErrorMissingOpts(opts) {
  const defaultTemplate = "JavaScript";
  if (opts.skipPrompts) {
    return {
      ...opts,
      template: opts.template || defaultTemplate,
    };
  }
  const displayOptions = [];
  if (!opts.template) {
    displayOptions.push({
      type: "list",
      name: "template",
      message: "What template would you like to use?",
      choices: ["JavaScript"],
      default: defaultTemplate,
    });
  }

  if (!opts.git) {
    displayOptions.push({
      type: "confirm",
      name: "git",
      message: "Would you like to use git?",
      default: false,
    });
  }

  const userInput = await inquirer.prompt(displayOptions);
  return {
    ...opts,
    template: opts.template || userInput.template,
    git: opts.git || userInput.git,
  };
}

export async function cli(args) {
  let opts = parseArgumnetsOptions(args);
  opts = await promptErrorMissingOpts(opts);
  // console.log(opts);
  await chakatiFire(opts);
}
