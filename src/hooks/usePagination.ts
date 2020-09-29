import { useState, useEffect } from 'react'
import { useReachBottom, usePullDownRefresh } from '@tarojs/taro'
import { getPosts } from '@/utils/api'

export default function usePagination() {
  const [currData, setData] = useState(null)
  const [pageSize, setPageSize] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (hasMore) {
      (async () => {
        const { data, pageCount } = await getPosts(pageSize)
        currData ? setData(currData.concat(data)) : setData(data)
        if (data.length < pageCount) setHasMore(false)
      })()
    }
  }, [pageSize])

  useReachBottom(() => (getMoreData()))

  usePullDownRefresh(() => (refresh()))

  const getMoreData = () => (setPageSize(pageSize + 1))

  const refresh = () => {
    if (pageSize === 1) return;
    setData(null)
    setHasMore(true)
    setPageSize(1)
  }

  return [currData, hasMore, refresh]
}