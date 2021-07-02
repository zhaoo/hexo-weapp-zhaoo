import { useState } from 'react';
import Taro from '@tarojs/taro';
import {
  View,
  Image,
  OpenData,
  Text,
  Swiper,
  SwiperItem,
} from '@tarojs/components';
import Icon from '@/components/icon';
import List from '@/components/list';
import ColorSwitch from '@/components/color-switch';
import Modal from '@/components/modal';
import { webUrl, donate } from '../../../config.json';
import styles from './my.module.scss';

const My = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Modal
        visible={modalVisible}
        setVisible={setModalVisible}
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
      <View className={styles.my}>
        <View className={styles.userWrapper}>
          <Image
            className={styles.backgroundImage}
            src='https://pic.izhaoo.com/20210320231053.jpg'
          />
          <View className={styles.user}>
            <View className={styles.avatar}>
              <OpenData type='userAvatarUrl' lang='zh_CN' />
            </View>
            <View className={styles.nickname}>
              <OpenData type='userNickName' lang='zh_CN' defaultText='用户' />
            </View>
          </View>
        </View>
        <View className={styles.tabnav}>
          <View
            className={styles.tabnavItem}
            onClick={() => Taro.navigateTo({ url: `/pages/history/history` })}
          >
            <Icon type='image' name='clock' size={30} />
            <Text className={styles.text}>历史</Text>
          </View>
          <view className={styles.divide} />
          <View
            className={styles.tabnavItem}
            onClick={() => Taro.navigateTo({ url: `/pages/history/history` })}
          >
            <Icon type='image' name='like' size={30} />
            <Text className={styles.text}>喜欢</Text>
          </View>
          <view className={styles.divide} />
          <View
            className={styles.tabnavItem}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <Icon type='image' name='reward' size={30} />
            <Text className={styles.text}>打赏</Text>
          </View>
          <view className={styles.divide} />
          <View
            className={styles.tabnavItem}
            onClick={() => Taro.navigateTo({ url: `/pages/integral/integral` })}
          >
            <Icon type='image' name='integral' size={30} />
            <Text className={styles.text}>积分</Text>
          </View>
        </View>
        <View className={styles.listWrapper}>
          <List title='夜间模式' icon='moon' rightChildren={<ColorSwitch />} />
          <List
            title='网页博客'
            icon='cloud'
            arrow
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/webview/webview?url=${webUrl}`,
              })
            }
          />
          <List
            title='实验功能'
            icon='experiment'
            arrow
            onClick={() =>
              Taro.navigateTo({ url: `/pages/laboratory/laboratory` })
            }
          />
          <List
            title='关于应用'
            icon='info-circle'
            arrow
            onClick={() => Taro.navigateTo({ url: `/pages/about/about` })}
          />
        </View>
      </View>
    </>
  );
};

export default My;
