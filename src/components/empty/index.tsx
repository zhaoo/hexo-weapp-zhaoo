import React from 'react'
import { View, Text } from '@tarojs/components'
import Iconfont from '@/components/iconfont'
import './index.scss'

export default function Empty() {
  return (<View className='empty'>
    <Iconfont name='iconfile-text' />
    <Text className='tips'>暂无文章</Text>
  </View>)
}