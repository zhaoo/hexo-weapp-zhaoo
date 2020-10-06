import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

export default function Divider(props: { text?: string }) {
  const { text } = props
  return (<View className='divider'>{text}</View>)
}