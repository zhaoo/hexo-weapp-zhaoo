import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

export default function CategoryItem(props: { item }) {
  const { item } = props

  return (<View className='category-item' onClick={() => { Taro.navigateTo({ url: `/pages/categories/category_list/category_list?path=${item.path}&name=${item.name}` }) }}>
    <Image src='https://pic.izhaoo.com/20200228081642.jpg' lazyLoad className='cover' />
    <View className='content'>
      <Text className='name'>{item.name}</Text>
      <Text className='count'>{`[${item.count}]`}</Text>
    </View>
  </View>)
}