import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import PubSub from 'pubsub-js'
import './index.css'

export default class index extends Component {

    search = async () => {

        // 连续结构赋值，同时还能给变量重新命名
        const { keywordElement: { value: keyword } } = this

        // 发送网络请求之前，调用updateAppState，通知APP更新状态
        // this.props.updateAppState({ isFirst: false, isLoading: true });

        // 发布消息
        PubSub.publish('subName', { isFirst: false, isLoading: true })



        // #region   1. 发送网路请求，使用axios发送
        /*  axios.get(`https://api.github.com/search/users?q=${keyword}`) ..then(
            // 使用拼接模版字符串时，使用反引号 ``， 而不是单引号‘’
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
            ) */
        // #region

        // #region   2. 发送网路请求，使用fetch发送(原始方法未优化)
        /*fetch(`https://api.github.com/search/users?q=${keyword}`)
            .then(
                response => {
    
                    console.log('联系服务器成功了');
                    return response.json();
                },
                error => {
                    console.log('联系服务器失败了', error);
                    return new Response(()={}) //阻断代码继续运行
                }
            ).then(response => {
                console.log('获取数据成功了', response)
            },
                error => {
                    console.log('获取数据失败了', error)
                }
            )*/
        // #region


        // #region   2. 发送网路请求，使用fetch发送(较优化,catch 穿透)
        /*fetch(`https://api.github.com/search/users?q=${keyword}`)
            .then(
                response => {
                    console.log('联系服务器成功了');
                    return response.json();
                }
            )
            .then(
                response => {
                    console.log('获取数据成功了', response)
                },
            )
            .catch(error => { console.log('获取数据失败了', error) }
            ) */
        // #region


        // #region   3. 发送网路请求，使用fetch发送(最优化,async await 异步操作的关注分离)
        /*
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${keyword}`);
            const data = await response.json();
            console.log('联系服务器成功了', data);
        }
        catch (error) {
            console.log('获取数据失败了', error)
        } 
        */
        // #region


        // 发送网路请求，使用fetch发送(APP 最终代码)
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${keyword}`);
            const data = await response.json();
            console.log('联系服务器成功了', data);
            PubSub.publish('subName', { users: data.items, isLoading: false })

        }
        catch (error) {
            console.log('获取数据失败了', error)
            PubSub.publish('subName', { isLoading: false, err: error.message })
        }

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
