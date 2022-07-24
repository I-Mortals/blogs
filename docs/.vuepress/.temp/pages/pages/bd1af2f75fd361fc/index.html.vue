<template><div><h1 id="vue项目使用mock数据的几种方式" tabindex="-1"><a class="header-anchor" href="#vue项目使用mock数据的几种方式" aria-hidden="true">#</a> Vue项目使用mock数据的几种方式</h1>
<p>本文是基于vue/cli 3.0创建的项目进行讲解</p>
<p>首先我们来说一说vue/cli 3.0 与 2.0 的一些不同：</p>
<ol>
<li>3.0 移除了 static 文件目录，新增了 public 目录，这个目录下的静态资源不会经过 webpack 的处理，会被直接拷贝，所以我们能够直接访问到该目录下的资源，静态数据（如json数据、图片等）需要存放在这里。</li>
</ol>
<!-- more -->
<blockquote>
<p>放在<code v-pre>public</code>目录下的静态资源可直接通过(http://localhost:8080/+ 文件名称)来访问，不需要在前面加一个<code v-pre>/public</code>路径</p>
</blockquote>
<ol start="2">
<li>3.0 移除了 config、build 等配置目录，如果需要进行相关配置我们需要在根目录下创建<code v-pre> vue.config.js</code> 进行配置。</li>
</ol>
<h2 id="方式一-使用mockjs插件实现本地mock数据" tabindex="-1"><a class="header-anchor" href="#方式一-使用mockjs插件实现本地mock数据" aria-hidden="true">#</a> 方式一：使用mockjs插件实现本地mock数据</h2>
<ol>
<li>
<p>安装<code v-pre>mockjs</code>插件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>npm i mockjs -D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>在src目录下创建一个<code v-pre>mock</code>文件夹，在<code v-pre>mock</code>文件夹下创建一个<code v-pre>index.js</code>和一个<code v-pre>data</code>文件夹（用于存放项目需要的模拟数据）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>.
├── src
│   ├── mock
│   │   └── data
│   │   │   └──  test.json
│   │   └── index.js 
.   .   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>mock</code>目录下的<code v-pre>index.js</code>示例如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const Mock = require('mockjs')
 
// 格式： Mock.mock( url, 'post'|'get' , 返回的数据)
Mock.mock('/api/test', 'get', require('./data/test.json'))
Mock.mock('/api/test2', 'post', require('./data/test2.json'))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在<code v-pre>main.js</code>入口文件中引入mock数据，不需要时，则注释掉</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>require('./mock') // 引入mock数据，不需要时，则注释掉
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>最后，在vue模板中使用即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>axios.get('/api/test')
.then(function(res){
  console.log(res);
})
.catch(function(err){
  console.log(err);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="方式二-在public文件夹放mock数据-无需使用mockjs插件" tabindex="-1"><a class="header-anchor" href="#方式二-在public文件夹放mock数据-无需使用mockjs插件" aria-hidden="true">#</a> 方式二：在public文件夹放mock数据（无需使用mockjs插件）</h2>
<ol>
<li>
<p>在<code v-pre>public</code>文件夹下创建一个<code v-pre>mock</code>文件夹，用来存放模拟数据的json文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>.
├── public
│   ├── mock
│   │   └── test.json 
.   .   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>放在<code v-pre>public</code>目录下的静态资源可直接通过(http://localhost:8080/ + 文件名称)来访问，不需要在前面加一个<code v-pre>/public</code>路径。</p>
</blockquote>
</li>
<li>
<p>在<code v-pre>vue.config.js</code>里进行路径配置，如下:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module.exports = {
 devServer: {
   proxy: {
     '/api': { // 代理接口
       target: 'http://localhost:8080',
       ws: true, // proxy websockets
       changeOrigin: true, // 是否开启跨域
       pathRewrite: { // 路径重写
         '^/api': '/mock'
       }
     }
   }
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://cli.vuejs.org/zh/config/#devserver-proxy" target="_blank" rel="noopener noreferrer">devServer.proxy官方文档</a></p>
</li>
<li>
<p>最后，在vue模板中使用即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>axios.get('/api/test.json') // 注意这里需要.json后缀
.then(function(res){
  console.log(res);
})
.catch(function(err){
  console.log(err);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<blockquote>
<p>这方式貌似不支持<code v-pre>post</code>请求，有待研究。</p>
</blockquote>
<h2 id="方式三-前端本地启动一个nodejs服务-vue项目向nodejs服务请求mock数据" tabindex="-1"><a class="header-anchor" href="#方式三-前端本地启动一个nodejs服务-vue项目向nodejs服务请求mock数据" aria-hidden="true">#</a> 方式三：前端本地启动一个nodejs服务，vue项目向nodejs服务请求mock数据</h2>
<ol>
<li>
<p>创建一个node项目（为了方便，本例直接在vue项目根目录创建，当然也可以是其它任何地方）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>.
├── 项目根目录
│   └── serve.js
.   .  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>serve.js</code>示例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>const http = require('http')
// url模块用于处理与解析 前端传给后台的URL，适用于get请求（不适用于post请求），详情参见文档
const urlLib = require('url')

http.createServer(function (req, res) {
  const urlObj = urlLib.parse(req.url, true) // 注意：这里的第二个参数一定要设置为：true, query才能解析为对象形式,可以更加方便地获取key:value
  const url = urlObj.pathname
  const get = urlObj.query
  console.log(url)
  // 模拟的mock数据
  const data = {
    &quot;code&quot;: 200,
    &quot;list&quot;: [
        {
            &quot;id&quot;: '0001',
            &quot;name&quot;: &quot;test&quot;
        },
        {
            &quot;id&quot;: '0002',
            &quot;name&quot;: &quot;test2&quot;
        }
    ]
  }

  // console.log(get.user)
  if (url === '/test') { // 接口名
    res.write(JSON.stringify(data))
  }
  res.end()
}).listen(9000)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>启动node服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>node serve.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>配置<code v-pre>vue.config.js</code>的<code v-pre>proxy</code>，解决跨域</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module.exports = {
 devServer: {
   proxy: {
     '/api': {
       target: 'http://localhost:9000',
       ws: true, // proxy websockets
       changeOrigin: true, // 是否开启跨域
       pathRewrite: { // 路径重写
         '^/api': ''
       }
     }
   }
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>最后，在vue模板中使用即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>axios.get('/api/test')
.then(function(res){
  console.log(res);
})
.catch(function(err){
  console.log(err);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>方式二目前来看只支持get方式请求，对于post请求还有待研究。方式三虽然也是一种实现方式，但实现起来比较麻烦。个人建议使用方式一，灵活、方便。</p>
<h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章" aria-hidden="true">#</a> 相关文章</h2>
<p><a href="https://xugaoyi.com/pages/5d463fbdb172d43b/" target="_blank" rel="noopener noreferrer">《Vue CLi3 修改webpack配置》</a></p>
</div></template>
