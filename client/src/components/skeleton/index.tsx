import { FC, CSSProperties } from 'react';
import { View, Image } from '@tarojs/components';
import image from '@/assets/illustration/image.svg';
import styles from './index.module.scss';

interface ISkeletonProps {
  type?: 'column' | 'image';
  row?: number;
  title?: boolean;
  style?: CSSProperties;
  rowStyle?: CSSProperties;
}

const Skeleton: FC<ISkeletonProps> = ({
  type = 'column',
  row = 1,
  title = false,
  style,
  rowStyle,
}) => {
  return (
    <View className={styles.skeleton}>
      {type === 'image' ? (
        <View className={styles.image} style={{ ...style }}>
          <Image src={image} className={styles.illustration} />
        </View>
      ) : null}
      {type === 'column' ? (
        <View className={styles.column} style={{ ...style }}>
          {title ? (
            <View className={styles.columnTitle} style={{ ...rowStyle }} />
          ) : null}
          {row > 0
            ? Array.from(Array(title ? row - 1 : row), (item, index) => (
                <View
                  key={index}
                  className={styles.columnItem}
                  style={{ ...rowStyle }}
                />
              ))
            : null}
        </View>
      ) : null}
    </View>
  );
};

export default Skeleton;
