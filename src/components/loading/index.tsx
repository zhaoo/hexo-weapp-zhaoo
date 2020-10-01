import React from 'react'
import { View, Text } from '@tarojs/components'
import Iconfont from '@/components/iconfont'
import './index.scss'

export default function Loading() {
  return (<View className='loading'>
    <View className='circle'>
      <Iconfont name='iconload' />
    </View>
    <Text className='tips'>loading...</Text>
  </View>)
}