import { FC } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { IPostItem } from '@/types/post';
import { formateDate } from '@/utils/index';
import styles from './index.module.scss';

interface IHistoryItemProps {
  data: IPostItem;
}

const HistoryItem: FC<IHistoryItemProps> = ({ data }) => {
  return (
    <View
      className={styles.historyItem}
      onClick={() => {
        Taro.navigateTo({ url: `/pages/post/post?slug=${data.slug}` });
      }}
    >
      {data.cover ? (
        <Image
          className={styles.cover}
          src={data.cover}
          lazyLoad
          mode='aspectFill'
        />
      ) : null}
      <View className={styles.content}>
        <Text className={styles.title}>{data.title || ''}</Text>
        <View className={styles.excerpt}>
          <Text>{data.excerpt || ''}</Text>
        </View>
        <View className={styles.info}>
          <Text>{formateDate(data.date) || ''}</Text>
        </View>
      </View>
    </View>
  );
};

export default HistoryItem;
