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
    runInstall: args["--install"] || false,
  };
}

export function cli(args) {
  let opts = parseArgumnetsOptions(args);
  console.log(opts);
}
