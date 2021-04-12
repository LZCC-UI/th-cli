const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const { clone } = require('./download')
let log = content => console.log(chalk.green(content))
module.exports = async name => {
  clear()
  const data = await figlet('welcome TH')
  log(data)
  log('🚀 初始化项目...')
  clone('github:su37josephxia/vue-template', name)
}
