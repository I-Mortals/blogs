<template><div><h1 id="编写基础请求代码" tabindex="-1"><a class="header-anchor" href="#编写基础请求代码" aria-hidden="true">#</a> 编写基础请求代码</h1>
<p>我们这节课开始编写 <code v-pre>ts-axios</code> 库，我们的目标是实现简单的发送请求功能，即客户端通过 <code v-pre>XMLHttpRequest</code> 对象把请求发送到 server 端，server 端能收到请求并响应即可。</p>
<p>我们实现 <code v-pre>axios</code> 最基本的操作，通过传入一个对象发送请求，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建入口文件" tabindex="-1"><a class="header-anchor" href="#创建入口文件" aria-hidden="true">#</a> 创建入口文件</h2>
<p>我们删除 <code v-pre>src</code> 目录下的文件，先创建一个 <code v-pre>index.ts</code> 文件，作为整个库的入口文件，然后我们先定义一个 <code v-pre>axios</code> 方法，并把它导出，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>
function axios(config) {

}

export default axios

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里 TypeScript 编译器会检查到错误，分别是 <code v-pre>config</code> 的声明上有隐含的 <code v-pre>any</code> 报错，以及代码块为空。代码块为空我们比较好理解，第一个错误的原因是因为我们给 TypeScript 编译配置的 <code v-pre>strict</code> 设置为 <code v-pre>true</code> 导致。</p>
<h3 id="编译配置文件-tsconfig-json" tabindex="-1"><a class="header-anchor" href="#编译配置文件-tsconfig-json" aria-hidden="true">#</a> 编译配置文件 tsconfig.json</h3>
<p><code v-pre>tsconfig.json</code> 文件中指定了用来编译这个项目的根文件和编译选项，关于它的具体学习，我希望同学们去<a href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html" target="_blank" rel="noopener noreferrer">官网</a>系统学习一下</p>
<p>我们在之前讲 TypeScript 的基础时，会运行 <code v-pre>tsc</code> 命令去编译 TypeScript 文件，编译器会从当前目录开始去查找 <code v-pre>tsconfig.json</code> 文件，作为编译时的一些编译选项。</p>
<p>我们来看一下 tsconfig.json 文件，它包含了很多编译时的配置，其中我们把 <code v-pre>strict</code> 设置为 <code v-pre>true</code>，它相当于启用所有严格类型的检查选项。启用 <code v-pre>--strict</code> 相当于启用 <code v-pre>--noImplicitAny</code>,<code v-pre>--noImplicitThis</code>,<code v-pre>--alwaysStrict</code>，<code v-pre>--strictNullChecks</code> 和 <code v-pre>--strictFunctionTypes</code> 和 <code v-pre>--strictPropertyInitialization</code>。</p>
<p>我们讲 TypeScript 的基础时提到了 <code v-pre>--strictNullChecks</code>，其它的编译配置我建议同学们都去查看它的<a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="_blank" rel="noopener noreferrer">官网文档</a>，把它当做手册去查阅即可。</p>
<h3 id="定义-axiosrequestconfig-接口类型" tabindex="-1"><a class="header-anchor" href="#定义-axiosrequestconfig-接口类型" aria-hidden="true">#</a> 定义 AxiosRequestConfig 接口类型</h3>
<p>接下来，我们需要给 <code v-pre>config</code> 参数定义一种接口类型。我们创建一个 <code v-pre>types</code> 目录，在下面创建一个 <code v-pre>index.ts</code> 文件，作为我们项目中公用的类型定义文件。</p>
<p>接下来我们来定义 <code v-pre>AxiosRequestConfig</code> 接口类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  url: string
  method?: string
  data?: any
  params?: any
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code v-pre>url</code> 为请求的地址，必选属性；而其余属性都是可选属性。<code v-pre>method</code> 是请求的 HTTP 方法；<code v-pre>data</code> 是 <code v-pre>post</code>、<code v-pre>patch</code> 等类型请求的数据，放到 <code v-pre>request body</code> 中的；<code v-pre>params</code> 是 <code v-pre>get</code>、<code v-pre>head</code> 等类型请求的数据，拼接到 <code v-pre>url</code> 的 <code v-pre>query string</code> 中的。</p>
<p>为了让 <code v-pre>method</code> 只能传入合法的字符串，我们定义一种字符串字面量类型 <code v-pre>Method</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export type Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们把 <code v-pre>AxiosRequestConfig</code> 中的 <code v-pre>method</code> 属性类型改成这种字符串字面量类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后回到 <code v-pre>index.ts</code>，我们引入 <code v-pre>AxiosRequestConfig</code> 类型，作为 <code v-pre>config</code> 的参数类型，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { AxiosRequestConfig } from './types'

function axios(config: AxiosRequestConfig) {
}

export default axios
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么接下来，我们就来实现这个函数体内部的逻辑——发送请求。</p>
<h2 id="利用-xmlhttprequest-发送请求" tabindex="-1"><a class="header-anchor" href="#利用-xmlhttprequest-发送请求" aria-hidden="true">#</a> 利用 XMLHttpRequest 发送请求</h2>
<p>我们并不想在 <code v-pre>index.ts</code> 中去实现发送请求的逻辑，我们利用模块化的编程思想，把这个功能拆分到一个单独的模块中。</p>
<p>于是我们在 <code v-pre>src</code> 目录下创建一个 <code v-pre>xhr.ts</code> 文件，我们导出一个 <code v-pre>xhr</code> 方法，它接受一个 <code v-pre>config</code> 参数，类型也是 <code v-pre>AxiosRequestConfig</code> 类型。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们来实现这个函数体逻辑，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先通过解构赋值的语法从 <code v-pre>config</code> 中拿到对应的属性值赋值给我的变量，并且还定义了一些默认值，因为在 <code v-pre>AxiosRequestConfig</code> 接口的定义中，有些属性是可选的。</p>
<p>接着我们实例化了一个 <code v-pre>XMLHttpRequest</code> 对象，然后调用了它的 <code v-pre>open</code> 方法，传入了对应的一些参数，最后调用 <code v-pre>send</code> 方法发送请求。</p>
<p>对于 <code v-pre>XMLHttpRequest</code> 的学习，我希望同学们去 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" target="_blank" rel="noopener noreferrer">mdn</a> 上系统地学习一下它的一些属性和方法，当做参考资料，因为在后续的开发中我们可能会反复查阅这些文档资料。</p>
<h3 id="引入-xhr-模块" tabindex="-1"><a class="header-anchor" href="#引入-xhr-模块" aria-hidden="true">#</a> 引入 xhr 模块</h3>
<p>编写好了 <code v-pre>xhr</code> 模块，我们就需要在 <code v-pre>index.ts</code> 中去引入这个模块，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

export default axios
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么至此，我们基本的发送请求代码就编写完毕了，接下来我们来写一个小 demo，来使用我们编写的 axios 库去发送请求。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>我们会利用 Node.js 的 <a href="http://expressjs.com/" target="_blank" rel="noopener noreferrer"><code v-pre>express</code></a> 库去运行我们的 demo，利用 <a href="https://webpack.js.org/" target="_blank" rel="noopener noreferrer"><code v-pre>webpack</code></a> 来作为 demo 的构建工具。</p>
<h3 id="依赖安装" tabindex="-1"><a class="header-anchor" href="#依赖安装" aria-hidden="true">#</a> 依赖安装</h3>
<p>我们先来安装一些编写 demo 需要的依赖包，如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&quot;webpack&quot;: &quot;^4.28.4&quot;,
&quot;webpack-dev-middleware&quot;: &quot;^3.5.0&quot;,
&quot;webpack-hot-middleware&quot;: &quot;^2.24.3&quot;,
&quot;ts-loader&quot;: &quot;^5.3.3&quot;,
&quot;tslint-loader&quot;: &quot;^3.5.4&quot;,
&quot;express&quot;: &quot;^4.16.4&quot;,
&quot;body-parser&quot;: &quot;^1.18.3&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code v-pre>webpack</code> 是打包构建工具，<code v-pre>webpack-dev-middleware</code> 和 <code v-pre>webpack-hot-middleware</code> 是 2 个 <code v-pre>express</code> 的 <code v-pre>webpack</code> 中间件，<code v-pre>ts-loader</code> 和 <code v-pre>tslint-loader</code> 是 <code v-pre>webpack</code> 需要的 TypeScript 相关 loader，<code v-pre>express</code> 是 Node.js 的服务端框架，<code v-pre>body-parser</code> 是 <code v-pre>express</code> 的一个中间件，解析 <code v-pre>body</code> 数据用的。</p>
<h3 id="编写-webpack-配置文件" tabindex="-1"><a class="header-anchor" href="#编写-webpack-配置文件" aria-hidden="true">#</a> 编写 webpack 配置文件</h3>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>webpack</code> 配置文件 <code v-pre>webpack.config.js</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) =&gt; {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() &amp;&amp; fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写-server-文件" tabindex="-1"><a class="header-anchor" href="#编写-server-文件" aria-hidden="true">#</a> 编写 server 文件</h3>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>server.js</code> 文件：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () =&gt; {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写-demo-代码" tabindex="-1"><a class="header-anchor" href="#编写-demo-代码" aria-hidden="true">#</a> 编写 demo 代码</h3>
<p>首先在 <code v-pre>examples</code> 目录下创建 <code v-pre>index.html</code> 和 <code v-pre>global.css</code>，作为所有 <code v-pre>demo</code> 的入口文件已全局样式文件。</p>
<p><code v-pre>index.html</code>：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;ts-axios examples&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;/global.css&quot;&gt;
  &lt;/head&gt;
  &lt;body style=&quot;padding: 0 20px&quot;&gt;
    &lt;h1&gt;ts-axios examples&lt;/h1&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href=&quot;simple&quot;&gt;Simple&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>global.css</code>：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>html, body {
  font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;;
  color: #2c3e50;
}

ul {
  line-height: 1.5em;
  padding-left: 1.5em;
}

a {
  color: #7f8c8d;
  text-decoration: none;
}

a:hover {
  color: #4fc08d;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在 <code v-pre>examples</code> 目录下创建 <code v-pre>simple</code> 目录，作为本章节的 demo 目录，在该目录下再创建 <code v-pre>index.html</code> 和 <code v-pre>app.ts</code> 文件</p>
<p><code v-pre>index.html</code> 文件如下:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Simple example&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src=&quot;/__build__/simple.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>app.ts</code> 文件如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为我们这里通过 <code v-pre>axios</code> 发送了请求，那么我们的 server 端要实现对应的路由接口，我们来修改 <code v-pre>server.js</code>，添加如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

app.use(router)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行-demo" tabindex="-1"><a class="header-anchor" href="#运行-demo" aria-hidden="true">#</a> 运行 demo</h3>
<p>接着我们在 <code v-pre>package.json</code> 中去新增一个 <code v-pre>npm script</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&quot;dev&quot;: &quot;node examples/server.js&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们去控制台执行命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm run dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>相当于执行了 <code v-pre>node examples/server.js</code>，会开启我们的 server。</p>
<p>接着我们打开 chrome 浏览器，访问 <code v-pre>http://localhost:8080/</code> 即可访问我们的 demo 了，我们点到 <code v-pre>Simple</code> 目录下，通过开发者工具的 network 部分我们可以看到成功发送到了一条请求，并在 response 中看到了服务端返回的数据。</p>
<p>至此，我们就实现了一个简单的请求发送，并编写了相关的 demo。但是现在存在一些问题：我们传入的 <code v-pre>params</code> 数据并没有用，也没有拼接到 <code v-pre>url</code> 上；我们对 request body 的数据格式、请求头 headers 也没有做处理；另外我们虽然从网络层面收到了响应的数据，但是我们代码层面也并没有对响应的数据做处理。那么下面一章，我们就来解决这些问题。</p>
</div></template>
