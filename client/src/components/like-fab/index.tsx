import { useEffect, useState, FC } from 'react';
import { usePageScroll } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Icon from '@/components/icon';
import { leancloud } from '../../../config.json';
import AV from 'leancloud-storage/dist/av-weapp.js';
import { getUserInfo } from '@/utils/index';
import styles from './index.module.scss';

interface ILikeFabProps {
  path: string;
}

const { appId, appKey, serverURLs } = leancloud;
AV.init({ appId, appKey, serverURLs });
const Counter = AV.Object.extend('Like');

const LikeFab: FC<ILikeFabProps> = ({ path }) => {
  const [status, setStatus] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  usePageScroll((res) => {
    const { scrollTop } = res;
    scrollTop > 250 ? setVisible(true) : setVisible(false);
  });

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    const query = new AV.Query(Counter);
    const { nickName } = await getUserInfo();
    query.equalTo('path', path).equalTo('nickName', nickName);
    const res: number = await query.count();
    if (res > 0) {
      setStatus(true);
    }
  };

  const handleLike = async () => {
    const { nickName } = await getUserInfo();
    status ? removeCount(nickName) : addCount(nickName);
  };

  const addCount = async (nickName: string) => {
    const query = new Counter();
    query.save({ path, nickName }).then(() => setStatus(true));
  };

  const removeCount = async (nickName: string) => {
    const query = new AV.Query(Counter);
    query.find({ path, nickName }).then((res) => {
      res[0].destroy();
      setStatus(false);
    });
  };

  return (
    <View
      className={styles.likeFab}
      style={{ transform: visible ? 'translateY(0)' : 'translateY(120px)' }}
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

export default LikeFab;
