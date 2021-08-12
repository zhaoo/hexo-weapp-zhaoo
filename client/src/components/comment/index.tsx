import { FC, useEffect, useState } from 'react';
import { View, Image, Text, OpenData } from '@tarojs/components';
import AV from 'leancloud-storage/dist/av-weapp.js';
import md5 from 'crypto-js/md5';
import { formateDate } from '@/utils/index';
import { leancloud } from '../../../config.json';
import styles from './index.module.scss';

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
    <View className={styles.comment}>
      <Text className={styles.count}>{`共${list.length}条评论`}</Text>
      <View className={styles.inputWrapper}>
        <View className={styles.avatar}>
          <OpenData type='userAvatarUrl' lang='zh_CN' />
        </View>
        <View className={styles.input}>雁过留痕...</View>
      </View>
      <View className={styles.commentWrapper}>
        {list.length > 0 &&
          list.map((item, index) => {
            const { mail, nick, comment } = item?.attributes;
            const updatedAt = item.updatedAt;
            return (
              <View className={styles.commentItem} key={index}>
                <View className={styles.authorWrapper}>
                  <Image
                    src={gravatarUrl + md5(mail)}
                    className={styles.avatar}
                    mode='aspectFill'
                    lazyLoad
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
    </View>
  );
};

export default Comment;
