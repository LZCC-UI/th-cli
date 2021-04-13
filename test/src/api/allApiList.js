// 维护apiList，供fetchData使用
import { Message } from 'element-ui'
let apiList = {}

// 读取modules下面各模块得api，然后归并到apilist（按照模块更好找，并且避免冲突，以后更好维护修改）
// 千万注意接口名得key重复会被覆盖
const modulesFiles = require.context('./modules', true, /\.js$/)
// 把文件得对象合并
modulesFiles.keys().forEach(modulePath => {
  // set './app.js' => 'app'
  const moduleObj = modulesFiles(modulePath).default // 获取导出模块得对象
  apiList = Object.assign(apiList, moduleObj)
})

export default function (apiName) {
  if (!apiList[apiName]) {
    Message.error('api未定义！')
  }
  return apiList[apiName]
}
