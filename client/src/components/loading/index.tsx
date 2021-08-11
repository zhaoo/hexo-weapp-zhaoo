import { View, Image } from '@tarojs/components';
import loading from '@/assets/images/loading.gif';
import './index.scss';

const Loading = () => {
  return (
    <View className='loading'>
      <Image src={loading} mode='center' />
    </View>
  );
};

export default Loading;
