const { execSync } = require('child_process')

function cd(path) {
  console.log('aaa')
  let res = execSync('ls', { cwd: 'utils' })
  console.log(res.toString())
}
cd('utils')
