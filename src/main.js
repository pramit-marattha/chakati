import chalk from "chalk";
import fs from "fs";
import path from "path";
import ncp from "ncp";
import { promisify } from "util";
import execa from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";

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

  const fullPathName = new URL(import.meta.url).pathname;
  let templateDir = path.resolve(
    fullPathName.substr(fullPathName.indexOf("/")),
    "../../templates",
    opts.template.toLowerCase()
  );
  templateDir = templateDir.substring(3);
  opts.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.log(chalk.red(`Template directory ${templateDir} does not exist`));
    console.log(err);
    process.exit(1);
  }

  console.log("Copy project files");
  await copyTemplateFiles(opts);
  console.log(chalk.green(`Creating project from template ${opts.template}`));
  return true;
}
