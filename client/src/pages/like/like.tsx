import { useEffect, useState } from 'react';
import { useReachBottom } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import LiteLoading from '@/components/lite-loading';
import PostList from '@/components/post-list';
import Icon from '@/components/icon';
import { getUserInfo } from '@/utils/index';
import AV from 'leancloud-storage/dist/av-weapp.js';
import { leancloud } from '../../../config.json';
import { formateDate } from '@/utils/index';
import styles from './like.module.scss';

const { appId, appKey, serverURLs } = leancloud;
AV.init({ appId, appKey, serverURLs });
const pageSize = 20;

interface ILikeItem {
  cover: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

const Like = () => {
  const [list, setList] = useState<ILikeItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  useReachBottom(() => {
    if (!hasMore) return;
    setCurrentPage(currentPage + 1);
  });

  const fetchData = async () => {
    const { nickName } = await getUserInfo();
    AV.Query.doCloudQuery(
      `select count(*), * from Like where nickName = '${nickName}' limit ${
        currentPage * pageSize
      },${pageSize} order by createdAt desc`
    )
      .then(({ results, count }) => {
        setList(
          list.concat(
            results.map((item) => {
              const temp = item.attributes;
              temp.createdAt = item.createdAt;
              return temp;
            })
          )
        );
        setCount(count);
        if (count <= (currentPage + 1) * pageSize) {
          setHasMore(false);
        }
      })
      .catch();
  };

  const renderInfoList = (item: ILikeItem) => {
    return (
      <>
        <View className={styles.infoItem}>
          <Icon name='icontime-circle' style={{ marginRight: 2 }} />
          <Text>{formateDate(item.createdAt)}</Text>
        </View>
      </>
    );
  };

  return (
    <View className={styles.like}>
      {list.length > 0
        ? list.map((item) => (
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
      {hasMore ? (
        <LiteLoading text='正在加载...' icon='jingyu' />
      ) : (
        <LiteLoading text='本来无一物，何处惹尘埃 ~' />
      )}
    </View>
  );
};

export default Like;
