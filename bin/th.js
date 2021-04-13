#!/usr/bin/env node
const { program } = require('commander')
const fs = require('fs')
program.version(require('../package.json').version, '-v, --version')
program
  .command('create <name>')
  .description('create project')
  .option('-r,--registry [registry]', 'remote registry')
  .action((name, cmd) => require('../lib/crm')(name, cmd))
program.parse(process.argv)
