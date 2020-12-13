import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { date } from '@/utils/date'
import Iconfont from '@/components/iconfont'
import './index.scss'
import { IMAGES_URL } from '@/config/index'


export default function PostItem(props: { item }) {

  const { item } = props

  return (<View className='post-item' onClick={() => { Taro.navigateTo({ url: `/pages/post/post?slug=${item.slug}` }) }}>

    <Image src={ IMAGES_URL + (item.cover )} lazyLoad className='cover' />
    <View className='content'>
    console.log(item.top)
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