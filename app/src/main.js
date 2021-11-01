/*
 * @Author: Li shirun
 * @Date: 2021-10-20 14:48:19
 * @Last Modified by: Li shirun
 * @Last Modified time: 2021-10-31 14:37:46
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 引入全局样式
import './assets/CSS/base.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 按需引入elementui库
import './plugins/element.js'
import axios from 'axios'
// 打字机标题
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)

Vue.config.productionTip = false
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:3000/api/'
// 设置拦截器,通过axios拦截器添加token,保证拥有获取数据的权限
axios.interceptors.request.use((config) => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return一下
  return config
})
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
