import { useState, useEffect } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import Iconfont from '@/components/iconfont';
import { formateDate } from '@/utils/index';
import { getPostBySlug } from '@/apis/api';
import './post.scss';

interface IPost {
  title?: string;
  more?: string;
  cover?: string;
  date: string;
}

const replaceHTML = (data) => {
  data = data.replace(/\<img/gi, "<img mode='widthFix' id='image' lazy-load");
  return data;
};

const Post = () => {
  const [post, setPost] = useState<IPost>({ date: new Date().toDateString() });

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { slug } = getCurrentInstance().router.params;
    const data = await getPostBySlug(slug);
    const { more, title } = data;
    data.more = replaceHTML(more);
    setPost(data);
    Taro.setNavigationBarTitle({ title });
  };

  return (
    <View className='post'>
      <View className='head'>
        <Image src={post.cover} lazyLoad className='cover' mode='aspectFill' />
        <View className='mask'>
          <Text className='title'>{post.title}</Text>
          <View className='info'>
            <Text>
              <Iconfont name='iconcalendar' />
              {formateDate(post.date)}
            </Text>
          </View>
        </View>
      </View>
      {post.more && (
        <View
          dangerouslySetInnerHTML={{ __html: post.more }}
          className='content'
        ></View>
      )}
    </View>
  );
};

export default Post;
