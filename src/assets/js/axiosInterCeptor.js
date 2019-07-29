import axios from 'axios'
import host from './host'
// import { Message } from 'iview'
import router from '@/router/index'

// 创建axios实例


const service = axios.create({
  baseURL: host.host, // api的base_url
  timeout: 30000 // 请求超时时间
})
// http request 拦截器
service.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.token = `${localStorage.token}`
    } else {
      // window.location.href = '/#/login'
      router.replace('/login')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code === 101) {
      // window.location.href = "/#/login"
      router.replace('/login')
      // alert("对不起，您尚未登录，请先登录！")
    }
    return response
  },
  error => {
    console.log(error)
    // Message.error(error)
    // if (error) {}
    return Promise.reject(error) // 返回接口返回的错误信息
  })
// axios.defaults.headers.post['Content-Type'] = 'application/json'
export default service
