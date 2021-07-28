import { FC, useEffect, useState } from 'react';
import AV from 'leancloud-storage/dist/av-weapp.js';

AV.init({
  appId: '5nmYX1URDFyDdOVu6WxizEsF-gzGzoHsz',
  appKey: 'xllg4mYlf0eT3efi7N0VOTeH',
  serverURLs: 'https://leancloud.cn/',
});

interface ILeancloudProps {
  path: string;
  counter?: string;
  exp?: boolean;
}

const Leancloud: FC<ILeancloudProps> = ({
  counter = 'Counter',
  path,
  exp = true,
}) => {
  const Counter = AV.Object.extend(counter);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log(1)
    fetchCount();
    if (exp) {
      addCount();
    }
  }, []);

  const fetchCount = async () => {
    const query = new AV.Query(Counter);
    query.equalTo('words', path);
    const res = await query.count();
    setCount(res);
  };

  const addCount = async () => {
    const query = new Counter();
    query.save({ words: path });
  };

  return <>{count}</>;
};

export default Leancloud;
