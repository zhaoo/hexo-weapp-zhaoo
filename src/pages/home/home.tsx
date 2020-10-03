import React from 'react'
import { View, Block } from '@tarojs/components'
import usePagination from '@/hooks/use_pagination'
import PostItem from '@/components/post_item'
import Empty from '@/components/empty'
import Loading from '@/components/loading'
import './home.scss'

export default function Index() {
  const [posts, hasMore, isLoading] = usePagination()

  return (
    <Block>
      {posts ? (
        <View className='home'>
          {posts.map((item: any) => {
            return (<PostItem item={item} key={item.slug} />)
          })}
          <View className='loading-wrap'>
            <Loading isLoading={isLoading} />
          </View>
          {!hasMore && (
            <View className='none'>--- 我也是有底线的 ---</View>
          )}
        </View>
      ) : (
          <Empty />
        )
      }
    </Block >
  )
}