import React, { useState, useEffect } from 'react'
import { ScrollView } from '@tarojs/components'
import { getPosts } from '@/utils/api'
import PostItem from '@/components/post-item'
import './home.scss'

export default function Index() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await getPosts()
      setPosts(data.data)
    })()
  }, [])

  return (<ScrollView scrollY className='index'>
    {posts && posts.map((item: any) => {
      return (<PostItem item={item} key={item.slug} />)
    })}
  </ScrollView>)
}