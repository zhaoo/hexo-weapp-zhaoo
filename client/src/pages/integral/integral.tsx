import { View, Image } from '@tarojs/components';
import waitting from '@/assets/illustration/waitting.svg';
import styles from './integral.module.scss';

const Integral = () => {
  return (
    <View className={styles.integral}>
      <Image src={waitting} mode='aspectFill' />
    </View>
  );
};

export default Integral;
