import { FC } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { IGalleryItem } from '@/types/gallery';
import styles from './index.module.scss';

interface IGalleryItemProps {
  data: IGalleryItem;
}

const GalleryItem: FC<IGalleryItemProps> = ({ data }) => {
  const { name, count, cover } = data;

  return (
    <View
      className={styles.galleryItem}
      onClick={() =>
        Taro.navigateTo({
          url: `/pages/gallery/gallery?name=${name}`,
        })
      }
    >
      {cover ? (
        <Image
          className={styles.cover}
          src={cover}
          lazyLoad
          mode='aspectFill'
        />
      ) : null}
      <View className={styles.content}>
        <Text className={styles.name}>{name}</Text>
        <Text className={styles.count}>{`${count}张`}</Text>
      </View>
    </View>
  );
};

export default GalleryItem;
