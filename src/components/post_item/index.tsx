import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { date } from '@/utils/date'
import Iconfont from '@/components/iconfont'
import './index.scss'

export default function PostItem(props: { item }) {
  const { item } = props
  return (<View className='post-item' onClick={() => { Taro.navigateTo({ url: `/pages/post/post?slug=${item.slug}` }) }}>
    <Image src={item.cover} lazyLoad className='cover' />
    <View className='content'>
      {item.top && (<View className='top'><Iconfont name='iconpushpin' /></View>)}
      <Text className='title'>{item.title}</Text>
      <View className='excerpt'>
        <Text>{item.excerpt}</Text>
      </View>
      <View className='info'>
        <Text>
          <Iconfont name='iconcalendar' />
          {date(item.date)}
        </Text>
      </View>
    </View>
  </View>)
}