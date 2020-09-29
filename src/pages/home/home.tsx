import React from 'react'
import { View } from '@tarojs/components'
import usePagination from '@/hooks/usePagination'
import PostItem from '@/components/post-item'
import './home.scss'

export default function Index() {
  const [posts, hasMore] = usePagination()

  return (<View className='home'>
    {posts && posts.map((item: any) => {
      return (<PostItem item={item} key={item.slug} />)
    })}
    { !hasMore && (<View className='none'>--- 我也是有底线的 ---</View>)}
  </View>)
}