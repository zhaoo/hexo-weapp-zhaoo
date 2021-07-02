import { View } from '@tarojs/components';
import Skeleton from '@/components/skeleton';
import styles from './index.module.scss';

const PostSkeleton = () => {
  return (
    <View className={styles.skeleton}>
      <Skeleton type='image' style={{ width: '100vw', height: '75vw' }} />
      <Skeleton type='column' style={{ padding: 15 }} row={14} title />
    </View>
  );
};

export default PostSkeleton;
