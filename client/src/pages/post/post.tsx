import { useState, useEffect, useRef } from 'react';
import Taro, { usePageScroll, getCurrentInstance } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import Icon from '@/components/icon';
import BottomBar from '@/components/bottom-bar';
import Leancloud from '@/components/leancloud';
import Skeleton from './skeleton';
import { formateDate } from '@/utils/index';
import { getPostBySlug } from '@/apis/api';
import { getStorageSync, setStorageSync } from '@/utils/storage';
import './post.scss';

interface IPostProps {
  title?: string;
  more?: string;
  cover?: string;
  date: string;
  excerpt: string;
  realPath: string;
}

const replaceHTML = (data) => {
  data = data.replace(/\<img/gi, "<img mode='widthFix' id='image' lazy-load");
  return data;
};

const Post = () => {
  const [post, setPost] = useState<IPostProps>({
    date: new Date().toDateString(),
  });
  const scrollRef = useRef(0);
  const [status, setStatus] = useState<string>('loading');
  const [bottomBarVisible, setBottomBarVisible] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  usePageScroll((res) => {
    const { scrollTop } = res;
    if (scrollRef.current - scrollTop > 0) {
      setBottomBarVisible(true);
    } else {
      setBottomBarVisible(false);
    }
    scrollRef.current = scrollTop;
  });

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
    <>
      {status === 'loading' ? <Skeleton /> : null}
      {status === 'ready' ? (
        <View className='post'>
          <View className='head'>
            <Image
              src={post.cover}
              lazyLoad
              className='cover'
              mode='aspectFill'
            />
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
                    <Leancloud path={post.realPath} counter='Counter' />
                  ) : null}
                </View>
                <View className='info-item'>
                  <Icon name='iconheart' style={{ marginRight: 5 }} />
                  {console.log(post.realPath)}
                  {post.realPath ? (
                    <Leancloud
                      path={post.realPath}
                      counter='Vote'
                      exp={false}
                    />
                  ) : null}
                </View>
              </View>
            </View>
          </View>
          {post.more ? (
            <View
              dangerouslySetInnerHTML={{ __html: post.more }}
              className='content'
            ></View>
          ) : null}
          {/* <BottomBar
            path={post.realPath}
            style={{
              transform: bottomBarVisible
                ? 'translateY(0)'
                : 'translateY(60px)',
            }}
          /> */}
        </View>
      ) : null}
    </>
  );
};

export default Post;
