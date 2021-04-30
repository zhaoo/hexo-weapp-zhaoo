import Taro from '@tarojs/taro';
import { View, Image, OpenData, Text } from '@tarojs/components';
import Iconfont from '@/components/iconfont';
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
        <View className='tabnav-item'>
          <Iconfont type='image' name='like' size={30} />
          <Text className='text'>喜欢</Text>
        </View>
        <view className='divide' />
        <View className='tabnav-item'>
          <Iconfont type='image' name='message' size={30} />
          <Text className='text'>消息</Text>
        </View>
        <view className='divide' />
        <View className='tabnav-item'>
          <Iconfont type='image' name='clock' size={30} />
          <Text className='text'>历史</Text>
        </View>
        <view className='divide' />
        <View className='tabnav-item'>
          <Iconfont type='image' name='share' size={30} />
          <Text className='text'>分享</Text>
        </View>
      </View>
    </View>
  );
};

export default My;
