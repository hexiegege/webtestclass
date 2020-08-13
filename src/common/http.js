/*网络请求封装*/
import axios from 'axios'
import qs from 'qs'
import store from '../store'
const API_ROOT = 'http://localhost:8080'
// 设置axios的基础请求路径
axios.defaults.baseURL = API_ROOT;
// 设置axios的请求超时
axios.defaults.timeout = 5000;

// request拦截器
axios.interceptors.request.use(
  config => {
    // 让每个请求携带token
    if(store.state.user.token){
      config.headers.Authorization = store.state.user.token;
    }
    //['Authorization'] = store.state.user.token;
    return config;
  },
  error => {
    // 请求错误处理
    console.log('request拦截失败')
    Promise.reject(error);
  }
)

// respone拦截器
axios.interceptors.response.use(
  response => {
    console.log(response)
    // 统一处理状态
    if (response.data.code !== 0) { // 需自定义
      // 返回异常
      return Promise.reject({
        status: response.data.code,
        message: response.data.msg
      });
    } else {
      return response;
    }
  },
  // 处理处理
  error => {
    if (error && error.response) {
      console.log(error)
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未授权，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问:没有权限请先登录';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `未知错误${error.response.status}`;
      }
    } else {
      error.message = "连接到服务器失败";
    }
    return Promise.reject(error);
  }
)

export default {
  /*网络请求部分*/
  /*
   *  get请求
   *  url:请求地址
   *  params:参数
   * */
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url,{params: qs.stringify(params)}).
      then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  /*
   *  post请求
   *  url:请求地址
   *  params:参数
   * */
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url,qs.stringify(params)).
      then(response => {
        console.log(response)
        resolve(response);
      }).catch(error => {
        console.log(error)
        reject(error);
      });
    });
  },
  /*
   *  put请求
   *  url:请求地址
   *  params:参数
   * */
  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, qs.stringify(params)).
      then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  /**
   * 删除
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url,{params: qs.stringify(params)})
        .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  /*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
  fileUpload(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url,params,{headers: {'Content-Type': 'multipart/form-data'}})
      .then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
}


