import { useState, useEffect } from 'react';
import AV from 'leancloud-storage/dist/av-weapp.js';

AV.init({
  appId: '5nmYX1URDFyDdOVu6WxizEsF-gzGzoHsz',
  appKey: 'xllg4mYlf0eT3efi7N0VOTeH',
  serverURLs: 'https://leancloud.cn/',
});

const useLeancloud = ({ name, path }) => {
  const Counter = AV.Object.extend(name);
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    const query = new AV.Query(Counter);
    query.equalTo('words', path);
    const res = await query.count();
    setCounter(res);
  };

  const addCount = async () => {
    const query = new Counter();
    query.save({ words: path });
    setCounter(counter + 1);
    setStatus(true);
  };

  const removeCount = async () => {
    const query = new AV.Query(Counter);
    query.find({ words: path }).then((res) => {
      res[0].destroy();
    });
    setCounter(counter - 1);
    setStatus(false);
  };

  return [counter, status, addCount, removeCount];
};

export default useLeancloud;
