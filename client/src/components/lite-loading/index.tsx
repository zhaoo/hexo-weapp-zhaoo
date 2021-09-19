import { FC } from 'react';
import { View, Text } from '@tarojs/components';
import Icon from '@/components/icon';
import styles from './index.module.scss';

interface ILiteLoading {
  text?: string;
  icon?: string;
}

const LiteLoading: FC<ILiteLoading> = ({ text, icon }) => {
  return (
    <View className={styles.liteLoad}>
      {icon ? <Icon type='image' name={icon} size={18} /> : null}
      <Text className={styles.text}>{text || '加载中...'}</Text>
    </View>
  );
};

export default LiteLoading;
