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
          title='网页博客'
          icon='cloud'
          arrow
          onClick={() => Taro.navigateTo({ url: `/pages/webview/webview` })}
        />
        <List
          title='网页博客'
          icon='cloud'
          arrow
          onClick={() => Taro.navigateTo({ url: `/pages/webview/webview` })}
        />
        <List
          title='网页博客'
          icon='cloud'
          arrow
          onClick={() => Taro.navigateTo({ url: `/pages/webview/webview` })}
        />
      </View>
    </View>
  );
};

export default About;
