import { FC, useEffect, useRef, useState } from 'react';
import {
  usePageScroll,
  getSystemInfo,
  getMenuButtonBoundingClientRect,
  navigateBack,
  switchTab,
} from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import Icon from '@/components/icon';
import styles from './index.module.scss';

interface IImmersiveTitlebarProps {
  title: string;
}

const ImmersiveTitlebar: FC<IImmersiveTitlebarProps> = ({ title }) => {
  const titlebarRef = useRef<HTMLInputElement | null>(null);
  const [titlebarHeight, setTitlebarHeight] = useState<
    [number, number, number]
  >([44, 44, 88]);

  useEffect(() => {
    getSystemInfo().then((e) => {
      let customBar, headerBar;
      const { statusBarHeight, system } = e;
      let rect = getMenuButtonBoundingClientRect();
      if (system.toLowerCase().indexOf('ios') > -1) {
        customBar = rect.bottom + (rect.top - statusBarHeight) * 2;
        headerBar = customBar - statusBarHeight;
      } else {
        headerBar = rect.height + (rect.top - statusBarHeight) * 2;
        customBar = headerBar + statusBarHeight;
      }
      setTitlebarHeight([headerBar, statusBarHeight, customBar]);
    });
  }, []);

  usePageScroll(({ scrollTop }) => {
    const MAX_HEIGHT = 250;
    if (!titlebarRef.current) return;
    titlebarRef.current.style.opacity =
      scrollTop > MAX_HEIGHT ? '1' : String(scrollTop / MAX_HEIGHT);
  });

  return (
    <View
      className={styles.immersiveTitlebar}
      ref={titlebarRef}
      style={{ height: titlebarHeight[2] }}
    >
      <View className={styles.container} style={{ height: titlebarHeight[0] }}>
        <Icon
          type='image'
          name='left'
          size={18}
          style={{ marginRight: 5 }}
          onClick={() =>
            navigateBack().catch(() => switchTab({ url: '/pages/home/home' }))
          }
        />
        <Text className={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default ImmersiveTitlebar;
