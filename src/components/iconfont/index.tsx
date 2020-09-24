import React from 'react'
import { Text } from '@tarojs/components'
import './index.scss'

export default function Iconfont(props: { name }) {
  const { name } = props
  return (<Text className={`iconfont ${name}`}></Text>)
}