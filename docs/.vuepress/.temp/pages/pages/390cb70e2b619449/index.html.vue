<template><div><h1 id="xsrf-防御" tabindex="-1"><a class="header-anchor" href="#xsrf-防御" aria-hidden="true">#</a> XSRF 防御</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>XSRF 又名 <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security#Cross-Site_Request_Forgery_(CSRF)" target="_blank" rel="noopener noreferrer">CSRF</a>，跨站请求伪造，它是前端常见的一种攻击方式，我们先通过一张图来认识它的攻击手段。</p>
<p><img src="https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200105110743.png" alt="xsrf" title="xsrf"></p>
<p>CSRF 的防御手段有很多，比如验证请求的 referer，但是 referer 也是可以伪造的，所以杜绝此类攻击的一种方式是服务器端要求每次请求都包含一个 <code v-pre>token</code>，这个 <code v-pre>token</code> 不在前端生成，而是在我们每次访问站点的时候生成，并通过 <code v-pre>set-cookie</code> 的方式种到客户端，然后客户端发送请求的时候，从 <code v-pre>cookie</code> 中对应的字段读取出 <code v-pre>token</code>，然后添加到请求 <code v-pre>headers</code> 中。这样服务端就可以从请求 <code v-pre>headers</code> 中读取这个 <code v-pre>token</code> 并验证，由于这个 <code v-pre>token</code> 是很难伪造的，所以就能区分这个请求是否是用户正常发起的。</p>
<p>对于我们的 <code v-pre>ts-axios</code> 库，我们要自动把这几件事做了，每次发送请求的时候，从 <code v-pre>cookie</code> 中读取对应的 <code v-pre>token</code> 值，然后添加到请求 <code v-pre>headers</code>中。我们允许用户配置 <code v-pre>xsrfCookieName</code> 和 <code v-pre>xsrfHeaderName</code>，其中 <code v-pre>xsrfCookieName</code> 表示存储 <code v-pre>token</code> 的 <code v-pre>cookie</code> 名称，<code v-pre>xsrfHeaderName</code> 表示请求 <code v-pre>headers</code> 中 <code v-pre>token</code> 对应的 <code v-pre>header</code> 名称。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.get('/more/get',{
  xsrfCookieName: 'XSRF-TOKEN', // default
  xsrfHeaderName: 'X-XSRF-TOKEN' // default
}).then(res =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们提供 <code v-pre>xsrfCookieName</code> 和 <code v-pre>xsrfHeaderName</code> 的默认值，当然用户也可以根据自己的需求在请求中去配置 <code v-pre>xsrfCookieName</code> 和 <code v-pre>xsrfHeaderName</code>。</p>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>先修改 <code v-pre>AxiosRequestConfig</code> 的类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  xsrfCookieName?: string
  xsrfHeaderName?: string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后修改默认配置。</p>
<p><code v-pre>defaults.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const defaults: AxiosRequestConfig = {
  // ...
  xsrfCookieName: 'XSRF-TOKEN',

  xsrfHeaderName: 'X-XSRF-TOKEN',
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们要做三件事：</p>
<ul>
<li>
<p>首先判断如果是配置 <code v-pre>withCredentials</code> 为 <code v-pre>true</code> 或者是同域请求，我们才会请求 <code v-pre>headers</code> 添加 <code v-pre>xsrf</code> 相关的字段。</p>
</li>
<li>
<p>如果判断成功，尝试从 cookie 中读取 <code v-pre>xsrf</code> 的 <code v-pre>token</code> 值。</p>
</li>
<li>
<p>如果能读到，则把它添加到请求 <code v-pre>headers</code> 的 <code v-pre>xsrf</code> 相关字段中。</p>
</li>
</ul>
<p>我们先来实现同域请求的判断。</p>
<p><code v-pre>helpers/url.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>interface URLOrigin {
  protocol: string
  host: string
}


export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol &amp;&amp; parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同域名的判断主要利用了一个技巧，创建一个 a 标签的 DOM，然后设置 <code v-pre>href</code> 属性为我们传入的 <code v-pre>url</code>，然后可以获取该 DOM 的 <code v-pre>protocol</code>、<code v-pre>host</code>。当前页面的 <code v-pre>url</code> 和请求的 <code v-pre>url</code> 都通过这种方式获取，然后对比它们的 <code v-pre>protocol</code> 和 <code v-pre>host</code> 是否相同即可。</p>
<p>接着实现 cookie 的读取。</p>
<p><code v-pre>helpers/cookie.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>cookie</code> 的读取逻辑很简单，利用了正则表达式可以解析到 <code v-pre>name</code> 对应的值。</p>
<p>最后实现完整的逻辑。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const {
  /*...*/
  xsrfCookieName,
  xsrfHeaderName
} = config

if ((withCredentials || isURLSameOrigin(url!)) &amp;&amp; xsrfCookieName){
  const xsrfValue = cookie.read(xsrfCookieName)
  if (xsrfValue) {
    headers[xsrfHeaderName!] = xsrfValue
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>examples/server.js</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在访问页面的时候，服务端通过 <code v-pre>set-cookie</code> 往客户端种了 <code v-pre>key</code> 为 <code v-pre>XSRF-TOKEN</code>，值为 <code v-pre>1234abc</code> 的 <code v-pre>cookie</code>，作为 <code v-pre>xsrf</code> 的 <code v-pre>token</code> 值。</p>
<p>然后我们在前端发送请求的时候，就能从 cookie 中读出 <code v-pre>key</code> 为 <code v-pre>XSRF-TOKEN</code> 的值，然后把它添加到 <code v-pre>key</code> 为 <code v-pre>X-XSRF-TOKEN</code> 的请求 <code v-pre>headers</code> 中。</p>
<p>至此，我们实现了 XSRF 的自动防御的能力，下节课我们来实现 ts-axios 对上传和下载请求的支持。</p>
</div></template>
