import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import axios from 'axios'
import PubSub from 'pubsub-js'


export default class index extends Component {

    search = () => {

        // 连续结构赋值，同时还能给变量重新命名
        const { keywordElement: { value: keyword } } = this

        // 发送网络请求之前，调用updateAppState，通知APP更新状态
        // this.props.updateAppState({ isFirst: false, isLoading: true });

        // 发布消息
        PubSub.publish('subName', { isFirst: false, isLoading: true })
        //   send the request to the http server，use axios to send the GET request

        axios.get(`https://api.github.com/search/users?q=${keyword}`) // 使用拼接模版字符串时，使用反引号 ``， 而不是单引号‘’
            .then(
                response => {
                    // 获取数据之后，调用updateAppState，通知APP更新状态
                    // this.props.updateAppState({ users: response.data.items, isLoading: false })
                    PubSub.publish('subName', { users: response.data.items, isLoading: false })
                },
                error => {
                    // 请求出错之后，调用updateAppState，通知APP更新状态
                    // this.props.updateAppState({ isLoading: false, err: error.message })
                    PubSub.publish('subName', { isLoading: false, err: error.message })
                }

            )
    }

    reset = () => {
        this.keywordElement.value = ""
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-light search-nav">
                <div className="container-fluid">
                    <span className="navbar-brand search-title">Search GitHub Users</span>
                    <form className="d-flex">
                        <input ref={c => this.keywordElement = c} className="form-control me-2 search-input" type="search" placeholder="Enter a keyword to search" />&nbsp;
                        <button onClick={this.search} className="btn btn-outline-success" type="button">Search</button>&nbsp;&nbsp;
                        <button onClick={this.reset} className="btn btn-outline-primary" type="button">Reset</button>
                    </form>
                </div>
            </nav>
        )
    }
}
