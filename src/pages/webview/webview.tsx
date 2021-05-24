import { WebView } from '@tarojs/components';
import { WEB_URL } from '@/config/index';

const Webview = () => {
  return <WebView src={WEB_URL} />;
};

export default Webview;