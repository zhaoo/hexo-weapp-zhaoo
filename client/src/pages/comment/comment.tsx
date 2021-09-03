import { View, Image } from '@tarojs/components';
import waitting from '@/assets/illustration/waitting.svg';
import styles from './comment.module.scss';

const Comment = () => {
  return (
    <View className={styles.comment}>
      <Image src={waitting} mode='aspectFill' />
    </View>
  );
};

export default Comment;
