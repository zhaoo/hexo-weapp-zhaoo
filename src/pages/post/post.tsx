import React, { useState, useEffect } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { date } from '@/utils/date'
import { getPostBySlug } from '@/utils/api'
import './post.scss'

interface IPost {
  title?: string,
  more?: string,
  cover?: string,
  date: string
}

export default function Post() {
  const [post, setPost] = useState<IPost>({ date: new Date().toDateString() })

  useEffect(() => {
    (async () => {
      const { slug } = getCurrentInstance().router.params
      const { data } = await getPostBySlug(slug)
      setPost(data)
    })()
  }, [])

  return (<View className='post'>
    <View className='head'>
      <Image src={post.cover} lazyLoad mode='widthFix' className='cover' />
      <View className='mask'>
        <Text className='title'>{post.title}</Text>
        <View className='info'>
          <Text>{date(post.date)}</Text>
        </View>
      </View>
    </View>
    {post.more && <View dangerouslySetInnerHTML={{ __html: post.more }} className='content'></View>}
  </View>)
}