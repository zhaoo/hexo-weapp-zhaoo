/*
 * @Descripttion: 评论列表组件
 */

import { useState, FC } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import md5 from 'crypto-js/md5';
import { formateDate } from '@/utils/index';
import defaultAvatar from '@/assets/images/avatar.png';
import styles from './index.module.scss';

interface ICommentListProps {
  list: any[];
  limit?: number;
  needJump?: boolean;
}

const gravatarUrl = 'https://sdn.geekzu.org/avatar/';

const replaceHTML = (data) => {
  data = data.replace(/\<img/gi, "<img mode='aspectFit' lazy-load");
  return data;
};

const CommentList: FC<ICommentListProps> = ({
  list,
  limit,
  needJump = false,
}) => {
  const [imageErrorList, setImageErrorList] = useState<number[]>([]);

  if (limit) {
    list = list.slice(0, limit);
  }

  const handleImageError = (key) => {
    setImageErrorList([...imageErrorList, key]);
  };

  const handleClick = (url) => {
    if (!needJump) return;
    url = url.split(/[/]\d{4}[/]\d{2}[/]\d{2}[/]/)[1];
    url = url.substr(0, url.length - 1);
    Taro.navigateTo({
      url: `/pages/post/post?slug=${url}`,
      success: () =>
        setTimeout(
          () => Taro.eventCenter.trigger('changeCommentVisible'),
          1000
        ),
    });
  };

  return (
    <View className={styles.commentList}>
      {list.length > 0 &&
        list.map((item, index) => {
          const { mail, nick, comment, weappAvatar } = item;
          const updatedAt = item.updatedAt;
          const avatar = imageErrorList.includes(index)
            ? defaultAvatar
            : weappAvatar
            ? weappAvatar
            : gravatarUrl + md5(mail);
          return (
            <View
              className={styles.commentItem}
              key={index}
              onClick={() => handleClick(item.url)}
            >
              <View className={styles.authorWrapper}>
                <Image
                  src={avatar}
                  className={styles.avatar}
                  mode='aspectFill'
                  lazyLoad
                  onError={() => handleImageError(index)}
                />
                <Text className={styles.nick}>{nick}</Text>
                <Text className={styles.time}>{formateDate(updatedAt)}</Text>
              </View>
              <View
                className={styles.commentContent}
                dangerouslySetInnerHTML={{ __html: replaceHTML(comment) }}
              />
            </View>
          );
        })}
    </View>
  );
};

export default CommentList;
