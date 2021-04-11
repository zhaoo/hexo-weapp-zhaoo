import { FC } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { IPostItem } from '@/types/post';
import './index.scss';

interface IPostItemProps {
  data: IPostItem;
}

const PostItem: FC<IPostItemProps> = ({ data }) => {
  const { title = '', cover, excerpt = '' } = data;
  return (
    <View className='post-item'>
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
