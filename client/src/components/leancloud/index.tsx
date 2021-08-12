import { FC, useEffect, useState } from 'react';
import AV from 'leancloud-storage/dist/av-weapp.js';
import { leancloud } from '../../../config.json';
const { appId, appKey, serverURLs } = leancloud;

AV.init({
  appId,
  appKey,
  serverURLs,
});

interface ILeancloudProps {
  path: string;
  model?: string;
  exp?: boolean;
}

const Leancloud: FC<ILeancloudProps> = ({
  model = 'Counter',
  path,
  exp = true,
}) => {
  const Model = AV.Object.extend(model);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetchCount();
    if (exp) {
      addCount();
    }
  }, []);

  const fetchCount = async () => {
    const query = new AV.Query(Model);
    const res = await query.equalTo('words', path).count();
    setCount(res);
  };

  const addCount = async () => {
    const query = new Model();
    query.save({ words: path });
  };

  return <>{count}</>;
};

export default Leancloud;
