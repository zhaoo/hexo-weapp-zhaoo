import React, { useEffect, useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { getGalleryByName } from '@/utils/api'
import './gallery.scss'

interface IGallery {
  name: string,
  description?: string,
  cover?: string,
  photos: string[]
}

export default function Gallery() {
  const { name } = getCurrentInstance().router.params
  const [gallery, setGallery] = useState<IGallery>(null)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    Taro.setNavigationBarTitle({ title: name })
    const data = await getGalleryByName(name)
    setGallery(data)
  }

  const handlePreviewImage = (current: string) => {
    Taro.previewImage({
      current,
      urls: gallery.photos
    })
  }

  return (<View className='gallery'>
    {gallery && (<View>
      <View className='title'>
        <Text className='name'>{gallery.name}</Text>
        <Text className='description'>{gallery.description}</Text>
      </View>
      <View className='grid'>
        {gallery.photos.map((item: string) => {
          return (<Image src={item} key={item} lazyLoad className='photo' onClick={() => { handlePreviewImage(item) }} />)
        })}
      </View>
    </View>)}
  </View>)
}