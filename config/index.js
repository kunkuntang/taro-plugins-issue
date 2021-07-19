const path = require('path')

const config = {
  projectName: 'testTaro',
  date: '2020-12-27',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [{ from: 'src/ext.json', to: 'dist/weapp/ext.json' }],
  },
  framework: 'react',
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
  },
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
    webpackChain(chain) {
      chain.merge({
        output: {
          // 可以配合 npm script 和环境变量来动态修改
          jsonpFunction: process.env.JSONP_NAME || 'webpackJsonp',
        },
      })
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
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    esnextModules: ['taro-ui'],
  },
}

module.exports = function (merge) {
  // 判断是否是打包广告落地页
  if (process.env.INDEPENDENT === 'true') {
    config.outputRoot = `dist/cxd`
    config.defineConstants = {
      // 广告落地页的请求基本路径
      BASE_URL: '"https://cxd-api.app33.cn"',
      // BASE_URL: '"https://test-qunyou-api.liankaa.com"',
    }
    config.plugins = config.plugins.concat([
      '@tarojs/plugin-indie',
      [
        path.join(process.cwd(), '/plugins/independent.js'),
        {
          independentOutputRoot: 'cxd',
          independentSrouceRoot: 'src/cxd',
          targetProjectPath: `dist/${process.env.TARO_ENV}`,
        },
      ],
    ])
  } else {
    config.defineConstants = {
      // 非广告落地页的请求基本路径
      // BASE_URL: '"https://cxd-api.app3.cn"',
      BASE_URL: '"https://test-qunyou-api.liankaa.cn"',
    }
  }
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
