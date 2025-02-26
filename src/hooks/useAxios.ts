import type { ResData } from '@/utils/request/axios.ts'
import type { RawAxiosRequestHeaders, ResponseType } from 'axios'
import { axios } from '@/utils/request/axios.ts'
import qs from 'qs'

const axiosUrl = ''

interface RequestOptions {
  customHeaders?: RawAxiosRequestHeaders
  timeout?: number
  responseType?: ResponseType
  retry?: number | boolean
  isMock?: boolean
}
export function useAxios() {
  const request = <P, R>(method: 'get' | 'post' | 'put' | 'delete', url: string, requestOptions: RequestOptions = { timeout: 100000 }) => {
    const { customHeaders, ...customConfig } = requestOptions

    const loading = ref(false)
    const data = ref<R>()
    const error = ref<ResData>()
    const res = ref<any>()
    const run = async (
      params?: P,
      {
        isQuery = false, // 是否是query参数
      }: {
        isQuery?: boolean
      } = {
        isQuery: false,
      },
    ) => {
      try {
        const config = (() => {
          switch (method) {
            case 'get':
              return {
                method: 'get',
                url: `${url}?${qs.stringify(params)}`,
                baseURL: axiosUrl,
                headers: { ...customHeaders },
                ...customConfig,
              }
            case 'post':
              return {
                method: 'post',
                url,
                data: params,
                baseURL: axiosUrl,
                headers: { ...customHeaders },
                ...customConfig,
              }
            case 'put':
              return {
                method: 'put',
                url,
                data: params,
                baseURL: axiosUrl,
                headers: { ...customHeaders },
                ...customConfig,
              }
            case 'delete':
              return {
                method: 'delete',
                url,
                baseURL: axiosUrl,
                headers: { ...customHeaders },
                ...(isQuery ? { params } : { data: params }), // 根据 isQuery 决定是 query 参数还是 body 数据
                ...customConfig,
              }
          }
        })()
        loading.value = true
        res.value = await axios<ResData>(config)
        data.value = res.value.data as R
        return res.value.data as R
      }
      catch (res: any) {
        error.value = res.data
        throw error.value
      }
      finally {
        loading.value = false
      }
    }
    return {
      run,
      data,
      loading,
      error,
      res,
    }
  }

  const get = <P, R>(url: string, options?: RequestOptions) => request<P, R>('get', url, options)
  const post = <P, R>(url: string, options?: RequestOptions) => request<P, R>('post', url, options)
  const put = <P, R>(url: string, options?: RequestOptions) => request<P, R>('put', url, options)
  const remove = <P, R>(url: string, options?: RequestOptions) => request<P, R>('delete', url, options)
  return {
    get,
    post,
    put,
    remove,
  }
}
