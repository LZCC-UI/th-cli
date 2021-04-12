const { promisify } = require("util");
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
    }
  });
};
