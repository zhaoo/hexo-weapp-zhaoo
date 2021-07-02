import Taro from '@tarojs/taro';
import { HTTP_STATUS } from '@/constants/index';
import { baseUrl } from '../../config.json';

type Method =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

export const request = async (
  url: string,
  data?: any,
  method: Method = 'GET',
  headers = {}
) => {
  const option = {
    url: baseUrl + url,
    data,
    method,
    header: {
      'content-type': 'application/json;charset=utf-8',
      ...headers,
    },
  };
  return Taro.request(option)
    .then(({ statusCode, data }) => {
      if (statusCode === HTTP_STATUS.SUCCESS) {
        return data;
      }
      const msg = `Error: code ${statusCode}`;
      throw new Error(msg);
    })
    .catch(({ error }) => {
      console.error(error);
    });
};

export const get = (url, data = {}, headers = {}) => {
  return request(url, data, 'GET', headers);
};

export const post = (url, data = {}, headers = {}) => {
  return request(url, data, 'POST', headers);
};
