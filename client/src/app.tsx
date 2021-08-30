import { useEffect } from 'react';
import Taro from '@tarojs/taro';
import './utils/mtj-wx-sdk';
import './app.scss';

export default function ({ children }) {
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init();
    }
  }, []);

  return children;
}
