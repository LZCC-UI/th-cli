const chalk = require('chalk')
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
module.exports = {
  logFiglet: async content => {
    const data = await figlet(content)
    console.log(chalk.green(data))
  },
  log: content => {
    console.log(chalk.green(content))
  },
}
