import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import emptyPng from '@/assets/images/empty.png'
import './index.scss'

export default function Empty(props: { text?: string }) {
  const { text } = props
  return (<View className='empty'>
    <Image src={emptyPng} />
    <Text className='tips'>{text}</Text>
  </View>)
}