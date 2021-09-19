import { useEffect, useState, FC } from 'react';
import Taro, { showToast } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Icon from '@/components/icon';
import { leancloud } from '../../../../config.json';
import AV from 'leancloud-storage/dist/av-weapp.js';
import { getUserInfo, filterHtml } from '@/utils/index';
import { IPostItem } from '@/types/post';
import styles from './index.module.scss';

interface IFabLikeProps {
  post: IPostItem;
  visible: boolean;
  active: boolean;
  canRemove?: boolean;
}

const { appId, appKey, serverURLs } = leancloud;
AV.init({ appId, appKey, serverURLs });
const Counter = AV.Object.extend('Like');

const FabLike: FC<IFabLikeProps> = ({
  post,
  visible,
  active,
  canRemove = true,
}) => {
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    const query = new AV.Query(Counter);
    const { nickName } = await getUserInfo();
    query.equalTo('path', post.realPath).equalTo('nickName', nickName);
    const res: number = await query.count();
    if (res > 0) {
      setStatus(true);
    }
  };

  const handleLike = async () => {
    const { nickName, avatarUrl } = await getUserInfo();
    if (status) {
      if (!canRemove) {
        showToast({
          icon: 'none',
          title: '小心心不可以收回哦~',
          duration: 2000,
        });
        return;
      }
      removeCount(nickName);
    } else {
      addCount(nickName, avatarUrl);
    }
    setTimeout(() => Taro.eventCenter.trigger('refreshLeancloud', 'Like'), 100);
  };

  const addCount = async (nickName: string, weappAvatar: string) => {
    const query = new Counter();
    query
      .save({
        nickName,
        weappAvatar,
        slug: post.slug,
        path: post.realPath,
        title: post.title,
        excerpt: post.excerpt || filterHtml(post.content).substr(0, 50),
        cover: post.cover,
      })
      .then(() => setStatus(true));
  };

  const removeCount = async (nickName: string) => {
    const query = new AV.Query(Counter);
    query.find({ path: post.path, nickName }).then((res) => {
      res[0].destroy();
      setStatus(false);
    });
  };

  return (
    <View
      className={`${styles.fabLike} ${visible ? styles.fabVisible : null} ${
        active ? styles.fabActive : null
      }`}
      onClick={() => handleLike()}
    >
      {status ? (
        <Icon size={20} name='iconheart-fill' style={{ color: '#eb3223' }} />
      ) : (
        <Icon size={20} name='iconheart' />
      )}
    </View>
  );
};

export default FabLike;
