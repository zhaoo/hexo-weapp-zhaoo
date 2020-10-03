import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { getCategories } from '@/utils/api'
import CategoryItem from '@/components/category_item'
import './categories.scss'

interface ICategory {
  name: string,
  path: string,
  count: number
}

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data)
  }

  return (<View className='categories'>
    {categories && categories.map((item: any) => {
      return (<CategoryItem item={item} key={item.name} />)
    })}
  </View>)
}