import axios from 'axios'
import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { AxiosCanceler } from './cancelAxios'

export const getAxiosInstance = (options: CreateAxiosDefaults): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create(options)
  const axiosCanceler = AxiosCanceler()
  // 添加请求拦截器
  axios.interceptors.request.use(
    function (config) {
      axiosCanceler.addPendingRequest(config)
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  axios.interceptors.response.use(
    function (res) {
      res && axiosCanceler.removePendingRequest(res.config)
      return res
    },
    function (error) {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )
  return axiosInstance
}
