import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'

export default class index extends Component {

    state = {
        users: [],// users 的初始值为数组
        isFirst: true,// 是否为第一次打开页面
        isLoading: false,//表示是否处于加载中
        err: '' // 存储请求相关的错误信息
    }

    // 组件一旦加载到页面，就要订阅消息; 使用componentDidMount钩子函数，实现初始化的事情（开启定时器，订阅消息等）
    componentDidMount() {
        this.token = PubSub.subscribe('subName', (_, stateObj) => {

            this.setState(stateObj)
        })

    }
    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }

    render() {
        const { users, isFirst, isLoading, err } = this.state;

        return (
            <div className="row">
                {
                    isFirst ? <h2>Welcome! enter a keyword to search gitHub users</h2> : isLoading ? <h2>loading......</h2> :
                        err ? <h2 style={{ color: "red" }}>{err}</h2> :
                            users.map((userObj) => {
                                return (
                                    <div className="card" key={userObj.id}>
                                        <a href={userObj.html_url
                                        } target="_blank" rel="noreferrer">
                                            <img src={userObj.avatar_url} alt={'avator'} style={{ width: '100px' }} />
                                        </a>
                                        <p className="card-text">{userObj.login}</p>
                                    </div>
                                )
                            })
                }
            </div>
        )
    }
}
