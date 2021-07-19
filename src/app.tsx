import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import Taro from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss' // 引入组件样式 - 方式一
// import 'animate.css'

import './app.scss'

const store = {}

class App extends Component {
  async componentWillMount() {}
  async componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
