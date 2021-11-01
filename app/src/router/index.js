/*
 * @Author: Li shirun 
 * @Date: 2021-10-16 18:45:21 
 * @Last Modified by: Li shirun
 * @Last Modified time: 2021-10-30 21:22:11
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 实现路由懒加载
const login = () => import('../components/Login.vue')
const home = () => import('../components/Home.vue')
// const welecome = () => import('../components/Welecome.vue')
// 用户管理
const users = () => import('../components/user_management/User')

// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}




const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/home', component: home,
    // redirect: '/welecome',
    children: [
      // 欢迎
      // { path: '/welecome', component: welecome },
      // 用户管理
      { path: '/users', component: users },
    ]
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  /*
  to 将要访问的路径
  from 代表从哪个路径跳转而来
  next 是一个函数，表示放行
  next()  放行    next('/login')  强制跳转
   */
  if (to.path === '/login') {
    return next()
  }
  else {
    // 获取token并判断
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) {
      return next('/login')
    }
    else {
      next()
    }
  }
})

export default router
