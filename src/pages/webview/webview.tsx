import { getCurrentInstance } from '@tarojs/taro';
import { WebView } from '@tarojs/components';

const Webview = () => {
  const { url } = getCurrentInstance().router.params;
  return <WebView src={url} />;
};

export default Webview;
