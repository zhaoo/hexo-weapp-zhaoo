import { FC } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { IGalleryItem } from '@/types/gallery';
import './index.scss';

interface IGalleryItemProps {
  data: IGalleryItem;
}

const GalleryItem: FC<IGalleryItemProps> = ({ data }) => {
  const { name, count, cover } = data;

  return (
    <View
      className='gallery-item'
      onClick={() =>
        Taro.navigateTo({
          url: `/pages/gallery/gallery?name=${name}`,
        })
      }
    >
      {cover ? (
        <Image className='cover' src={cover} lazyLoad mode='aspectFill' />
      ) : null}
      <View className='content'>
        <Text className='name'>{name}</Text>
        <Text className='count'>{`${count}张`}</Text>
      </View>
    </View>
  );
};

export default GalleryItem;
