#!/usr/bin/env node
const { program } = require('commander')
const fs = require('fs')
program.version(require('../package.json').version, '-v, --version')
program
  .command('create <name>')
  .description('create project')
  .action(name => require('../lib/crm')(name))
program.parse(process.argv)
