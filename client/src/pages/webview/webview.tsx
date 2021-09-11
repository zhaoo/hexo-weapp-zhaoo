import Taro from '@tarojs/taro';
import { WebView } from '@tarojs/components';

const Webview = () => {
  const { url } = Taro.getCurrentInstance().router.params;
  return <WebView src={url} />;
};

export default Webview;
