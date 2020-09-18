import Taro, { useState, useEffect } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { getPosts } from '@/utils/api'
import PostItem from '@/components/post-item'
import './index.scss'

export default function Index() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await getPosts()
      setPosts(data.data)
    })()
  }, [])

  return (<ScrollView scrollY className='index'>
    {posts && posts.map((item: any) => {
      return (<PostItem item={item} key={item.slug} />)
    })}
  </ScrollView>)
}

Index.config = {
  navigationBarTitleText: '首页'
}