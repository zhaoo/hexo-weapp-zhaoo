/*
 * @Descripttion: 评论组件
 */

import { useEffect, useState, FC } from 'react';
import Taro from '@tarojs/taro';
import {
  View,
  Text,
  OpenData,
  ScrollView,
  Input,
  Button,
} from '@tarojs/components';
import { showToast } from '@tarojs/taro';
import CommentList from '@/components/comment-list';
import LiteLoading from '@/components/lite-loading';
import Pad from '@/components/pad';
import Icon from '@/components/icon';
import { get } from '@/apis/request';
import AV from 'leancloud-storage/dist/av-weapp.js';
import { leancloud } from '../../../config.json';
import { getUserInfo } from '@/utils/index';
import styles from './index.module.scss';

interface ICommentProps {
  model?: string;
  url: string;
}

const { appId, appKey, serverURLs } = leancloud;
AV.init({ appId, appKey, serverURLs });

const Comment: FC<ICommentProps> = ({ model = 'Comment', url }) => {
  const Model = AV.Object.extend(model);
  const [list, setList] = useState<any[]>([]);
  const [commentVisible, setCommentVisible] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>('');

  useEffect(() => {
    fetchData();
    Taro.eventCenter.on('changeCommentVisible', () =>
      setCommentVisible(!commentVisible)
    );
    return () => {
      Taro.eventCenter.off('changeCommentVisible');
    };
  }, []);

  const fetchData = () => {
    Taro.cloud
      .callFunction({
        name: 'comment',
        data: {
          appId,
          appKey,
          serverURLs,
          sql: `select * from Comment where url = '${url}' order by createdAt desc`,
        },
      })
      .then(({ result }: any) => {
        if (result && result.success) {
          setList(result.data);
        }
      })
      .catch();
  };

  const sendComment = async () => {
    if (!commentValue) return;
    const { avatarUrl, nickName } = await getUserInfo();
    try {
      const ipRes = await get(
        'https://pv.sohu.com/cityjson?ie=utf-8',
        {},
        {},
        false
      ); //接口获取IP
      const ip = ipRes
        .split(' ')[4]
        .replace('"', '')
        .replace('"', '')
        .replace(',', ''); //解析IP数据
      const query = new Model();
      query.save({
        url,
        comment: `<p>${commentValue}</p>`,
        mail: '',
        nick: nickName,
        insertedAt: new Date(),
        weappAvatar: avatarUrl,
        ua: window.navigator.userAgent,
        ip,
      });
      setCommentValue('');
      showToast({
        title: '评论成功',
        icon: 'success',
        duration: 2000,
      });
      setTimeout(() => fetchData());
    } catch (e) {
      showToast({
        title: '评论失败',
        icon: 'none',
        duration: 2000,
      });
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
        <View
          className={styles.commentPad}
          onClick={(e) => e.stopPropagation()}
        >
          <View className={styles.titleWrapper}>
            <Text className={styles.title}>全部评论</Text>
          </View>
          <View style={{ flex: 1, overflow: 'scroll' }}>
            <ScrollView scrollY className={styles.content}>
              <CommentList list={list} />
              <LiteLoading text='本来无一物，何处惹尘埃 ~' />
              <View className={styles.placeholder} />
            </ScrollView>
          </View>
          <View className={styles.inputWrapper}>
            <Input
              className={styles.input}
              type='text'
              placeholder='雁过留痕...'
              placeholderStyle='font-size: 0.9em;'
              cursorSpacing={20}
              value={commentValue}
              onInput={({ detail }) => setCommentValue(detail.value)}
            />
            <View className={styles.avatar}>
              {commentValue ? (
                <Button
                  className={styles.send}
                  openType='getUserInfo'
                  onClick={() => sendComment()}
                >
                  <Icon
                    name='iconsend'
                    size={18}
                    style={{
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </Button>
              ) : (
                <OpenData type='userAvatarUrl' lang='zh_CN' />
              )}
            </View>
          </View>
        </View>
      </Pad>
    </>
  );
};

export default Comment;
