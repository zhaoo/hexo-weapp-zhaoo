<div align="center">
  <a href="https://github.com/izhaoo/hexo-theme-zhaoo/" target="_blank" rel="noopener noreferrer">
    <img src="./screenshots/zhaoo-logo.png" alt="zhaoo logo" width="100">
  </a>
</div>

<h3 align="center">为 Hexo 定制的博客小程序</h3>  

<div align="center">
  <a href="https://github.com/izhaoo/hexo-theme-zhaoo/releases" target="_blank" rel="noopener noreferrer">
    <img alt="releases" src="https://img.shields.io/badge/releases-v1.0.0-blue.svg?style=flat-square&longCache=true">
  </a>
  <a href="https://taro.aotu.io/" target="_blank" rel="noopener noreferrer">
    <img alt="taro" src="https://img.shields.io/badge/react-%3E=3.0.9-blue.svg?style=flat-square&logo=react&longCache=true">
  </a>
    <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
    <img alt="react" src="https://img.shields.io/badge/taro-%3E=16.8.0-blue.svg?style=flat-square&longCache=true">
  </a>
  <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
    <img alt="node" src="https://img.shields.io/badge/node-%3E=10.9.0-green.svg?style=flat-square&logo=Node.js&longCache=true">
  </a>
  <a href="(https://github.com/izhaoo/hexo-theme-zhaoo/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
    <img alt="license" src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square&longCache=true">
  </a>
</div>

## 预览

<div align="center">
  <img src="./screenshots/weappcode.jpg" alt="weappcode" height="200">
  <img src="./screenshots/qrcode.jpg" alt="qrcode" height="200">
</div>

## 截图

<div align="center">
  <img src="./screenshots/1.jpg" alt="1" width="300">
  <img src="./screenshots/2.jpg" alt="2" width="300">
</div>

<div align="center">
  <img src="./screenshots/3.jpg" alt="3" width="300">
  <img src="./screenshots/4.jpg" alt="4" width="300">
</div>

<div align="center">
  <img src="./screenshots/5.jpg" alt="5" width="300">
  <img src="./screenshots/6.jpg" alt="6" width="300">
</div>

## 部署

### RESTful

需要配合 [hexo-generator-restful](https://github.com/izhaoo/hexo-generator-restful) 插件使用，参考插件文档部署并生成 `RESTful` 接口。

修改 `/config/index.ts` 文件内的 `BASE_URL` (RESTful API) 地址字段。

### Build

注册微信小程序，修改 `/project.config.json` 文件中的 `appid` 等字段，匹配小程序配置。

```bash
yarn  // 安装依赖

// 修改 config.ts 中的配置

yarn build  // 打包
```

使用微信开发者工具打开 `dist` 目录，上传代码完成发布。

## 相关

* 主题：[hexo-theme-zhaoo](https://github.com/izhaoo/hexo-theme-zhaoo) (一款简约的 Hexo 主题)
* 插件：[hexo-generator-restful](https://github.com/izhaoo/hexo-generator-restful) (Hexo RESTful 接口)

## 协议

[MIT](https://github.com/izhaoo/hexo-theme-zhaoo/blob/master/LICENSE) License



## 注意

本仓库是我个性化之后的。