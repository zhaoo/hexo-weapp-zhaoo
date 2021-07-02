import { FC, CSSProperties } from 'react';
import { Text, View, Image } from '@tarojs/components';
import styles from './index.module.scss';

interface IIconProps {
  name: string;
  type?: 'font' | 'image';
  size?: number;
  style?: CSSProperties;
}

const Icon: FC<IIconProps> = ({ name, type = 'font', size, style }) => {
  let imageSrc;
  if (type === 'image') {
    imageSrc = require(`@/assets/iconfont/${name}.png`);
  }

  return (
    <View
      className={styles.icon}
      style={{
        ...style,
        width: size,
        height: size,
      }}
    >
      {type === 'font' ? (
        <Text
          className={`${styles.iconfont} ${styles[name]}`}
          style={{ fontSize: size }}
        ></Text>
      ) : (
        <Image src={imageSrc} style={{ width: size, height: size }} />
      )}
    </View>
  );
};

export default Icon;
