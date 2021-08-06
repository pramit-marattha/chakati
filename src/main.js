import chalk from "chalk";
import fs from "fs";
import path from "path";
import ncp from "ncp";
import { promisify } from "util";

// access
const access = promisify(fs.access);

// reccusive copy
const copy = promisify(ncp);

// async function to copy template files
async function copyTemplateFiles(opts) {
  return copy(opts.templateDirectory, opts.targetDirectory, {
    clobber: false,
  });
}

export async function chakatiFire(opts) {
  opts = {
    ...opts,
    targetDirectory: opts.targetDirectory || process.cwd(),
  };

  const currentTargetFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentTargetFileUrl).pathname,
    "../../templates",
    opts.template.toLowerCase()
  );
  opts.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.log(chalk.red(`Template directory ${templateDir} does not exist`));
    process.exit(1);
  }

  console.log("Copy project files");
  await copyTemplateFiles(opts);
  console.log(chalk.green(`Creating project from template ${opts.template}`));
  return true;
}
