import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import CountTo from 'react-count-to';
import Icon from '@/components/icon';
import styles from './integral.module.scss';

const countToFn = (value) => <Text>{value}</Text>;

const token = [
  {
    name: 'ZHAOO',
    balance: 7086433.72,
  },
  {
    name: 'DOGE',
    balance: 1.007828,
  },
  {
    name: 'SHIB',
    balance: 78269.2444,
  },
  {
    name: 'USDT',
    balance: 7.7968,
  },
  {
    name: 'BTC',
    balance: 0.000139,
  },
];

const Integral = () => {
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState('');

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    const res = await Taro.cloud.callFunction({
      name: 'wallet',
    });
    const { account, balance } = res.result;
    setBalance(balance);
    setAccount(account);
  };

  return (
    <View className={styles.integral}>
      <View className={styles.mainCard}>
        <View className={styles.assetsWrapper}>
          <Text className={styles.title}>我的积分</Text>
          <Text className={styles.count}>
            {
              <CountTo to={balance} speed={1234}>
                {countToFn}
              </CountTo>
            }
          </Text>
        </View>
        <View className={styles.actionWraper}>
          <View className={styles.actionItem}>
            <Icon name='iconwallet' size={22} />
            <Text className={styles.name}>账户</Text>
          </View>
          <View className={styles.divider} />
          <View className={styles.actionItem}>
            <Icon name='icontransaction' size={22} />
            <Text className={styles.name}>记录</Text>
          </View>
          <View className={styles.divider} />
          <View className={styles.actionItem}>
            <Icon name='iconDollar' size={22} />
            <Text className={styles.name}>收款</Text>
          </View>
        </View>
      </View>
      <View className={styles.tokenCard}>
        {token.length > 0
          ? token.map((item, index) => (
              <View className={styles.tokenItem} key={index}>
                <Text className={styles.name}>{item.name}</Text>
                <Text className={styles.balance}>
                  <CountTo to={item.balance} speed={1234} digits={2}>
                    {countToFn}
                  </CountTo>
                </Text>
              </View>
            ))
          : null}
      </View>
    </View>
  );
};

export default Integral;
