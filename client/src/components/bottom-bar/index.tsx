import { FC, CSSProperties } from 'react';
import { View, Text } from '@tarojs/components';
import Icon from '@/components/icon';
import useLeancloud from '@/hooks/useLeancloud';
import styles from './index.module.scss';

interface IBottomBarProps {
  path: string;
  style?: CSSProperties;
}

const BottomBar: FC<IBottomBarProps> = ({ path, style }) => {
  const [voteCounter, voteStatus, addVoteCount, removeVoteCount] = useLeancloud(
    { name: 'Vote', path }
  );

  const bindVote = () => {
    if (voteStatus) {
      removeVoteCount();
    } else {
      addVoteCount();
    }
  };

  return (
    <View className={styles.bottomBar} style={{ ...style }}>
      <View className={styles.bottomBarItem} onClick={() => bindVote()}>
        {voteStatus ? (
          <Icon
            name='iconheart-fill'
            size={22}
            style={{ marginRight: 5, color: 'red' }}
          />
        ) : (
          <Icon name='iconheart' size={22} style={{ marginRight: 5 }} />
        )}
        <Text>{voteCounter}</Text>
      </View>
      <View className={styles.divider} />
      <View className={styles.bottomBarItem}>
        <Icon name='iconstar' size={22} style={{ marginRight: 5 }} />
        <Text>0</Text>
      </View>
      <View className={styles.divider} />
      <View className={styles.bottomBarItem}>
        <Icon name='iconmessage' size={22} style={{ marginRight: 5 }} />
        <Text>0</Text>
      </View>
    </View>
  );
};

export default BottomBar;
