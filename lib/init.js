const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const { clone } = require("./download");
let log = (content) => console.log(chalk.green(content));
module.exports = async (name) => {
  clear();
  const data = await figlet("welcome TH");
  log(data);
  clone("direct:https://gitlab.corp.youdao.com/yunke/yunke-admin-fe.git", name);
};
