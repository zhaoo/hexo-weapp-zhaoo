import React, { useState, useEffect } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { date } from '@/utils/date'
import './index.scss'

export default function PostItem(props: { item }) {
  const { item } = props
  return (<View className='post-item'>
    <Image src={item.cover} lazyLoad mode='scaleToFill' className='cover' />
    <View className='content'>
      <Text>{item.title}</Text>
      <View className='info'>
        <Text>{date(item.date)}</Text>
      </View>
    </View>
  </View>)
}