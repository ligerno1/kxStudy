# Express

基于 Node.js 平台，快速、开放、极简的 web 开发框架。

```
npm install express --save
```

# 一、特色

## 1、Web 应用

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

## 2、API

丰富的 HTTP 快捷方法和任意排列组合的 Connect 中间件，让你创建健壮、友好的 API 变得既快速又简单。

## 3、性能

Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能。


# 二、安装

首先假定你已经安装了 Node.js，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录。

```
mkdir myapp
cd myapp
```

通过 npm init 命令为你的应用创建一个 package.json 文件。 

```
npm init
```

此命令将要求你输入几个参数，例如此应用的名称和版本。 你可以直接按“回车”键接受默认设置即可，下面这个除外：

```
entry point: (index.js)
```

键入 app.js 或者你所希望的名称，这是当前应用的入口文件。如果你希望采用默认的 index.js 文件名，只需按“回车”键即可。

接下来安装 Express 并将其保存到依赖列表中：

```
npm install express --save
```

如果只是临时安装 Express，不想将它添加到依赖列表中，只需略去 --save 参数即可：

```
npm install express
```

- 安装 Node 模块时，如果指定了 --save 参数，那么此模块将被添加到 package.json 文件中 dependencies 依赖列表中。 然后通过 npm install 命令即可自动安装依赖列表中所列出的所有模块。


# 三、Hello world 实例

接下来，我们一起创建一个基本的 Express 应用。

注意：这里所创建是一个最最简单的 Express 应用，并且仅仅只有一个文件 — 和通过 Express 应用生成器 所创建的应用完全不一样，Express 应用生成器所创建的应用框架包含多 JavaScript 文件、Jade 模板和针对不同用途的子目录。

进入 myapp 目录，创建一个名为 app.js 的文件，然后将下列代码复制进去：

```js
var express = require('express');
var app = express();

app.get('./', (req, res) => {
  res.send('Hello World!')
});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})

```

上面的代码启动一个服务并监听从 3000 端口进入的所有连接请求。他将对所有 (/) URL 或 路由 返回 “Hello World!” 字符串。对于其他所有路径全部返回 404 Not Found。

- req (请求) 和 res (响应) 与 Node 提供的对象完全一致，因此，你可以调用 req.pipe()、req.on('data', callback) 以及任何 Node 提供的方法。

通过如下命令启动此应用：

```
node app.js
```

然后在浏览器中打开 http://localhost:3000/ 并查看输出结果。


# 四、路由

路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成，它的结构如下： app.METHOD(path, [callback...], callback)， app 是 express 对象的一个实例， METHOD 是一个 HTTP 请求方法， path 是服务器上的路径， callback 是当路由匹配时要执行的函数。

下面是一个基本的路由示例：

```js
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
```

## 1、路由方法

路由方法源于 HTTP 请求方法，和 express 实例相关联。

下面这个例子展示了为应用跟路径定义的 GET 和 POST 请求：

```js
// GET method route
// 对网站首页的访问返回 'Hello World!' 字样

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 网站首页接受 POST 请求
app.post('/', (req, res) => {
  res.send('Got a POST request')
})

// /user 节点接受 PUT 请求
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})

// /user 节点接受 DELETE 请求
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Express 定义了如下和 HTTP 请求对应的路由方法： get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect。

- 有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如： app['m-search']('/', function ...

app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next(); // pass control to the next handler
})
```

## 2、路由路径

路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

Express 使用 path-to-regexp 匹配路由路径，请参考文档查阅所有定义路由路径的方法。 Express Route Tester 是测试基本 Express 路径的好工具，但不支持模式匹配。

- 查询字符串不是路由路径的一部分。

使用字符串的路由路径示例：

```js
// 匹配根路径的请求
app.get('/', function (req, res) {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
```

使用字符串模式的路由路径示例：

```js
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
```

- 字符 ?、+、* 和 () 是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。

使用正则表达式的路由路径示例：

```js
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonflyman等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

## 3、路由句柄

可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别是这些回调函数有可能调用 next('route') 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合，如下所示.

使用一个回调函数处理路由：

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!');
});
```

使用多个回调函数处理路由（记得指定 next 对象）：

```js
app.get('./example/b', (req, res, next) => {
  console.log('response will be sent by the next function ...');
  next();
}, (req, res) => {
  res.send('Hello from B!');
});
```

使用回调函数数组处理路由：

```js
var cb0 = (req, res, next) => {
  console.log('CB0')
  next()
}

var cb1 = (req, res, next) => {
  console.log('CB1')
  next()
}

var cb2 = (req, res) => {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

混合使用函数和函数数组处理路由：

```js
var cb0 = (req, res, next) => {
  console.log('CB0')
  next()
}

var cb1 = (req, res, next) => {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})
```

## 4、响应方法

下表中响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

|方法|描述|
|:---|:---|
|res.download()|提示下载文件。|
|res.end()|终结响应处理流程。|
|res.json()|发送一个JSON格式的响应。|
|res.redirect()|重定向请求。|
|res.render()|渲染视图模板。|
|res.send()|发送各种类型的响应。|
|res.sendFile|以八位字节流的形式发送文件。|
|res.sendStatus()|设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。|


## 5、app.route()

可以使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

下面这个示例程序使用 app.route() 定义了链式路由句柄。

```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });
```

## 6、express.Router

可使用 express.Router 类创建模块化、可挂载的路由句柄。Router实例是一个完整的中间件和路由系统，因此常称为一个“mini-app”。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

在app目录下创建名为birds.js的文件，内容如下：

```js
var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// 定义网站主页的路由
router.get('/', (req, res) => {
  res.send('Birds home page');
});

// 定义 about 页面的路由
router.get('/about', (req, res) => {
  res.send('About birds');
});

module.exports = router;
```

然后在应用中加载路由模块：

```js
var birds = require('./birds')

...

app.use('./birds', birds)
```

应用即可处理发自 /birds 和 /birds/about 的请求，并且调用为该路由指定的 timeLog 中间件。


# 五、利用 Express 托管静态文件

通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript文件等。

将静态资源文件所在的目录作为参数传递给express.static中间件就可以提供静态资源文件的访问了。例如，假设在public目录放置了图片、CSS、JavaScript文件，你就可以：

```js
app.use(express.static('public'))
```

现在，public 目录下面的文件就可以访问了。

```js
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

- 所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。

如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

```js
app.use('/static', express.static('public'))
```

现在，你就可以通过带有 '/static' 前缀的地址来访问 public 目录下面的文件了。

```
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

