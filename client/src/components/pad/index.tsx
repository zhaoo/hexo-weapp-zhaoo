import { FC, useEffect, useState, CSSProperties } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

interface IPadProps {
  visible: boolean;
  setVisible: (boolean) => void;
  height?: number | string;
  containerStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

const Pad: FC<IPadProps> = ({
  visible,
  setVisible,
  height = '50vh',
  containerStyle,
  contentStyle,
  children,
}) => {
  const [visibility, setVisibility] = useState<any>('hidden');

  useEffect(() => {
    if (visible) {
      setVisibility('visible');
    } else {
      setTimeout(() => setVisibility('hidden'), 300);
    }
  }, [visible]);

  return (
    <View
      className={styles.pad}
      onClick={() => setVisible(false)}
      catchMove
      style={{
        visibility,
        opacity: visible ? 1 : 0,
        ...containerStyle,
      }}
    >
      <View
        className={styles.padContent}
        style={{
          transform: visible ? 'translateY(0)' : `translateY(${height})`,
          height,
          ...contentStyle,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Pad;
