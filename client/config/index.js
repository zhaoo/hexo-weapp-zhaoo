import path from 'path';

const config = {
  projectName: 'hexo-weapp-zhaoo',
  date: '2021-4-10',
  alias: {
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/styles': path.resolve(__dirname, '..', 'src/styles'),
    '@/apis': path.resolve(__dirname, '..', 'src/apis'),
    '@/types': path.resolve(__dirname, '..', 'src/types'),
  },
  sass: {
    resource: ['src/styles/variable.scss', 'src/styles/reset.scss'],
    projectDirectory: path.resolve(__dirname, '..'),
  },
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
