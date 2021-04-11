import { FC } from 'react';
import { Text } from '@tarojs/components';
import './index.scss';

interface IIconfontProps {
  name: string;
}

const Iconfont: FC<IIconfontProps> = ({ name }) => {
  return <Text className={`iconfont ${name}`}></Text>;
};

export default Iconfont;
