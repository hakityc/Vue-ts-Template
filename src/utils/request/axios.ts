import type { AxiosResponse } from 'axios'
import _axios from 'axios'
import axiosRetry from 'axios-retry'

export interface ResData {
  code: number
  data: any
  message: string
}

export interface CmdError {
  isCmdError: true
  code: number
  data: any
  message: string
}

const instance = _axios.create({
  baseURL: '/api',
})

instance.interceptors.response.use((response: AxiosResponse<ResData>) => {
  if (response.data.code !== 0) {
    return Promise.reject({
      isCmdError: true,
      ...response.data,
    })
  }
  response.data = response.data.data
  return response
})

axiosRetry(instance, {
  retries: 3, // 设置自动发送请求次数
  shouldResetTimeout: true, // 重试请求超时时间
  retryCondition: (error: any) => {
    if (!error.config?.retry)
      throw error
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED' || error.message.includes('timeout')
  },
})

export const axios = instance
