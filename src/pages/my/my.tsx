import { View, Image, OpenData } from '@tarojs/components';
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
        {[0, 1, 2].map((item) => (
          <View className='tabnav-item' key={item}>
            <Iconfont type='image' name='jingyu' size={60} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default My;
