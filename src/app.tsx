import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'

class App extends Component {
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/categories/categories',
      'pages/galleries/galleries',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666666",
      selectedColor: "#33333D",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/index/index",
        iconPath: "./assets/tabbar/home.png",
        selectedIconPath: "./assets/tabbar/home-active.png",
        text: "首页"
      }, {
        pagePath: "pages/categories/categories",
        iconPath: "./assets/tabbar/category.png",
        selectedIconPath: "./assets/tabbar/category-active.png",
        text: "分类"
      }, {
        pagePath: "pages/galleries/galleries",
        iconPath: "./assets/tabbar/image.png",
        selectedIconPath: "./assets/tabbar/image-active.png",
        text: "摄影"
      }]
    }
  }

  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
