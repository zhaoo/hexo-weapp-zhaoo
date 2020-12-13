import React, { useState, useEffect } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Iconfont from '@/components/iconfont'
import { date } from '@/utils/date'
import { getPostBySlug } from '@/utils/api'
import './post.scss'
import { IMAGES_URL } from '@/config/index'

interface IPost {
  title?: string,
  more?: string,
  cover?: string,
  date: string
}

export default function Post() {
  const [post, setPost] = useState<IPost>({ date: new Date().toDateString() })

  useEffect(() => {
    fetchPost()
  }, [])

  const replaceHTML = (data) => {
    data = data.replace(/\<img/gi, "<img mode='widthFix' id='image' lazy-load")
    data = data.replace(/\&emsp;/gi, "　　")
    return data
  }
  
  const fetchPost = async () => {
    const { slug } = getCurrentInstance().router.params
    const data = await getPostBySlug(slug)
     
    const { more, title } = data
    data.more = replaceHTML(more)
    setPost(data)
    Taro.setNavigationBarTitle({ title })
  }

  return (<View className='post'>
    <View className='head'>
      
      <Image src={IMAGES_URL + ( post && post.cover) } lazyLoad className='cover' mode='aspectFill' />
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
    { console.log(post.more) }
    {post.more && <View dangerouslySetInnerHTML={{ __html: post.more }} className='content'></View>}
  </View>)
}