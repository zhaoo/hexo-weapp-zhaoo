import { useShareAppMessage } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import usePagination from '@/hooks/usePagination';
import PostItem from '@/components/post-item';
import LiteLoading from '@/components/lite-loading';
import './home.scss';

const Home = () => {
  const [posts, hasMore, isLoading] = usePagination();

  useShareAppMessage(() => {
    return {
      title: 'zhaoo',
    };
  });

  return (
    <ScrollView className='home' scrollY scrollX={false}>
      {posts.length > 0
        ? posts.map((item, index: number) => (
            <PostItem data={item} key={index} />
          ))
        : null}
      {isLoading ? <LiteLoading text='正在加载...' icon='jingyu' /> : null}
      {!hasMore ? <LiteLoading text='本来无一物，何处惹尘埃 ~' /> : null}
    </ScrollView>
  );
};

export default Home;
