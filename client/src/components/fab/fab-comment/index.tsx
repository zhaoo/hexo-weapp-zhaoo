import { FC } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import Icon from '@/components/icon';
import styles from './index.module.scss';

interface IFabCommentProps {
  visible: boolean;
  active: boolean;
}

const FabComment: FC<IFabCommentProps> = ({ visible, active }) => {
  return (
    <View
      className={`${styles.fabComment} ${visible ? styles.fabVisible : null} ${
        active ? styles.fabActive : null
      }`}
      onClick={() => Taro.eventCenter.trigger('changeCommentVisible')}
    >
      <Icon size={20} name='iconmessage-fill' />
    </View>
  );
};

export default FabComment;
