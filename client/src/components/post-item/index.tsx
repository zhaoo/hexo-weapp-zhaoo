import { FC } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { IPostItem } from '@/types/post';
import styles from './index.module.scss';

interface IPostItemProps {
  data: IPostItem;
}

const PostItem: FC<IPostItemProps> = ({ data }) => {
  const { title = '', cover, excerpt = '', slug, top } = data;
  return (
    <View
      className={styles.postItem}
      onClick={() => Taro.navigateTo({ url: `/pages/post/post?slug=${slug}` })}
    >
      {top ? <View className={styles.top} /> : null}
      {cover ? (
        <Image
          className={styles.cover}
          src={cover}
          lazyLoad
          mode='aspectFill'
        />
      ) : null}
      <View className={styles.content}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.excerpt}>{excerpt}</Text>
      </View>
    </View>
  );
};

export default PostItem;
