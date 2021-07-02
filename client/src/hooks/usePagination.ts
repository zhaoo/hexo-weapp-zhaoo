import { useState, useEffect } from 'react';
import Taro, { useReachBottom, usePullDownRefresh } from '@tarojs/taro';
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
    if (hasMore) {
      setIsLoading(true);
      fetchData();
    }
  }, [pageSize]);

  // 触底无限加载
  useReachBottom(() => getMoreData());

  // 下拉刷新
  usePullDownRefresh(() => refresh());

  const fetchData = async () => {
    const { data, pageCount } = await getPosts(pageSize);
    currentData
      ? setCurrentData(currentData.concat(data))
      : setCurrentData(data);
    if (!data || !pageCount || data.length < pageCount) {
      setHasMore(false);
    }
    setIsLoading(false);
    Taro.stopPullDownRefresh();
  };

  const getMoreData = () => setPageSize(pageSize + 1);

  const refresh = () => {
    setCurrentData([]);
    setHasMore(true);
    setPageSize(1);
  };

  return [currentData, hasMore, isLoading];
};

export default usePagination;
