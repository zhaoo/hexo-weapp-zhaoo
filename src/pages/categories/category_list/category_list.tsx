import React, { useEffect, useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import PostItem from '@/components/post_item'
import Empty from '@/components/empty'
import { get } from '@/utils/request'
import './category_list.scss'

export default function CategoryList() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetchPostsByCategorie()
  }, [])

  const fetchPostsByCategorie = async () => {
    const { path, name } = getCurrentInstance().router.params
    Taro.setNavigationBarTitle({ title: name })
    const data = await get(path.slice(3))
    setPosts(data.postlist)
  }

  return (
    <Block>
      {posts ? (
        <View className='category-list'>
          {posts.map((item: any) => {
            return (<PostItem item={item} key={item.slug} />)
          })}
          <View className='none'>--- 我也是有底线的 ---</View>
        </View>
      ) : (
          <Empty />
        )
      }
    </Block >
  )
}