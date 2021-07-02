import { FC } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { IPostItem } from '@/types/post';
import './index.scss';

interface IPostItemProps {
  data: IPostItem;
}

const PostItem: FC<IPostItemProps> = ({ data }) => {
  const { title = '', cover, excerpt = '', slug } = data;
  return (
    <View
      className='post-item'
      onClick={() => Taro.navigateTo({ url: `/pages/post/post?slug=${slug}` })}
    >
      {cover ? (
        <Image className='cover' src={cover} lazyLoad mode='aspectFill' />
      ) : null}
      <View className='content'>
        <Text className='title'>{title}</Text>
        <Text className='excerpt'>{excerpt}</Text>
      </View>
    </View>
  );
};

export default PostItem;
