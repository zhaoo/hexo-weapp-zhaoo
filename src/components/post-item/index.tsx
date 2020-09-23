import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { date } from '@/utils/date'
import './index.scss'

export default function PostItem(props: { item }) {
  const { item } = props
  return (<View className='post-item' onClick={() => { Taro.navigateTo({ url: `/pages/post/post?slug=${item.slug}` }) }}>
    <Image src={item.cover} lazyLoad mode='widthFix' className='cover' />
    <View className='content'>
      <Text className='title'>{item.title}</Text>
      <View className='info'>
        <Text>{date(item.date)}</Text>
      </View>
    </View>
  </View>)
}