/*
 * @Descripttion: 工具函数封装
 */

import Taro from '@tarojs/taro';
import { setStorageSync, getStorageSync } from '@/utils/storage';

interface IFormateDate {
  (rawDate: string): string;
}

export const formateDate: IFormateDate = (rawDate) => {
  const arr = new Date(rawDate).toString().split(' ');
  const m = arr[1];
  const d = arr[2];
  const y = arr[3];
  return `${m} ${d}, ${y}`;
};

export const getUserInfo = async (): Promise<{
  avatarUrl: string;
  nickName: string;
  city: string;
  country: string;
  gender: number;
  language: string;
  province: string;
}> => {
  const storage = getStorageSync('userinfo');
  if (storage) {
    return storage;
  } else {
    const res = await Taro.getUserProfile({
      desc: '用户信息将用于存储社交状态',
    });
    const { userInfo } = res;
    setStorageSync('userinfo', userInfo);
    return userInfo;
  }
};

export const filterHtml = (str) => {
  var re = /<[^>]+>/gi;
  return str.replace(re, '');
};
