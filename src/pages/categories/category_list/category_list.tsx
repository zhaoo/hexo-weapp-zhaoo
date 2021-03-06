import React, { useEffect, useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Block, Image, Text } from '@tarojs/components'
import PostItem from '@/components/post_item'
import Empty from '@/components/empty'
import Divider from '@/components/divider'
import { get } from '@/utils/request'
import './category_list.scss'

export default function CategoryList() {
  const { path, name, count, image } = getCurrentInstance().router.params
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetchPostsByCategorie()
  }, [])

  const fetchPostsByCategorie = async () => {
    Taro.setNavigationBarTitle({ title: name })
    const data = await get(path.slice(3))
    setPosts(data.postlist)
  }

  return (
    <Block>
      {posts ? (
        <View className='category-list'>
          <View className='head'>
            <Image src={image} lazyLoad className='cover' mode='aspectFill' />
            <View className='mask'>
              <Text className='name'>{name}</Text>
              <Text className='count'>{`${count}篇文章`}</Text>
            </View>
          </View>
          <View className='content'>
            {posts.map((item: any) => {
              return (<PostItem item={item} key={item.slug} />)
            })}
            <Divider text='我也是有底线的' />
          </View>
        </View>
      ) : (
          <Empty text='暂无文章' />
        )
      }
    </Block >
  )
}