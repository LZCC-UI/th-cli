#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");
program.version(require("../package.json").version, "-v, --version");
program
  .command("init <name>")
  .description("init project")
  .action((name) => require("../lib/init")(name));
program.parse(process.argv);
