import { View, Image } from '@tarojs/components';
import waitting from '@/assets/illustration/waitting.svg';
import styles from './laboratory.module.scss';

const Laboratory = () => {
  return (
    <View className={styles.laboratory}>
      <Image src={waitting} mode='aspectFill' />
    </View>
  );
};

export default Laboratory;
