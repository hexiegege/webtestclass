import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from "@/plugins/vuetify"
import qs from 'qs'
import ElementUI from 'element-ui'
import eCharts from 'echarts'
import Locale from 'element-ui/lib/locale/lang/zh-CN'
import i18n from "./plugins/i18n"
import axios from 'axios'
// 引入图标
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.config.productionTip = false
//序列化
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
// Element UI 可以不用
Vue.use(ElementUI,{Locale})
new Vue({
  router,// 路由
  store, // 状态管理，全局数据
  vuetify, // UI框架
  eCharts, // 图表工具
  i18n, // 前端国际化
  render: h => h(App),
}).$mount('#app')
