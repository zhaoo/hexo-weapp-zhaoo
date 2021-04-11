import { FC } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

interface ILiteLoading {
  text?: string;
}

const LiteLoading: FC<ILiteLoading> = ({ text }) => {
  return (
    <View className='lite-loading'>
      <Text className='text'>{text || '加载中...'}</Text>
    </View>
  );
};

export default LiteLoading;
