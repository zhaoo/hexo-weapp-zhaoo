import { FC } from 'react';
import { Text, View, Image } from '@tarojs/components';
import './index.scss';

interface IIconfontProps {
  name: string;
  type?: 'font' | 'image';
  size?: number;
}

const Iconfont: FC<IIconfontProps> = ({ name, type = 'font', size }) => {
  let imageSrc;
  if (type === 'image') {
    imageSrc = require(`@/assets/iconfont/${name}.png`);
  }

  return (
    <View style={{ width: size, height: size }}>
      {type === 'font' ? (
        <Text className={`iconfont ${name}`} style={{ fontSize: size }}></Text>
      ) : (
        <Image src={imageSrc} style={{ width: size, height: size }} />
      )}
    </View>
  );
};

export default Iconfont;
