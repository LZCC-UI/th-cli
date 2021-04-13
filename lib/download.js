const { execSync } = require("child_process");
const download = require("download-git-repo");
const ora = require("ora");
module.exports.clone = async (repo, desc) => {
  const process = ora(`初始化中...`);
  process.start();
  download(repo, desc, { clone: true }, function (err) {
    if (err) {
      console.log(err);
      process.stop();
      process.fail();
    } else {
      process.succeed();
      pushRemote();
    }
  });
};
const pushRemote = (remoteUrl) => {
  const process = ora("上传到远程仓...");
  process.start();
  let data = Buffer.from(execSync(`git add .`)).toString("utf-8");
  execSync(`git commit -m '项目初始化'`);
  execSync(`git remote add origin ${remoteUrl}`);
  execSync(`git push -u origin master`);
  console.log(data);
  process.succeed();
};
pushRemote();
