'use strict'
import login from '../views/login/login'
import index from "../views/index/index";
import home from "../views/index/home";
import course from "../views/course/course";
import user from "../views/user/user";
import subscribe from "../views/subscribe/subscribe";
import subscribeMine from "../views/subscribe/subscribeMine";
import createUser from "../views/user/createUser";
/**
 * @param path  路径
 * @param file  文件
 * @param name  名称
 * @param meta  自定义属性
 * @returns {{path: *, component: (function(): *), children: *, exact: boolean, name: *}}
 */
function route (path, file, name, meta) {
  return {
    exact: true,
    'path': path,
    'name': name,
    'meta': meta,
    component: file
  }
}

/**
 * 路由文件映射
 */

export default [
  //先重定向到登录
  {
    path: '/',
    redirect: '/login'
  },
  //路由到登录页面
  route('/login',login,'login',{name:'登录', role: ''}),

  // 路由到主页
  {
    path: '',
    name: 'index',
    component: index,
    meta: {role: ''},
    redirect: '/home',
    children: [
      route('/home',home,'home',{name:'主页',role: ''}),
      route('/course',course,'course',{name:'课程列表', role: 'TEACHER'}),
      route('/subscribe',subscribe,'subscribe',{name:'课程订阅', role: 'STUDENT'}),
      route('/subscribeMine',subscribeMine,'subscribeMine',{name:'我的订阅', role: 'STUDENT'}),
      route('/user',user,'user',{name:'用户列表', role: 'ADMIN'}),
      route('/createUser',createUser,'createUser',{name:'新增用户', role: 'ADMIN'}),
   ]
  }
]
