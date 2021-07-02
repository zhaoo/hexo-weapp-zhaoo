import { FC, ReactNode } from 'react';
import { View, Text } from '@tarojs/components';
import Icon from '@/components/icon';
import styles from './index.module.scss';

interface ListProps {
  title: string;
  icon?: string;
  arrow?: boolean;
  onClick?: () => void;
  rightChildren?: ReactNode;
  extraText?: string;
}

const List: FC<ListProps> = ({
  title,
  icon,
  arrow,
  onClick,
  rightChildren,
  extraText,
}) => {
  return (
    <View className={styles.list} onClick={onClick}>
      <View className={styles.left}>
        {icon ? (
          <Icon type='image' name={icon} size={20} style={{ marginRight: 5 }} />
        ) : null}
        <Text className={styles.title}>{title}</Text>
      </View>
      <View className={styles.right}>
        {rightChildren ? rightChildren : null}
        {extraText ? (
          <Text className={styles.extraText}>{extraText}</Text>
        ) : null}
        {arrow ? (
          <Icon type='image' name='right' size={16} style={{ marginLeft: 5 }} />
        ) : null}
      </View>
    </View>
  );
};

export default List;
