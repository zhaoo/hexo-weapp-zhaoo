import React, { useState, useEffect } from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Iconfont from '@/components/iconfont'
import { date } from '@/utils/date'
import { getPostBySlug } from '@/utils/api'
import './post.scss'

interface IPost {
  title?: string,
  more?: string,
  cover?: string,
  date: string
}

const replaceHtml = (data) => {
  data = data.replace(/\<img/gi, '<img mode="widthFix" lazy-load')
  return data
}

export default function Post() {
  const [post, setPost] = useState<IPost>({ date: new Date().toDateString() })

  useEffect(() => {
    (async () => {
      const { slug } = getCurrentInstance().router.params
      const { data } = await getPostBySlug(slug)
      data.more = replaceHtml(data.more)
      setPost(data)
    })()
  }, [])

  return (<View className='post'>
    <View className='head'>
      <Image src={post.cover} lazyLoad className='cover' mode='aspectFill' />
      <View className='mask'>
        <Text className='title'>{post.title}</Text>
        <View className='info'>
          <Text>
            <Iconfont name='iconcalendar' />
            {date(post.date)}
          </Text>
        </View>
      </View>
    </View>
    {post.more && <View dangerouslySetInnerHTML={{ __html: post.more }} className='content'></View>}
  </View>)
}