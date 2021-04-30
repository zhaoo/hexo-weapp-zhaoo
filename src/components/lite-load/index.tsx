import { FC } from 'react';
import { View, Text } from '@tarojs/components';
import Iconfont from '@/components/iconfont';
import './index.scss';

interface ILiteLoad {
  text?: string;
  icon?: string;
}

const LiteLoading: FC<ILiteLoad> = ({ text, icon }) => {
  return (
    <View className='lite-load'>
      {icon ? <Iconfont type='image' name={icon} size={18} /> : null}
      <Text className='text'>{text || '加载中...'}</Text>
    </View>
  );
};

export default LiteLoading;
