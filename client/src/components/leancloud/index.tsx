import { FC, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import AV from 'leancloud-storage/dist/av-weapp.js';
import { leancloud } from '../../../config.json';

interface ILeancloudProps {
  path: string;
  model?: string;
  exp?: boolean;
  field?: string;
}

const { appId, appKey, serverURLs } = leancloud;
AV.init({ appId, appKey, serverURLs });

const Leancloud: FC<ILeancloudProps> = ({
  model = 'Counter',
  path,
  exp = true,
  field = 'words',
}) => {
  const Model = AV.Object.extend(model);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetchCount();
    if (exp) {
      addCount();
    }
    Taro.eventCenter.on('refreshLeancloud', (arg) => {
      if (model === arg) {
        fetchCount();
      }
    });
    return () => {
      Taro.eventCenter.off('refreshLeancloud');
    };
  }, []);

  const fetchCount = async () => {
    const query = new AV.Query(Model);
    const res = await query.equalTo(field, path).count();
    setCount(res);
  };

  const addCount = async () => {
    const query = new Model();
    query.save({ words: path });
  };

  return <>{count}</>;
};

export default Leancloud;
