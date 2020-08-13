//权限验证
import authServices from '@/services/authServices'
import store from '../store'

export default (router) => {
  router.beforeEach((to, from, next) => {
    // 检查是否登录
    console.log(to.path)
    authServices.checkLogin().then((res) => {
      let {role = ''} = to.meta
      let userRole = store.state.user.role
      console.log(userRole)
      if (role === '' || role.indexOf(userRole) !== -1) {
        next()
      } else {
        return next({path: '/login'})
      }
    })
      .catch((err) => {
        store.commit('USER_LOGOUT', store.state.user)
        let isLoginPath = to.path === '/login'
        if (!isLoginPath) {
          return next({path: '/login'})
        } else {
          next()
        }
      })
  })
}
