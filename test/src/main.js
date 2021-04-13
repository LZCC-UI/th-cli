import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import './styles/element-variables.scss'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/styles/customer.scss'
import '@/icons'
import './permission'
import { Message } from 'element-ui'
import fetchData from '@/api/fetchData'
import * as filters from './filters'
Vue.prototype.fetchData = fetchData
Vue.prototype.$message = Message

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) //插入过滤器名和对应方法
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
