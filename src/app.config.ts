export default {
  pages: [
    'pages/home/home',
    'pages/categories/categories',
    'pages/categories/category_list/category_list',
    'pages/galleries/galleries',
    'pages/galleries/gallery/gallery',
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
      iconPath: "./assets/tab_bar/home.png",
      selectedIconPath: "./assets/tab_bar/home_active.png",
      text: "首页"
    }, {
      pagePath: "pages/categories/categories",
      iconPath: "./assets/tab_bar/category.png",
      selectedIconPath: "./assets/tab_bar/category_active.png",
      text: "分类"
    }, {
      pagePath: "pages/galleries/galleries",
      iconPath: "./assets/tab_bar/image.png",
      selectedIconPath: "./assets/tab_bar/image_active.png",
      text: "摄影"
    }]
  }
}
