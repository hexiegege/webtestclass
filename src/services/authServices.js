import http from '../common/http'

export default {
  /**
   * 登录
   */
  login (param) {
    console.log(param)
    return http.post('/login', param)
  },

  /**
   * 测试登录
   */
  checkLogin () {
    return http.get('/session')
  },

  /**
   * 注销
   */
  logout () {
    return http.delete('/session')
  }
}
