import { FC } from 'react';
import { Image, Swiper, SwiperItem } from '@tarojs/components';
import Modal from '@/components/modal';
import { donate } from '../../../config.json';
import styles from './index.module.scss';

interface IDonateProps {
  visible: boolean;
  setVisible: (boolean) => void;
}

const Donate: FC<IDonateProps> = ({ visible, setVisible }) => {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      content={
        <Swiper
          className={styles.donate}
          indicatorColor='#999'
          indicatorActiveColor='#fff'
          circular
          indicatorDots
        >
          <SwiperItem>
            <Image
              className={styles.image}
              src={donate?.wechat}
              mode='aspectFill'
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              className={styles.image}
              src={donate?.alipay}
              mode='aspectFill'
            />
          </SwiperItem>
        </Swiper>
      }
    />
  );
};

export default Donate;
