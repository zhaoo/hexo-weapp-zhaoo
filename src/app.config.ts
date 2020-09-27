export default {
  pages: [
    'pages/home/home',
    'pages/categories/categories',
    'pages/galleries/galleries',
    'pages/post/post',
    'pages/webview/webview',
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
      pagePath: "pages/home/home",
      iconPath: "./assets/tab-bar/home.png",
      selectedIconPath: "./assets/tab-bar/home-active.png",
      text: "首页"
    }, {
      pagePath: "pages/categories/categories",
      iconPath: "./assets/tab-bar/category.png",
      selectedIconPath: "./assets/tab-bar/category-active.png",
      text: "分类"
    }, {
      pagePath: "pages/galleries/galleries",
      iconPath: "./assets/tab-bar/image.png",
      selectedIconPath: "./assets/tab-bar/image-active.png",
      text: "摄影"
    }]
  }
}
