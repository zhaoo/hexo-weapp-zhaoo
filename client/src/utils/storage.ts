import Taro from '@tarojs/taro';

export const setStorageSync = (key: string, value) => {
  try {
    Taro.setStorageSync(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const setStorageItem = (key: string, item) => {
  const arr = getStorageSync(key) || [];
  if (arr.indexOf(item) < 0) {
    arr.push(item);
    setStorageSync(key, arr);
  }
};

export const removeStorageSync = (key: string) => {
  try {
    Taro.removeStorageSync(key);
  } catch (e) {
    console.error(e);
  }
};

export const getStorageSync = (key: string) => {
  try {
    const value = Taro.getStorageSync(key);
    if (value) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};
