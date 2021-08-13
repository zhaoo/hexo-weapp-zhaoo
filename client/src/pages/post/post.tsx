import { useState, useEffect, useRef } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { formateDate } from '@/utils/index';
import { getPostBySlug } from '@/apis/api';
import { getStorageSync, setStorageSync } from '@/utils/storage';
import Icon from '@/components/icon';
import Loading from '@/components/loading';
import Leancloud from '@/components/leancloud';
import Comment from '@/components/comment';
import './post.scss';

interface IPostProps {
  title?: string;
  more?: string;
  cover?: string;
  date: string;
  excerpt: string;
  realPath: string;
}

const Post = () => {
  const [post, setPost] = useState<IPostProps>({
    date: new Date().toDateString(),
  });
  const [status, setStatus] = useState<string>('loading');
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    fetchPost();
  }, []);

  // usePageScroll((res) => {
  //   const { scrollTop } = res;
  //   if (scrollRef.current - scrollTop > 0) {
  //     setBottomBarVisible(true);
  //   } else {
  //     setBottomBarVisible(false);
  //   }
  //   scrollRef.current = scrollTop;
  // });

  const fetchPost = async () => {
    const { slug } = getCurrentInstance().router.params;
    const data = await getPostBySlug(slug);
    if (data) {
      const { more, title } = data;
      Taro.setNavigationBarTitle({ title });
      data.more = replaceHTML(more);
      setPost(data);
      setStatus('ready');
      setHistoryStorage(data);
    }
  };

  const replaceHTML = (data) => {
    data = data.replace(
      /<img([^>]*)src="([^"]*)"([^>]*)>/gim,
      (match, attrBegin, src: string, attrEnd) => {
        // 缓存所有图片
        const imagesTemp = images;
        imagesTemp.push(src);
        setImages(imagesTemp);
        return `<img ${attrBegin} src='${src}' mode='widthFix' id='image_${src}' lazy-load ${attrEnd}>`; // 重定义图片标签
      }
    );
    return data;
  };

  // 存储历史文章
  const setHistoryStorage = (data) => {
    const key = 'history';
    const arr = getStorageSync(key) || [];
    arr.forEach((item, index) => {
      if (data.slug === item.slug) {
        arr.splice(index, 1);
      }
    });
    arr.push(data);
    setStorageSync(arr, key);
  };

  const handleClick = (e) => {
    // 图片模态框
    const imageMatch = e.target.id.match(/(?<=image_).*/gi);
    if (imageMatch) {
      Taro.previewImage({
        current: imageMatch[0],
        urls: images,
      });
    }
  };

  return (
    <>
      {status === 'loading' ? <Loading /> : null}
      {status === 'ready' ? (
        <View className='post'>
          <View className='head'>
            {post.cover ? (
              <Image
                src={post.cover}
                lazyLoad
                className='cover'
                mode='aspectFill'
              />
            ) : null}
            <View className='mask'>
              <Text className='title'>{post.title}</Text>
              <View className='info'>
                <View className='info-item'>
                  <Icon name='iconcalendar' style={{ marginRight: 5 }} />
                  <Text>{formateDate(post.date)}</Text>
                </View>
                <View className='info-item'>
                  <Icon name='iconeye' style={{ marginRight: 5 }} />
                  {post.realPath ? (
                    <Leancloud path={post.realPath} model='Counter' />
                  ) : null}
                </View>
                <View className='info-item'>
                  <Icon name='iconheart' style={{ marginRight: 5 }} />
                  {post.realPath ? (
                    <Leancloud path={post.realPath} model='Vote' exp={false} />
                  ) : null}
                </View>
              </View>
            </View>
          </View>
          {post.more ? (
            <View
              dangerouslySetInnerHTML={{ __html: post.more }}
              onClick={(e) => handleClick(e)}
              className='content'
            />
          ) : null}
          {post.realPath ? <Comment url={post.realPath} /> : null}
        </View>
      ) : null}
    </>
  );
};

export default Post;
