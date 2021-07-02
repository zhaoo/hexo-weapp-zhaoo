import { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import HistoryItem from '@/components/history-item';
import { getStorageSync } from '@/utils/storage';
import './history.scss';

const History = () => {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    setHistories(getStorageSync('history'));
  }, []);

  return (
    <View className='history'>
      {histories.length > 0
        ? histories
            .reverse()
            .map((item: any) => <HistoryItem data={item} key={item.slug} />)
        : null}
    </View>
  );
};

export default History;
