import { FC, ReactNode } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface IPostListProps {
  slug: string;
  cover: string;
  title: string;
  excerpt: string;
  infoList?: ReactNode;
}

const PostList: FC<IPostListProps> = ({
  slug,
  cover,
  title,
  excerpt,
  infoList,
}) => {
  return (
    <View
      className={styles.postList}
      onClick={() => {
        Taro.navigateTo({ url: `/pages/post/post?slug=${slug}` });
      }}
    >
      <Image className={styles.cover} src={cover} lazyLoad mode='aspectFill' />
      <View className={styles.content}>
        <Text className={styles.title}>{title}</Text>
        <View className={styles.excerpt}>
          <Text>{excerpt}</Text>
        </View>
        <View className={styles.info}>{infoList}</View>
      </View>
    </View>
  );
};

export default PostList;
