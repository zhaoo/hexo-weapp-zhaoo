import React from 'react'
import { View, Block } from '@tarojs/components'
import usePagination from '@/hooks/usePagination'
import PostItem from '@/components/post_item'
import Empty from '@/components/empty'
import Loading from '@/components/loading'
import Divider from '@/components/divider'
import './home.scss'

export default function Index() {
  const [posts, hasMore, isLoading ] = usePagination()

  return (
    <Block>
      {posts ? (
        <View className='home'>
          {posts.map((item: any) => {
           
            return (<PostItem item={item} key={item && item.slug}  />)
          })}
          <Loading isLoading={isLoading} />
          {!hasMore && (<Divider text='我也是有底线的' />)}
        </View>
      ) : (
          <Empty text='暂无文章' />
        )
      }
    </Block >
  )
}