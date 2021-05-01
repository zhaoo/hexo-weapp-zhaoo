import { FC } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { IPostItem } from '@/types/post';
import { formateDate } from '@/utils/index';
import './index.scss';

interface IHistoryItemProps {
  data: IPostItem;
}

const HistoryItem: FC<IHistoryItemProps> = ({ data }) => {
  return (
    <View
      className='history-item'
      onClick={() => {
        Taro.navigateTo({ url: `/pages/post/post?slug=${data.slug}` });
      }}
    >
      <Image src={data.cover} lazyLoad className='cover' />
      <View className='content'>
        <Text className='title'>{data.title}</Text>
        <View className='excerpt'>
          <Text>{data.excerpt}</Text>
        </View>
        <View className='info'>
          <Text>{formateDate(data.date)}</Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryItem;
