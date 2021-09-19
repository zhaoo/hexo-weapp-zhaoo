import { View, Image } from '@tarojs/components';
import loading from '@/assets/images/loading.gif';
import styles from './index.module.scss';

const Loading = () => {
  return (
    <View className={styles.loading}>
      <Image src={loading} mode='center' />
    </View>
  );
};

export default Loading;
