import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import List from '@/components/list';
import logo from '@/assets/images/logo.png';
import styles from './about.module.scss';

const About = () => {
  return (
    <View className={styles.about}>
      <Image className={styles.logo} src={logo} mode='aspectFill' />
      <Text className={styles.title}>hexo-weapp-zhaoo</Text>
      <View className={styles.listWrapper}>
        <List
          title='GitHub'
          icon='github'
          arrow
          extraText='hexo-weapp-zhaoo'
          onClick={
            () =>
              Taro.setClipboardData({
                data: 'https://github.com/zhaoo/hexo-weapp-zhaoo',
              })
            // Taro.navigateTo({
            //   url: `/pages/webview/webview?url=https://github.com/zhaoo/hexo-weapp-zhaoo`,
            // })
          }
        />
        <List
          title='QQ群'
          icon='QQ'
          arrow
          extraText='550262893'
          onClick={
            () =>
              Taro.setClipboardData({
                data: 'https://qm.qq.com/cgi-bin/qm/qr?k=L0VjfLZ0MAzSuCjmrSf5H37FiVCndnA2&jump_from=webapi',
              })
            // Taro.navigateTo({
            //   url: `/pages/webview/webview?url=https://qm.qq.com/cgi-bin/qm/qr?k=L0VjfLZ0MAzSuCjmrSf5H37FiVCndnA2&jump_from=webapi`,
            // })
          }
        />
      </View>
    </View>
  );
};

export default About;
