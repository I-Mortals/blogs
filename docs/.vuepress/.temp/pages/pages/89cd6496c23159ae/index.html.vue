<template><div><h1 id="http-授权" tabindex="-1"><a class="header-anchor" href="#http-授权" aria-hidden="true">#</a> HTTP 授权</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>HTTP 协议中的 <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization" target="_blank" rel="noopener noreferrer">Authorization</a> 请求 header 会包含服务器用于验证用户代理身份的凭证，通常会在服务器返回 401 Unauthorized 状态码以及 WWW-Authenticate 消息头之后在后续请求中发送此消息头。</p>
<p>axios 库也允许你在请求配置中配置 <code v-pre>auth</code> 属性，<code v-pre>auth</code> 是一个对象结构，包含 <code v-pre>username</code> 和 <code v-pre>password</code> 2 个属性。一旦用户在请求的时候配置这俩属性，我们就会自动往 HTTP 的 请求 header 中添加 <code v-pre>Authorization</code> 属性，它的值为 <code v-pre>Basic 加密串</code>。
这里的加密串是 <code v-pre>username:password</code> base64 加密后的结果。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>首先修改一下类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  auth?: AxiosBasicCredentials
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着修改合并规则，因为 auth 也是一个对象格式，所以它的合并规则是 <code v-pre>deepMergeStrat</code>。</p>
<p><code v-pre>core/mergeConfig.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const stratKeysDeepMerge = ['headers', 'auth']
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后修改发送请求前的逻辑。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const {
  /*...*/
  auth
} = config

if (auth) {
  headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，我们在 <code v-pre>server.js</code> 中对于这个路由接口写了一段小逻辑：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>router.post('/more/post', function(req, res) {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  if (type === 'Basic' &amp;&amp; username === 'Yee' &amp;&amp; password === '123456') {
    res.json(req.body)
  } else {
    res.end('UnAuthorization')
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，这里我们需要安装第三方库 <code v-pre>atob</code> 实现 base64 串的解码。</p>
<p>至此，<code v-pre>ts-axios</code> 支持了 HTTP 授权功能，用户可以通过配置 auth 对象实现自动在请求 header 中添加 <code v-pre>Authorization</code> 属性。下一节课我们来实现自定义合法状态码功能。</p>
</div></template>
