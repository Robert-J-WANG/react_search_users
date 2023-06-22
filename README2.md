# 第4章：React ajax

## 4.1. 理解

### 4.1.1. 前置说明

#### \1.   React本身只关注于界面, 并不包含发送ajax请求的代码

#### \2.   前端应用需要通过ajax请求与后台进行交互(json数据)

#### \3.   react应用中需要集成第三方ajax库(或自己封装)

### 4.1.2. 常用的ajax请求库

#### \1.   jQuery: 比较重, 如果需要另外引入不建议使用

#### \2.   axios: 轻量级, 建议使用

##### 		\1)   封装XmlHttpRequest对象的ajax

##### 		\2)    promise风格

##### 		\3)   可以用在浏览器端和node服务器端

## 4.2. axios

### 4.2.1. 文档

#### https://github.com/axios/axios

### 4.2.2. 相关API

#### \1)   GET请求

```javascript
getdata = () => {
    axios.get('/user?ID=12345')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('/user', {
      params: {
        ID: 12345
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });  
    
    
    // 在你的 axios.get 请求中，使用反引号（backtick） `` 来定义字符串模板，以便正确地将 keyword 变量插入到 URL 中, 比如 
    axios.get(`https://api.github.com/search/users?q=${keyword}`)
            .then(
                response => { console.log('successful', response.data) },
                err => { console.log('failed', err) }
            )
```

#### \2)   POST请求

```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
```

## 4.3. 案例—github用户搜索

### 4.3.1. 效果

​                               

#### 请求地址: https://api.github.com/search/users?q=xxxxxx

## 4.4. 消息订阅-发布机制

### \1.   工具库: PubSubJS

### \2.   下载: npm install pubsub-js --save

### \3.   使用: 

#### 		\1)   import PubSub from 'pubsub-js' //引入

#### 		\2)   PubSub.subscribe('delete', function(data){ }); //订阅

#### 		\3)   PubSub.publish('delete', data) //发布消息

## 4.5. 扩展：Fetch

### 4.5.1. 文档

#### \1.    https://github.github.io/fetch/

#### \2.    https://segmentfault.com/a/1190000003810652

### 4.5.2. 特点

#### \1.   fetch: 原生函数，不再使用XmlHttpRequest对象提交ajax请求

#### \2.   老版本浏览器可能不支持

### 4.5.3. 相关API

#### \1)   GET请求

 ```javascript
 fetch(url)
     .then(function (response) {
       return response.json()
     })
     .then(function (data) {
       console.log(data)
     })
     .catch(function (e) {
       console.log(e)
     });
 ```

#### \2)   POST请求

  ```javascript
  fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(function (data) {
        console.log(data)
      })
      .catch(function (e) {
        console.log(e)
      })
  ```

## 4.6. 总结

### 4.6.1. 解决跨域问题的2种方式：

#### \1)  跨域代理(适用于本地开发阶段，代码的测试)

##### 		概述：

##### 		跨域代理是在前端应用和后端服务器之间引入一个代理服务器，用于转发请求并解决跨域问题。前端应用将请求发送给代理服务器，然后代理服务器将请求转发到目标服务器，并将响应返回给前端应用。这样，前端应用与代理服务器之间的跨域问题被解决，因为它们在同一个域中。代理服务器在后端处理跨域问题，前端应用对此无感知。 

##### 配置过程1：配置1个服务器端口

直接在package.json中添加如下配置("http://localhost:8000/students")是服务器端口

```javascript
  ...
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  ...
  "proxy": "http://localhost:8000"
}
```

然后再获取数据的方法中修改URL地址为本地3000端口'http://localhost:3000/students'

```javascript
getDate = () => {
    axios.get('http://localhost:3000/students')
      .then(
        response => {
          console.log('成功了', response.data);
        },
        error => {
          console.log('失败了', error);
        }
      )
```



##### 		配置过程2：配置多个服务器端口

##### 		在React应用中进行跨域代理配置可以通过使用`http-proxy-middleware`库来实现。下面是一般的跨域代理配置步骤：

1. ##### 首先，安装`http-proxy-middleware`库。在项目根目录下运行以下命令：

```bash
bashCopy code
npm install http-proxy-middleware --save
```

2. ##### 在项目的根目录下创建一个新的文件，例如`setupProxy.js`。

3. ##### 在`setupProxy.js`文件中，使用`createProxyMiddleware`函数来配置你的代理。以下是一个示例：

```javascript
javascriptCopy code
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.example.com',  // 你要代理的目标服务器地址
      changeOrigin: true,
    })
  );
};
```

##### 在上述示例中，我们配置了一个代理，将所有以`/api`开头的请求转发到`http://api.example.com`目标服务器地址。你可以根据实际情况进行调整，修改`target`字段以及其他配置选项。

4. ##### 确保你的React应用正在运行中，然后在终端中运行应用，代理配置将自动生效。

##### 注意：根据你的开发环境和项目配置，代理文件名可能需要与配置工具（如`react-scripts`）的约定相匹配。例如，如果你使用的是`react-scripts`，则需要将代理文件命名为`src/setupProxy.js`。

##### 通过以上步骤，你可以设置跨域代理，将特定请求转发到目标服务器，以解决跨域问题并实现数据获取。



#### \2)  CORS（跨域资源共享）（生产环境中常用）

##### 		概述：

##### 		CORS是一种由浏览器实现的机制，用于在前端应用中直接与目标服务器进行跨域通信。通过在目标服务器的响应头部中添加特定的CORS头部信息，服务器告知浏览器是否允许来自不同域的前端应用访问它的资源。浏览器根据CORS头部的信息来决定是否允许前端应用获取响应。前端应用需要在发送请求时遵循CORS机制。



##### 		配置过程：

在React项目中设置CORS（跨域资源共享），通常是通过服务器配置而不是在React应用中进行设置。CORS是一种机制，用于在浏览器中处理跨域请求。以下是在常见的服务器环境中如何设置CORS。

**Express.js服务器（Node.js）：**

如果你的React应用与Node.js后端使用Express.js框架，则可以通过添加CORS中间件来设置CORS。

1. 首先，安装`cors`模块。可以使用npm或yarn执行以下命令：

   ```bash
   npm install cors
   ```

   或者

   ```bash
   yarn add cors
   ```

2. 在Express.js服务器的主文件中（通常是`app.js`或`index.js`），添加以下代码：

   ```javascript
   const express = require('express');
   const cors = require('cors');
   
   const app = express();
   
   // 允许所有来源的请求
   app.use(cors());
   
   // 其他中间件和路由设置...
   
   // 启动服务器
   app.listen(3000, () => {
     console.log('Server is running on port 3000');
   });
   ```

   以上代码将允许来自任何来源的请求访问你的API。如果你希望限制访问来源，可以在`cors()`函数中传递一些选项。

**Django服务器（Python）：**

如果你的React应用与Python后端使用Django框架，则可以通过修改Django的设置来设置CORS。

1. 首先，安装`django-cors-headers`包。可以使用pip执行以下命令：

   ```bash
   pip install django-cors-headers
   ```

2. 在Django项目的设置文件（`settings.py`）中，找到`MIDDLEWARE`设置，并将以下中间件添加到列表中：

   ```python
   MIDDLEWARE = [
       # 其他中间件...
       'corsheaders.middleware.CorsMiddleware',
       # 其他中间件...
   ]
   ```

3. 在设置文件中，添加以下CORS相关设置：

   ```python
   CORS_ORIGIN_ALLOW_ALL = True
   ```

   以上设置将允许来自任何来源的请求访问你的API。如果你希望限制访问来源，可以按照文档[https://github.com/adamchainz/django-cors-headers#configuration](https://github.com/adamchainz/django-cors-headers#configuration)进行设置。

以上是在一些常见的服务器环境中设置CORS的示例。根据你的后端服务器类型和框架，具体的设置方法可能会有所不同。请根据你的服务器环境和需求进行相应的调整。

#### 4.6.2. 获取服务器数据的几种方式：

#### 总结起来，以下是几种常见的在React中获取服务器数据的方式：

1. #### 使用Fetch API：使用现代浏览器内置的Fetch API进行数据获取，支持Promise和异步操作。

    ```javascript
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => {
        // 处理获取到的数据
        console.log(data);
      })
      .catch(error => {
        // 处理错误
        console.error('Error:', error);
      });
    ```

    

2. #### 使用Axios库：使用第三方库Axios进行数据获取，提供了简洁易用的接口，支持Promise和拦截器等功能。

    ##### 首先，你需要安装Axios库：

    ```bash
    bashCopy code
    npm install axios
    ```

    ##### 然后在你的React组件中使用Axios：

    ```javascript
    javascriptCopy code
    import axios from 'axios';
    
    axios.get('https://api.example.com/data')
      .then(response => {
        // 处理获取到的数据
        console.log(response.data);
      })
      .catch(error => {
        // 处理错误
        console.error('Error:', error);
      });
    ```

3. #### 使用async/await和fetch：结合使用async/await和Fetch API，以简洁的语法进行数据获取，也支持Promise和异步操作。

    ```javascript
    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        // 处理获取到的数据
        console.log(data);
      } catch (error) {
        // 处理错误
        console.error('Error:', error);
      }
    }
    
    fetchData();
    
    ```

    

4. #### 使用AJAX（XMLHttpRequest或第三方库）：使用原生的XMLHttpRequest对象或第三方库如jQuery进行数据获取，兼容性较好，支持异步通信。

    ##### 以下是使用原生XMLHttpRequest对象的示例：

    ```javascript
    javascriptCopy code
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.example.com/data', true);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        // 处理获取到的数据
        console.log(responseData);
      } else {
        // 处理错误
        console.error('Error:', xhr.statusText);
      }
    };
    
    xhr.onerror = function() {
      // 处理错误
      console.error('Request failed');
    };
    
    xhr.send();
    ```

    ##### 使用第三方库如jQuery的示例：

    ##### 首先，确保你已经引入了jQuery库。然后，在你的React组件中使用以下代码：

    ```javascript
    javascriptCopy code
    $.ajax({
      url: 'https://api.example.com/data',
      method: 'GET',
      success: function(data) {
        // 处理获取到的数据
        console.log(data);
      },
      error: function(xhr, status, error) {
        // 处理错误
        console.error('Error:', error);
      }
    });
    ```

#### 这些方式都可以实现从服务器获取数据的目的，每种方式都有其优势和适用场景。选择最合适的方式取决于个人偏好、项目需求以及所涉及的技术栈。

