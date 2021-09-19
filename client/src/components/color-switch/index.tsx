import { FC, useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

interface ColorSwitchProps {
  checked?: boolean;
  onChange?: (boolean) => void;
}

const ColorSwitch: FC<ColorSwitchProps> = ({ checked = false, onChange }) => {
  const [state, setState] = useState<boolean>(checked);

  useEffect(() => {
    if (!onChange) return;
    onChange(state);
  }, [state]);

  return (
    <View
      className={`${styles.colorSwitch} ${state ? styles.night : styles.day}`}
      onClick={() => setState(!state)}
    >
      <View className={styles.knob} />
    </View>
  );
};

export default ColorSwitch;
