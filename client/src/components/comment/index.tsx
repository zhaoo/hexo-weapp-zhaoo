import { FC, useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import AV from 'leancloud-storage/dist/av-weapp.js';
import md5 from 'crypto-js/md5';
import { formateDate } from '@/utils/index';
import { leancloud } from '../../../config.json';
import './index.scss';

const { appId, appKey, serverURLs } = leancloud;
const gravatarUrl = 'https://cn.gravatar.com/avatar/';

interface ICommentProps {
  model?: string;
  url: string;
}

AV.init({
  appId,
  appKey,
  serverURLs,
});

const Comment: FC<ICommentProps> = ({ model = 'Comment', url }) => {
  const Model = AV.Object.extend(model);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const query = new AV.Query(Model);
    const res = await query.equalTo('url', url).find();
    console.log(res);
    setList(res);
  };

  const replaceHTML = (data) => {
    data = data.replace(/\<img/gi, "<img mode='aspectFit' lazy-load");
    return data;
  };

  return (
    <View className='comment'>
      <Text className='count'>{`共${list.length}条评论`}</Text>
      <View className='comment-wrapper'>
        {list.length > 0 &&
          list.map((item, index) => {
            const { mail, nick, comment } = item?.attributes;
            const updatedAt = item.updatedAt;
            return (
              <View className='comment-item' key={index}>
                <View className='author-wrapper'>
                  <Image
                    src={gravatarUrl + md5(mail)}
                    className='avatar'
                    mode='aspectFill'
                    lazyLoad
                  />
                  <Text className='nick'>{nick}</Text>
                  <Text className='time'>{formateDate(updatedAt)}</Text>
                </View>
                <View
                  className='comment-content'
                  dangerouslySetInnerHTML={{ __html: replaceHTML(comment) }}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default Comment;
