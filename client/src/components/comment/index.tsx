import { FC, useEffect, useState } from 'react';
import { View, Text, OpenData, ScrollView } from '@tarojs/components';
import CommentList from '@/components/comment-list';
import LiteLoading from '@/components/lite-loading';
import Pad from '@/components/pad';
import AV from 'leancloud-storage/dist/av-weapp.js';
import { leancloud } from '../../../config.json';
import styles from './index.module.scss';

const { appId, appKey, serverURLs } = leancloud;

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
  const [commentVisible, setCommentVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const query = new AV.Query(Model);
    const res = await query.equalTo('url', url).find();
    if (res.length > 0) {
      setList(res.reverse());
    }
  };

  return (
    <>
      <View className={styles.comment}>
        <Text className={styles.count}>{`共${list.length}条评论`}</Text>
        <View className={styles.inputWrapper}>
          <View className={styles.avatar}>
            <OpenData type='userAvatarUrl' lang='zh_CN' />
          </View>
          <View
            className={styles.input}
            onClick={() => setCommentVisible(true)}
          >
            雁过留痕...
          </View>
        </View>
        <CommentList list={list} limit={3} />
        {list.length > 3 ? (
          <View
            className={styles.moreTextWrapper}
            onClick={() => setCommentVisible(true)}
          >
            <Text className={styles.moreText}>查看更多评论</Text>
          </View>
        ) : null}
      </View>
      <Pad
        visible={commentVisible}
        setVisible={setCommentVisible}
        height='70vh'
      >
        <View className={styles.commentPad}>
          <View className={styles.titleWrapper}>
            <Text className={styles.title}>全部评论</Text>
          </View>
          <View style={{ flex: 1, overflow: 'scroll' }}>
            <ScrollView scrollY className={styles.content}>
              <CommentList list={list} />
              <LiteLoading text='本来无一物，何处惹尘埃 ~' />
            </ScrollView>
          </View>
        </View>
      </Pad>
    </>
  );
};

export default Comment;
