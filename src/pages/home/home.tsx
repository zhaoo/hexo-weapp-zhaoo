import React, { useState, useEffect } from 'react'
import { useReachBottom } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getPosts } from '@/utils/api'
import PostItem from '@/components/post-item'
import './home.scss'

export default function Index() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(2)

  useEffect(() => {
    (async () => {
      const { data } = await getPosts()
      setPosts(data.data)
    })()
  }, [])

  useReachBottom(() => {
    (async () => {
      const { data } = await getPosts(page)
      setPosts(posts.concat(data.data))
    })()
    setPage(page + 1)
  })

  return (<View className='home'>
    {posts && posts.map((item: any) => {
      return (<PostItem item={item} key={item.slug} />)
    })}
  </View>)
}