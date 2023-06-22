import React, { Component } from 'react'
import './App.css'

import Header from './component/Header'
import List from './component/List'

export default class App extends Component {
  state = {
    users: [],// users 的初始值为数组
    isFirst: true,// 是否为第一次打开页面
    isLoading: false,//表示是否处于加载中
    err: '' // 存储请求相关的错误信息
  }
  updateAppState = (stateObj) => {
    this.setState(stateObj);
  }
  render() {
    return (
      <div className="container">
        <Header updateAppState={this.updateAppState} />
        <List {...this.state} />
      </div>
    )
  }
}
