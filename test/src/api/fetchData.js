import { Message } from 'element-ui'
import getApiByName from './allApiList'
import service from '@/api/service'

function handleRes(res) {
  // res.retcode 10000 接口正确
  if (res.retcode === 10000) {
    return res
  } else {
    // res.retcode 不为 10000 就是错误
    Message.error(res.retdesc)
    return Promise.reject(res)
  }
}

function fetchData(apiName, data = {}, isNeedErrorToast = true, headers) {
  const apiObj = getApiByName(apiName)
  const url = apiObj[0] || ''
  const method = apiObj[1] ? apiObj[1].toLowerCase() : 'get'

  const config = {
    method,
    url,
  }

  // 如果有请求头发送过去，可以自己设置请求头
  if (headers && typeof headers === 'object') {
    config.headers = headers
  }
  // 如果是get请求,传入得参数就是名就是params（归并处理，目的使用方便）
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }

  if (isNeedErrorToast) {
    return service(config)
      .then(handleRes)
      .catch(err => {
        throw new Error(err)
      })
  } else {
    return service(config)
  }
}
export default fetchData
