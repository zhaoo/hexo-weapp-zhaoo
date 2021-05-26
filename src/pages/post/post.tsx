import { useState, useEffect, useRef } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import Icon from '@/components/icon';
import { formateDate } from '@/utils/index';
import { getPostBySlug } from '@/apis/api';
import { getStorageSync, setStorageSync } from '@/utils/storage';
import './post.scss';

interface IPost {
  title?: string;
  more?: string;
  cover?: string;
  date: string;
  excerpt: string;
}

const replaceHTML = (data) => {
  data = data.replace(/\<img/gi, "<img mode='widthFix' id='image' lazy-load");
  return data;
};

const Post = () => {
  const [post, setPost] = useState<IPost>({ date: new Date().toDateString() });
  const valineRef = useRef(null);

  useEffect(() => {
    fetchPost();
    initValine();
  }, []);

  const initValine = async () => {
    if (!valineRef.current || typeof window === 'undefined') return;
    const Valine = await (await import('valine')).default;
    new Valine({
      el: valineRef.current,
      appId: '5nmYX1URDFyDdOVu6WxizEsF-gzGzoHsz',
      appKey: 'xllg4mYlf0eT3efi7N0VOTeH',
    });
  };

  const fetchPost = async () => {
    const { slug } = getCurrentInstance().router.params;
    const data = await getPostBySlug(slug);
    const { more, title } = data;
    Taro.setNavigationBarTitle({ title });
    data.more = replaceHTML(more);
    setPost(data);
    setHistoryStorage(data);
  };

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

  return (
    <View className='post'>
      <View className='head'>
        <Image src={post.cover} lazyLoad className='cover' mode='aspectFill' />
        <View className='mask'>
          <Text className='title'>{post.title}</Text>
          <View className='info'>
            <Icon name='iconcalendar' style={{ marginRight: 5 }} />
            <Text>{formateDate(post.date)}</Text>
          </View>
        </View>
      </View>
      {post.more && (
        <View
          dangerouslySetInnerHTML={{ __html: post.more }}
          className='content'
        ></View>
      )}
      <View ref={valineRef}></View>
    </View>
  );
};

export default Post;
