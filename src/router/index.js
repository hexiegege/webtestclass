import Vue from 'vue'
import Router from 'vue-router'
import hooks from "./hooks";
// 详细页面配置
import routers from "./map"
// 使用路由
Vue.use(Router)
const router = new Router(
  {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routers
  })
// 拦截路由查看是否登录
//hooks(router)

export default  router
