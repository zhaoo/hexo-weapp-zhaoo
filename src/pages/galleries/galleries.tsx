import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { getGalleries } from '@/utils/api'
import GalleryItem from '@/components/gallery_item'
import Empty from '@/components/empty'
import './galleries.scss'

interface IGalleries {
  name: string,
  cover?: string,
  description?: string,
  count: number
}

export default function Galleries() {
  const [galleries, setGalleries] = useState<IGalleries[]>(null)

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    const data = await getGalleries()
    setGalleries(data)
  }

  return (<View className='galleries'>
    <View className='grid'>
      {galleries ?
        galleries.map((item: IGalleries) => {
          return (<GalleryItem item={item} key={item.name} />)
        }) :
        (
          <Empty text='暂无相册' />
        )
      }
    </View>
  </View>)
}