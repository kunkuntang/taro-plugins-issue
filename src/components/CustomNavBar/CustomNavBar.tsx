import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './CustomNavBar.scss'
import { AtIcon } from 'taro-ui'

interface IProps {
  /** 页面标题 */
  title?: string
  /** 是否显示返回按钮 */
  isShowNavBack?: boolean
  /** 自定义渲染头部内容 */
  renderComponent?: JSX.Element
}
interface IState {}

class CustomNavBar extends Component<IProps, IState> {
  state = {
    /**导航栏数据 */
    navBarHeight: 0, // 导航栏高度
    // eslint-disable-next-line react/no-unused-state
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
  }

  componentDidMount() {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync()
    // 胶囊按钮位置信息
    const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()
    this.setState({
      navBarHeight:
        (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
        menuButtonInfo.height +
        systemInfo.statusBarHeight,
      // eslint-disable-next-line react/no-unused-state
      menuRight: systemInfo.screenWidth - menuButtonInfo.right,
      menuBotton: menuButtonInfo.top - systemInfo.statusBarHeight,
      menuHeight: menuButtonInfo.height,
    })
  }

  render() {
    return (
      <View style={{ height: this.state.navBarHeight + 'px', width: '100%' }}>
        <View
          className='nav-fixed-bar'
          style={{
            height: this.state.navBarHeight + 'px',
          }}
        >
          <View
            className='nav-fixed-bar-content'
            style={{
              height: this.state.menuHeight + 'px',
              lineHeight: this.state.menuHeight + 'px',
              bottom: this.state.menuBotton + 'px',
            }}
          >
            {this.props.renderComponent ? (
              this.props.renderComponent
            ) : (
              <View>
                {this.props.isShowNavBack && (
                  <View style={{ position: 'absolute', top: 0, left: '15px' }}>
                    <AtIcon
                      value='chevron-left'
                      size='18'
                      color='#ffffff'
                      onClick={() => Taro.navigateBack({ delta: 1 })}
                    ></AtIcon>
                  </View>
                )}
                <View>{this.props.title || ''}</View>
              </View>
            )}
          </View>
        </View>
      </View>
    )
  }
}

export default CustomNavBar
