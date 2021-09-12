import { useState, useEffect } from 'react';
import Taro, {
  getCurrentInstance,
  useShareTimeline,
  useShareAppMessage,
} from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { formateDate } from '@/utils/index';
import { getPostBySlug } from '@/apis/api';
import { getStorageSync, setStorageSync } from '@/utils/storage';
import Icon from '@/components/icon';
import Loading from '@/components/loading';
import Leancloud from '@/components/leancloud';
import Comment from '@/components/comment';
import ImmersiveTitlebar from '@/components/immersive-titlebar';
import Fab from '@/components/fab';
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
  const [post, setPost] = useState<IPostProps>({});
  const [status, setStatus] = useState<string>('loading');
  const [images, setImages] = useState<string[]>([]);
  const [slug] = useState<string>(
    getCurrentInstance().router?.params.slug || ''
  );

  useEffect(() => {
    fetchPost();
  }, []);

  useShareTimeline(() => {
    return {
      title: post.title,
      imageUrl: post.cover,
    };
  });

  useShareAppMessage(() => {
    return {
      title: post.title,
      imageUrl: post.cover,
    };
  });

  const fetchPost = async () => {
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
    data = data.replace(
      /<a([^>]*)href="([^"]*)"([^>]*)>/gim,
      (match, attrBegin, href: string, attrEnd) => {
        return `<a ${attrBegin} id='link_${href}' ${attrEnd}>`; // 重定义链接标签
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
    setStorageSync(key, arr);
  };

  const handleClick = (e) => {
    // 图片模态框
    const imageMatch = e.target.id.match(/(?<=image_).*/gi);
    const linkMatch = e.target.id.match(/(?<=link_).*/gi);
    if (imageMatch) {
      Taro.previewImage({
        current: imageMatch[0],
        urls: images,
      });
    } else if (linkMatch) {
      Taro.setClipboardData({
        data: linkMatch[0],
      });
    }
  };

  return (
    <>
      {status === 'loading' ? <Loading /> : null}
      {status === 'ready' ? (
        <View className='post'>
          <ImmersiveTitlebar title={post.title || ''} />
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
                  <Icon name='iconmessage' style={{ marginRight: 5 }} />
                  {post.realPath ? (
                    <Leancloud
                      path={post.realPath}
                      model='Comment'
                      exp={false}
                      field='url'
                    />
                  ) : null}
                </View>
                <View className='info-item'>
                  <Icon name='iconheart' style={{ marginRight: 5 }} />
                  {post.realPath ? (
                    <Leancloud
                      path={post.realPath}
                      model='Like'
                      field='path'
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
              onClick={(e) => handleClick(e)}
              className='content'
            />
          ) : null}
          {post.realPath ? <Comment url={post.realPath} /> : null}
          <Fab path={post.realPath} />
        </View>
      ) : null}
    </>
  );
};

export default Post;
