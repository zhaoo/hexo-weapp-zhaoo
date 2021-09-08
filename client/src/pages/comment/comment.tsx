import { useEffect, useState } from 'react';
import Taro, { useReachBottom } from '@tarojs/taro';
import { View } from '@tarojs/components';
import CommentList from '@/components/comment-list';
import LiteLoading from '@/components/lite-loading';
import { leancloud } from '../../../config.json';
import styles from './comment.module.scss';

const { appId, appKey, serverURLs } = leancloud;
const pageSize = 20;

const Comment = () => {
  const [list, setList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useReachBottom(() => {
    if (!hasMore) return;
    setCurrentPage(currentPage + 1);
  });

  const fetchData = async () => {
    Taro.cloud
      .callFunction({
        name: 'comment',
        data: {
          appId,
          appKey,
          serverURLs,
          sql: `select count(*), * from Comment limit ${
            currentPage * pageSize
          },${pageSize} order by createdAt desc`,
        },
      })
      .then(({ result }: any) => {
        if (result && result.success) {
          setList(list.concat(result.data));
          if (result.count <= (currentPage + 1) * pageSize) {
            setHasMore(false);
          }
        }
      })
      .catch();
  };

  return (
    <View className={styles.comment}>
      <CommentList list={list} />
      {hasMore ? (
        <LiteLoading text='正在加载...' icon='jingyu' />
      ) : (
        <LiteLoading text='本来无一物，何处惹尘埃 ~' />
      )}
    </View>
  );
};

export default Comment;
