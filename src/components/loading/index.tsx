import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

export default function Loading(props: { isLoading }) {
  const { isLoading } = props

  return (isLoading && <View className='loading'>
    <View className='double-bounce1'></View>
    <View className='double-bounce2'></View>
  </View>)
}