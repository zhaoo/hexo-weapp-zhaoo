import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { getCategories } from '@/utils/api'
import CategoryItem from '@/components/category_item'
import randomImage from '@/utils/randomImage'
import './categories.scss'

interface ICategory {
  name: string,
  path: string,
  count: number,
  image?: string
}

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const data = await getCategories()
    const images = await randomImage(data.length)
    for (let i in data) {
      data[i].image = images[i]
    }
    setCategories(data)
  }

  return (<View className='categories'>
    <View className='grid'>
      {categories && categories.map((item: any) => {
        return (<CategoryItem item={item} key={item.name} />)
      })}
    </View>
  </View>)
}