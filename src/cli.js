import arg from "arg";

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
    template: args._[0] || "default",
  };
}

export function cli(args) {
  console.log(args);
}
