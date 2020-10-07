import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

interface IGalleries {
  name: string,
  cover?: string,
  description?: string,
  count: number
}

export default function GalleryItem(props: { item: IGalleries }) {
  const { item } = props

  return (
    <View
      className='gallery-item'
      onClick={() => {
        Taro.navigateTo({
          url: `/pages/galleries/gallery/gallery?name=${item.name}`
        })
      }}
    >
      <Image src={item.cover} lazyLoad className='cover' />
      <View className='content'>
        <Text className='name'>{item.name}</Text>
        <Text className='count'>{`${item.count}张`}</Text>
      </View>
    </View>
  )
}