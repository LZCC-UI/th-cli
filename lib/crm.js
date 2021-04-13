#!/usr/bin/env node
const clear = require('clear')
const fs = require('fs')
const path = require('path')
const { execSync, exec } = require('child_process')
const download = require('download-git-repo')
const ora = require('ora')
const { log } = require('./utils/log')
const create = async (pullRepo, desc, pushRegistry) => {
  // if (fs.existsSync(`./${desc}`)) {
  //   console.error('该文件夹已存在，请更改')
  // } else {

  pushRemote(pushRegistry, desc)
  // log('🚀 创建项目...')
  // const process = ora(`初始化中...`)
  // process.start()
  // download(pullRepo, desc, { clone: true }, function (err) {
  //   if (err) {
  //     console.log(err)
  //     process.stop()
  //     process.fail()
  //   } else {
  //     process.succeed()
  //     pushRemote(pushRegistry, desc)
  //   }
  // })
  // }
}
const pushRemote = (remoteUrl, desc) => {
  const process = ora('上传到远程仓...')
  process.start()
  const stdout = execSync('git init', {
    cwd: desc,
    encoding: 'utf-8',
  })
  console.log(stdout)

  execSync(`git remote set-url origin ${remoteUrl}`, {
    cwd: desc,
    encoding: 'utf-8',
  })
  return
  let data = Buffer.from(
    execSync(`git add .`, { cwd: desc, encoding: 'utf-8' })
  ).toString('utf-8')
  console.log(data)
  execSync(`git commit -m '项目初始化'`, {
    cwd: desc,
    encoding: 'utf-8',
  })
  execSync(`git remote add origin ${remoteUrl}`, {
    cwd: desc,
    encoding: 'utf-8',
  })
  execSync(`git push -u origin master`, {
    cwd: desc,
    encoding: 'utf-8',
  })
  process.succeed()
}
module.exports = async (name, cmd) => {
  clear()
  if (!cmd.registry) {
    log(
      'Maybe you wang to use this command：th create -r [registry] [name]'
    )
  } else {
    create('github:LZCC-UI/ms-template', name, cmd.registry)
  }
}
