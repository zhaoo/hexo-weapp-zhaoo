import { useState, useEffect } from 'react'
import Taro, { useReachBottom, usePullDownRefresh } from '@tarojs/taro'
import { getPosts } from '@/utils/api'

export default function usePagination() {
  const [currData, setData] = useState(null)
  const [pageSize, setPageSize] = useState([1])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (hasMore) {
      setIsLoading(true);
      getData()
    }
  }, [pageSize])

  useReachBottom(() => (getMoreData()))

  usePullDownRefresh(() => (refresh()))

  const getData = async () => {
    const { data, pageCount } = await getPosts(pageSize[0])
    currData ? setData(currData.concat(data)) : setData(data)
    if (data.length < pageCount) setHasMore(false)
    setIsLoading(false)
    Taro.stopPullDownRefresh()
  }

  const getMoreData = () => (setPageSize([pageSize[0] + 1]))

  const refresh = () => {
    setData(null)
    setHasMore(true)
    setPageSize([1])
  }

  return [currData, hasMore, isLoading]
}