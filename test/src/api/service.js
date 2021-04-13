import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 60000,
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.retcode === 20012) {
      // 未登录
      // 此处跳转登陆接口
      let url = window.location.href
      window.location.href = `/openid/login.html?url=${encodeURIComponent(url)}`
      return Promise.reject('用户未登录')
    } else if (res.retcode === 20063) {
      Message({
        message: '用户无此接口权限',
        type: 'error',
        duration: 3 * 1000,
      })
    } else if (res.retcode === 20064) {
      window.open('about:_self', '_self')
      window
        .open('about:_self', '_self')
        .document.write('用户不属于后台，请联系管理员进行注册')
      return Promise.reject('用户不属于后台，请联系管理员进行注册')
    } else if (!res.retcode) {
      return response
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
