import { FC, useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import './index.scss';

interface ColorSwitchProps {
  checked?: boolean;
  onChange?: (boolean) => void;
}

const ColorSwitch: FC<ColorSwitchProps> = ({ checked = false, onChange }) => {
  const [state, setState] = useState(checked);

  useEffect(() => {
    if (!onChange) return;
    onChange(state);
  }, [state]);

  return (
    <View
      className={`color-switch ${state ? 'night' : 'day'}`}
      onClick={() => setState(!state)}
    >
      <View className='knob' />
    </View>
  );
};

export default ColorSwitch;
