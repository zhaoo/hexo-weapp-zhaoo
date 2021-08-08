import { FC, useEffect, useRef } from 'react';
import Taro, { render } from '@tarojs/taro';
import { Canvas, View } from '@tarojs/components';
import lottie from 'lottie-miniprogram';
import loading from '@/assets/lottie/loading.json';
import './index.scss';

interface ILottieLoad {}

const LottieLoad: FC<ILottieLoad> = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    setTimeout(async () => {
      Taro.createSelectorQuery()
        .select('#canvas')
        .node((res: any) => {
          const canvas = res.node;
          const context = canvas.getContext('2d');
          lottie.setup(canvas);
          lottie.loadAnimation({
            animationData: loading,
            loop: true,
            autoplay: true,
            rendererSettings: { context },
          });
        })
        .exec();
    }, 0);
  }, []);

  return (
    <View className='lottie-load'>
      <Canvas id='canvas' ref={canvasRef} type='2d' className='canvas' />
    </View>
  );
};

export default LottieLoad;
