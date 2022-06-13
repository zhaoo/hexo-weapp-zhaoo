/*
 * @Descripttion: 分页加载 Hooks
 */

import { useState, useEffect } from 'react';
import {
  useReachBottom,
  usePullDownRefresh,
  vibrateShort,
  stopPullDownRefresh,
} from '@tarojs/taro';
import { getPosts } from '@/apis/api';
import { IPostItem } from '@/types/post';

interface IUsePagination {
  (): [IPostItem[], boolean, boolean];
}

const usePagination: IUsePagination = () => {
  const [currentData, setCurrentData] = useState<IPostItem[]>([]);
  const [pageSize, setPageSize] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!hasMore) return;
    setIsLoading(true);
    fetchData();
  }, [pageSize]);

  // 触底无限加载
  useReachBottom(() => {
    getMoreData();
    vibrateShort();
  });

  // 下拉刷新
  usePullDownRefresh(() => {
    refresh();
    vibrateShort();
  });

  const fetchData = async () => {
    const { data, pageCount } = (await getPosts(pageSize)) || {};
    if (!data || !pageCount || data.length < pageCount) {
      setHasMore(false);
    } else {
      currentData
        ? setCurrentData(currentData.concat(data))
        : setCurrentData(data);
    }
    setIsLoading(false);
    stopPullDownRefresh();
  };

  const getMoreData = () => setPageSize(pageSize + 1);

  const refresh = () => {
    setCurrentData([]);
    setHasMore(true);
    setPageSize(1);
    fetchData();
  };

  return [currentData, hasMore, isLoading];
};

export default usePagination;
