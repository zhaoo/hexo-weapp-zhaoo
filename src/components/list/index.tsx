import { FC, ReactNode } from 'react';
import { View, Text } from '@tarojs/components';
import Icon from '@/components/icon';
import './index.scss';

interface ListProps {
  title: string;
  icon?: string;
  arrow?: boolean;
  onClick?: () => void;
  rightChildren?: ReactNode;
}

const List: FC<ListProps> = ({
  title,
  icon,
  arrow,
  onClick,
  rightChildren,
}) => {
  return (
    <View className='list' onClick={onClick}>
      <View className='left'>
        {icon ? (
          <Icon type='image' name={icon} size={20} style={{ marginRight: 5 }} />
        ) : null}
        <Text className='title'>{title}</Text>
      </View>
      <View className='right'>
        {arrow ? <Icon type='image' name='right' size={16} /> : null}
        {rightChildren ? rightChildren : null}
      </View>
    </View>
  );
};

export default List;
