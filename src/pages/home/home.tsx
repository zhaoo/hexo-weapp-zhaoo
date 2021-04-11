import { View } from '@tarojs/components';
import usePagination from '@/hooks/usePagination';
import PostItem from '@/components/post-item';
import LiteLoading from '@/components/lite-loading';
import './home.scss';

const Home = () => {
  const [posts, hasMore, isLoading] = usePagination();
  return (
    <View className='home'>
      {posts.length > 0
        ? posts.map((item, index: number) => (
            <PostItem data={item} key={index} />
          ))
        : null}
      {isLoading ? <LiteLoading text='正在加载...' /> : null}
    </View>
  );
};

export default Home;
