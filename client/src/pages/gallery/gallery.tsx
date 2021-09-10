import { useEffect, useState } from 'react';
import Taro, {
  getCurrentInstance,
  useShareTimeline,
  useShareAppMessage,
} from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { getGalleryByName } from '@/apis/api';
import { IGalleryItem } from '@/types/gallery';
import './gallery.scss';

const Gallery = () => {
  const { name } = getCurrentInstance()?.router?.params;
  const [gallery, setGallery] = useState<IGalleryItem>(null);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  useShareTimeline(() => {
    return {
      title: gallery.name,
      imageUrl: gallery.photos[0],
    };
  });

  useShareAppMessage(() => {
    return {
      title: gallery.name,
      imageUrl: gallery.photos[0],
    };
  });

  const fetchGalleryData = async () => {
    Taro.setNavigationBarTitle({ title: name });
    const data = await getGalleryByName(name);
    setGallery(data);
  };

  const handlePreviewImage = (current: string) => {
    Taro.previewImage({
      current,
      urls: gallery.photos,
    });
  };

  return (
    <View className='gallery'>
      {gallery ? (
        <View>
          <View className='title'>
            <Text className='name'>{gallery.name}</Text>
            <Text className='description'>{gallery.description}</Text>
          </View>
          <View className='grid'>
            {gallery.photos.map((item: string, index: number) => {
              return (
                <Image
                  src={item}
                  key={index}
                  lazyLoad
                  mode='aspectFill'
                  className='photo'
                  onClick={() => {
                    handlePreviewImage(item);
                  }}
                />
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Gallery;
