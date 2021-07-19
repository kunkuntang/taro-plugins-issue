export default {
  pages: [
    'pages/debugger/index',
  ],
  window: {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示', // 高速公路行驶持续后台定位
    },
  },
  plugins: {
    tencentvideo: {
      version: '1.4.9',
      provider: 'wxa75efa648b60994b',
    },
  },
}