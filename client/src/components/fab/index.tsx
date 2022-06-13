/*
 * @Descripttion: Fab
 * @Author: 兆兆
 * @Date: 2021-09-12 10:56:02
 * @LastEditors: 兆兆
 * @LastEditTime: 2022-06-13 21:38:47
 */

import { useState, FC } from 'react';
import { usePageScroll } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Icon from '@/components/icon';
import FabLike from './fab-like';
import FabComment from './fab-comment';
import { comment } from '../../../config.json';
import { IPostItem } from '@/types/post';
import styles from './index.module.scss';

interface IFabProps {
  post: IPostItem;
}

const Fab: FC<IFabProps> = ({ post }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  usePageScroll((res) => {
    const { scrollTop } = res;
    if (scrollTop > 250) {
      setVisible(true);
    } else {
      setVisible(false);
      setActive(false);
    }
  });

  return (
    <>
      <View
        className={`${styles.fab} ${visible ? styles.fabVisible : null} ${
          active ? styles.fabActive : null
        }`}
        onClick={() => setActive(!active)}
      >
        <Icon size={20} name='iconplus' />
      </View>
      <FabLike
        post={post}
        visible={visible}
        active={active}
        canRemove={false}
      />
      {comment.enable ? <FabComment visible={visible} active={active} /> : null}
    </>
  );
};

export default Fab;
