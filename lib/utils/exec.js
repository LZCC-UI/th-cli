const { execSync, exec } = require("child_process");
const execSync = (command, cwd) => {
  return execSync(command, { cwd: cwd || "./", encoding: "utf-8" });
};
const exec = (command, cwd) => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: cwd || "./", encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
module.exports = {
  execSync,
  exec,
};
/***
 * execCwd(cwd).exec(command).(commond).end()
 *execCwd(cwd).then(()=>exec().then())
 */
