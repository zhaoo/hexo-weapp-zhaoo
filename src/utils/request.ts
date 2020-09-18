import Taro from '@tarojs/taro'
import { BASE_URL } from '@/config'
import { HTTP_STATUS } from '@/constants'

type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

const request = (url: string, data?: any, method: Method = 'GET', headers = {}) => {
  const option = {
    url: BASE_URL + url,
    data,
    method,
    header: {
      'content-type': 'application/json;charset=utf-8',
      ...headers
    },
    success: (res) => {
      if (res.statusCode === HTTP_STATUS.SUCCESS) {
        return res.data
      }
      const msg = `Error: code ${res.statusCode}`
      throw new Error(msg)
    },
    fail: ({ error }) => {
      console.error(error)
    }
  }
  return Taro.request(option)
}

const get = (url, data = {}, headers = {}) => {
  return request(url, data, 'GET', headers)
}

const post = (url, data = {}, headers = {}) => {
  return request(url, data, 'POST', headers)
}

export { request, get, post }