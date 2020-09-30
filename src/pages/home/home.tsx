import React from 'react'
import { View, Block } from '@tarojs/components'
import usePagination from '@/hooks/usePagination'
import PostItem from '@/components/post-item'
import Empty from '@/components/empty'
import './home.scss'

export default function Index() {
  const [posts, hasMore] = usePagination()

  return (
    <Block>
      {posts ? (
        <View className='home'>
          {posts.map((item: any) => {
            return (<PostItem item={item} key={item.slug} />)
          })}
          {!hasMore && (<View className='none'>--- 我也是有底线的 ---</View>)}
        </View>
      ) : (
          <Empty />
        )}
    </Block>
  )
}