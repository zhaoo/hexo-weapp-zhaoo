/*
 * @Descripttion: 相册分类页
 */

import { useState, useEffect } from 'react';
import { useShareTimeline, useShareAppMessage } from '@tarojs/taro';
import { View } from '@tarojs/components';
import GalleryItem from '@/components/gallery-item';
import { getGalleries } from '@/apis/api';
import { IGalleryItem } from '@/types/gallery';
import './galleries.scss';

const Galleries = () => {
  const [galleries, setGalleries] = useState<IGalleryItem[]>([]);

  useEffect(() => {
    fetchGalleriesData();
  }, []);

  const fetchGalleriesData = async () => {
    const res = await getGalleries();
    setGalleries(res);
  };

  useShareTimeline(() => {
    return {
      title: '相册',
      imageUrl: galleries[0].cover,
    };
  });

  useShareAppMessage(() => {
    return {
      title: '相册',
      imageUrl: galleries[0].cover,
    };
  });

  return (
    <View className='galleries'>
      {galleries.length > 0
        ? galleries.map((item, index: number) => (
            <GalleryItem data={item} key={index} />
          ))
        : null}
    </View>
  );
};

export default Galleries;
