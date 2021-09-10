export default {
  pages: [
    'pages/home/home',
    'pages/post/post',
    'pages/my/my',
    'pages/galleries/galleries',
    'pages/gallery/gallery',
    'pages/history/history',
    'pages/webview/webview',
    'pages/about/about',
    'pages/laboratory/laboratory',
    'pages/comment/comment',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#33333D',
    backgroundColor: '#fafafa',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/home',
        iconPath: './assets/tabbar/home.png',
        selectedIconPath: './assets/tabbar/home-active.png',
        text: '首页',
      },
      {
        pagePath: 'pages/galleries/galleries',
        iconPath: './assets/tabbar/image.png',
        selectedIconPath: './assets/tabbar/image-active.png',
        text: '相册',
      },
      {
        pagePath: 'pages/my/my',
        iconPath: './assets/tabbar/my.png',
        selectedIconPath: './assets/tabbar/my-active.png',
        text: '我的',
      },
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '您的位置信息将用于访问统计',
    },
  },
};
