

## 此APP包含以下内容：

### 知识点：

#### 1. 01_src_axios_api 中：

#### 	获取数据：axios库+public API （没有跨域的问题，服务端已经作了cors的配置）

https://api.github.com/search/users?q=XXXX

#### 	组件之间的通信：使用最基础的方式

##### 		父传子：使用props

##### 		子传父：父传递一个方法给子，子调用此方法并将参数传入





#### 2. 02_src_axios_server 中：

#### 	获取数据：axios库+代理服务器 （端口http://localhost:8000/search/users）

##### 			有跨域的问题，使用`http-proxy-middleware`库来实现

1. ##### 首先，安装`http-proxy-middleware`库。在项目根目录下运行以下命令：

```bash
bashCopy code
npm install http-proxy-middleware --save
```

1. ##### 在项目的根目录下创建一个新的文件，例如`setupProxy.js`。

2. ##### 在`setupProxy.js`文件中，使用`createProxyMiddleware`函数来配置你的代理。以下是一个示例：

```javascript
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy.createProxyMiddleware(
            '/api',
            {
                target: 'http://localhost:8000',
                changeOrigin: true,
                pathRewrite(path) {
                    return path.replace('/api', '');
                }
            }
        )
    )
}
```

##### 		在上述示例中，我们配置了一个代理，将所有以`/api`开头的请求转发到`http://localhost:8000`目标服务器地		址。你可以根据实际情况进行调整，修改`target`字段以及其他配置选项。

##### 		3.  在axios方法中修改URL地址：

```javascript
//   send the request to the http server，use axios to send the GET request
        // 关于这里的跨域问题：gitHub提供的API后端服务器已经通过CORS进行处理了
        axios.get(`http://localhost:3000/api/search/users?q=${keyword}`) // 使用拼接模版字符串时，使用反引号 ``， 而不是单引号‘’
            .then(
                response => { ...}
                )

```



#### 	组件之间的通信：使用最基础的方式

##### 		父传子：使用props

##### 		子传父：父传递一个方法给子，子调用此方法并将参数传入





#### 3. 03_src_fetch_api 中：

#### 	获取数据：使用window内置的fetch对象+public API （没有跨域的问题，服务端已经作了cors的配置）

https://api.github.com/search/users?q=XXXX

#### 	使用asynch函数和 await关键字，实现 异步操作的关注分离

```javascript
search = async () => {
        // 连续结构赋值，同时还能给变量重新命名
        const { keywordElement: { value: keyword } } = this

        // 发布消息
        PubSub.publish('subName', { isFirst: false, isLoading: true })
    
   		 // 发送网络请求
        try {
            const response = await fetch(`https://api.github.com/search/users?q=${keyword}`);
            const data = await response.json();
            console.log('联系服务器成功了', data);
            // 发布消息
            PubSub.publish('subName', { users: data.items, isLoading: false })
        }
        catch (error) {
            console.log('获取数据失败了', error)
            // 发布消息
            PubSub.publish('subName', { isLoading: false, err: error.message })
        }
    }
```

#### 	组件之间的通信：使用第三方库pubsub-js，实现消息的订阅和发布模式

##### 		需要数据的组件：订阅消息

```javascript
// 组件一旦加载到页面，就要订阅消息; 使用componentDidMount钩子函数，实现初始化的事情（开启定时器，订阅消息等）
    componentDidMount() {
        this.token = PubSub.subscribe('subName', (_, stateObj) => {
            this.setState(stateObj)
        })

    }
    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }
```

##### 		发送数据的组件：发布消息

```javascript
// 发布消息
        PubSub.publish('subName', { isFirst: false, isLoading: true })
```





#### 4. src 中：

#### 	获取数据：axios库+public API （没有跨域的问题，服务端已经作了cors的配置）

https://api.github.com/search/users?q=XXXX

#### 	组件之间的通信：使用第三方库pubsub-js，实现消息的订阅和发布模式

##### 		需要数据的组件：订阅消息

```javascript
// 组件一旦加载到页面，就要订阅消息; 使用componentDidMount钩子函数，实现初始化的事情（开启定时器，订阅消息等）
    componentDidMount() {
        this.token = PubSub.subscribe('subName', (_, stateObj) => {
            this.setState(stateObj)
        })

    }
    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }
```

##### 		发送数据的组件：发布消息

```javascript
// 发布消息
        PubSub.publish('subName', { isFirst: false, isLoading: true })
```





