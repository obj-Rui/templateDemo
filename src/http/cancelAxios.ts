import type { Canceler, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import qs from 'qs'

export function generateReqKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&')
}

// 取消axios请求方法封装
export const AxiosCanceler = () => {
  let pendingMap = new Map<string, Canceler>()

  /**
   * 存储请求
   * @param config axios请求配置
   */
  const addPendingRequest = (config: AxiosRequestConfig) => {
    const key = generateReqKey(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(key)) {
          pendingMap.set(key, cancel)
        }
      })
  }

  /**
   * 移除请求
   * @param config axios请求配置
   */
  const removePendingRequest = (config: AxiosRequestConfig) => {
    const key = generateReqKey(config)
    if (pendingMap.has(key)) {
      const cancel = pendingMap.get(key)
      cancel && cancel(key) // 取消请求
      pendingMap.delete(key) // 移除请求
    }
  }
  /**
   * 移除所有请求
   */
  const removeAllPending = () => {
    pendingMap.forEach((cancel) => {
      cancel && cancel()
    })
    pendingMap.clear()
  }
  /**
   * 重置请求
   */
  const reset = () => {
    pendingMap = new Map<string, Canceler>()
  }

  return {
    addPendingRequest,
    removePendingRequest,
    removeAllPending,
    reset
  }
}
