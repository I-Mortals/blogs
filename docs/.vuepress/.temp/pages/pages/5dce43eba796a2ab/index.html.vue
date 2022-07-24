<template><div><h1 id="withcredentials" tabindex="-1"><a class="header-anchor" href="#withcredentials" aria-hidden="true">#</a> withCredentials</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>有些时候我们会发一些跨域请求，比如 <code v-pre>http://domain-a.com</code> 站点发送一个 <code v-pre>http://api.domain-b.com/get</code> 的请求，默认情况下，浏览器会根据同源策略限制这种跨域请求，但是可以通过 <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank" rel="noopener noreferrer">CORS</a> 技术解决跨域问题。</p>
<p>在同域的情况下，我们发送请求会默认携带当前域下的 cookie，但是在跨域的情况下，默认是不会携带请求域下的 cookie 的，比如 <code v-pre>http://domain-a.com</code> 站点发送一个 <code v-pre>http://api.domain-b.com/get</code> 的请求，默认是不会携带 <code v-pre>api.domain-b.com</code> 域下的 cookie，如果我们想携带（很多情况下是需要的），只需要设置请求的 <code v-pre>xhr</code> 对象的 <code v-pre>withCredentials</code> 为 true 即可。</p>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>先修改 <code v-pre>AxiosRequestConfig</code> 的类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  withCredentials?: boolean
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改请求发送前的逻辑。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const { /*...*/ withCredentials } = config

if (withCredentials) {
  request.withCredentials = true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>more</code> 目录，在 <code v-pre>cancel</code> 目录下创建 <code v-pre>index.html</code>:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;More example&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src=&quot;/__build__/more.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着创建 <code v-pre>app.ts</code> 作为入口文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../../src/index'

document.cookie = 'a=b'

axios.get('/more/get').then(res =&gt; {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', { }, {
  withCredentials: true
}).then(res =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次我们除了给 <code v-pre>server.js</code> 去配置了接口路由，还创建了 <code v-pre>server2.js</code>，起了一个跨域的服务。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

router.post('/more/server2', function(req, res) {
  res.set(cors)
  res.json(req.cookies)
})

router.options('/more/server2', function(req, res) {
  res.set(cors)
  res.end()
})

app.use(router)

const port = 8088
module.exports = app.listen(port)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里需要安装一下 <code v-pre>cookie-parser</code> 插件，用于请求发送的 cookie。</p>
<p>通过 demo 演示我们可以发现，对于同域请求，会携带 cookie，而对于跨域请求，只有我们配置了 <code v-pre>withCredentials</code> 为 true，才会携带 cookie。</p>
<p>至此我们的 <code v-pre>withCredentials</code> feature 开发完毕，下一节课我们来实现 axios 对 XSRF
的防御功能。</p>
</div></template>
