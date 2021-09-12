import { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import LiteLoading from '@/components/lite-loading';
import PostList from '@/components/post-list';
import Icon from '@/components/icon';
import { getStorageSync } from '@/utils/storage';
import { formateDate } from '@/utils/index';
import styles from './history.module.scss';

interface IHistoryItem {
  cover: string;
  title: string;
  slug: string;
  excerpt: string;
  updated: string;
}

const History = () => {
  const [histories, setHistories] = useState<IHistoryItem[]>([]);

  useEffect(() => {
    setHistories(getStorageSync('history'));
  }, []);

  const renderInfoList = (item: IHistoryItem) => {
    return (
      <>
        <View className={styles.infoItem}>
          <Icon name='icontime-circle' style={{ marginRight: 2 }} />
          <Text>{formateDate(item.updated)}</Text>
        </View>
      </>
    );
  };

  return (
    <View className={styles}>
      {histories.length > 0
        ? histories
            .reverse()
            .map((item) => (
              <PostList
                key={item.slug}
                cover={item.cover}
                title={item.title}
                slug={item.slug}
                excerpt={item.excerpt}
                infoList={renderInfoList(item)}
              />
            ))
        : null}
      <LiteLoading text='本来无一物，何处惹尘埃 ~' />
    </View>
  );
};

export default History;
