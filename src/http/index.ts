import { ContentTypeEnum } from '@/enums/httpEnum'
import { getAxiosInstance } from './Axios'
import { useGlobSetting } from '@/hook/useGlobSetting'
import type { CreateAxiosDefaults } from 'axios'

export interface ApiResult<T> {
  code: number
  message: string
  data: T
}

const globSetting = useGlobSetting()

const defaultConfig: CreateAxiosDefaults = {
  // 超时时间
  timeout: 10 * 1000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  // 接口地址
  baseURL: globSetting.urlPrefix
    ? `${globSetting.apiUrl}/${globSetting.urlPrefix}`
    : globSetting.apiUrl
}

const axiosInstance = getAxiosInstance(defaultConfig)

export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.get<ApiResult<T>>(url, params)
  return response.data
}
export async function post<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.post<ApiResult<T>>(url, params)
  return response.data
}
export async function put<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.put<ApiResult<T>>(url, params)
  return response.data
}
export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.delete<ApiResult<T>>(url, params)
  return response.data
}
