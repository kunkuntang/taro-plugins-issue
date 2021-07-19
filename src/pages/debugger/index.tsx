import React, { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'

import './index.scss'
import CustomNavBar from '@/components/CustomNavBar/CustomNavBar'
import qs from 'qs'

type PageStateProps = {
  store: {}
}

interface Debugger {
  props: PageStateProps
}

class Debugger extends Component {
  componentWillMount() {}

  componentDidMount() {
    let pageParams = JSON.parse(JSON.stringify(Current.router?.params)) || {}
    if (!!pageParams['scene']) {
      try {
        const decodeStr = decodeURIComponent(pageParams['scene'])
        console.log('decodeStr', decodeStr)
        pageParams = {
          ...pageParams,
          ...qs.parse(decodeStr),
        }
      } catch (error) {
        console.error('解析二维码中的 scene 出错', error)
      }
    }
    delete pageParams.$taroTimestamp
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  get getAppLocalStorageInfo() {
    let tempObj: { key: string; value: any }[] = [
      { key: '1', value: '11'},
      { key: '2', value: '11'},
      { key: '3', value: '11'},
      { key: '4', value: '11'},
      { key: '5', value: '11'},
    ]
    return tempObj
  }
  // get getAppLocalStorageInfo() {
  //   return [
  //     {key: '111', value: '222'}
  //   ]
  // }

  handleCopyText(text: string) {
    Taro.setClipboardData({
      data: text,
    })
  }

  render() {
    return (
      <view className='debbuger'>
        <CustomNavBar isShowNavBack={true}></CustomNavBar>
        <view className='debbuger-info'>
          <text>localStorage 信息：</text>
          {this.getAppLocalStorageInfo.map((info) => {
            return (
              <view className='debbuger-info-item' key={info.key}>
                <view className='debbuger-info-label'>{info.key}: </view>
                <view onClick={this.handleCopyText.bind(this, info.value)}>
                  {info.value || '未设置值'}
                </view>
              </view>
            )
          })}
        </view>
      </view>
    )
  }
}

export default Debugger
