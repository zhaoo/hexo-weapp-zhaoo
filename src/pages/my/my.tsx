import Taro from '@tarojs/taro';
import { View, Image, OpenData, Text } from '@tarojs/components';
import Icon from '@/components/icon';
import List from '@/components/list';
import ColorSwitch from '@/components/color-switch';
import { WEB_URL } from '@/config/index';
import './my.scss';

const My = () => {
  return (
    <View className='my'>
      <View className='user-wrapper'>
        <Image
          className='background-image'
          src='https://pic.izhaoo.com/20210320231053.jpg'
        />
        <View className='user'>
          <View className='avatar'>
            <OpenData type='userAvatarUrl' lang='zh_CN' />
          </View>
          <View className='nickname'>
            <OpenData type='userNickName' lang='zh_CN' defaultText='用户' />
          </View>
        </View>
      </View>
      <View className='tabnav'>
        <View
          className='tabnav-item'
          onClick={() => Taro.navigateTo({ url: `/pages/history/history` })}
        >
          <Icon type='image' name='clock' size={30} />
          <Text className='text'>历史</Text>
        </View>
        <view className='divide' />
        <View className='tabnav-item'>
          <Icon type='image' name='like' size={30} />
          <Text className='text'>喜欢</Text>
        </View>
        <view className='divide' />
        <View className='tabnav-item'>
          <Icon type='image' name='reward' size={30} />
          <Text className='text'>打赏</Text>
        </View>
        <view className='divide' />
        <View className='tabnav-item'>
          <Icon type='image' name='share' size={30} />
          <Text className='text'>分享</Text>
        </View>
      </View>
      <View className='list-wrapper'>
        <List title='夜间模式' icon='moon' rightChildren={<ColorSwitch />} />
        <List
          title='网页博客'
          icon='cloud'
          arrow
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/webview/webview?url=${WEB_URL}`,
            })
          }
        />
        <List title='实验功能' icon='experiment' arrow />
        <List
          title='关于应用'
          icon='info-circle'
          arrow
          onClick={() => Taro.navigateTo({ url: `/pages/about/about` })}
        />
      </View>
    </View>
  );
};

export default My;
