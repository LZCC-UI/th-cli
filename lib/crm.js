const clear = require("clear");
const fs = require("fs");
const { execSync } = require("./utils/exec");
const download = require("download-git-repo");
const ora = require("ora");
const { msTemplate } = require("../config/index");
const { log } = require("./utils/log");
const create = async (dest, pushRegistry) => {
  if (fs.existsSync(`./${dest}`)) {
    console.error("该文件夹已存在，请更改");
  } else {
    log("🚀 创建项目...");
    const process = ora(`初始化中...`);
    process.start();
    download(msTemplate, dest, { clone: true }, function (err) {
      if (err) {
        console.log(err);
        process.stop();
        process.fail();
      } else {
        process.succeed();
        pushRemote(pushRegistry, dest);
      }
    });
  }
};
const pushRemote = (remoteUrl, dest) => {
  const process = ora("上传到远程仓...");
  process.start();
  const stdout = execSync("git init", dest);
  const isExistRemote = execSync("git remote -v", dest);
  if (isExistRemote) {
    execSync(
      `git remote rm origin && git remote add origin ${remoteUrl}`,
      dest
    );
  } else {
    execSync(`git remote add origin ${remoteUrl}`, dest);
  }
  execSync(
    `git add . && git commit -m '项目初始化' && git push -u origin master`,
    dest
  );
  //   execSync(`git commit -m '项目初始化'`, dest);
  //   execSync(`git push -u origin master`, dest);
  process.succeed();
  log("√ 初始化完成");
};
module.exports = async (dest, params) => {
  clear();
  if (!params.registry) {
    log("Maybe you want to use this command：th create -r [registry] [name]");
  } else {
    create(dest, params.registry);
  }
};
