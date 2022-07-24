<template><div><h1 id="错误处理" tabindex="-1"><a class="header-anchor" href="#错误处理" aria-hidden="true">#</a> 错误处理</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>在上一章节，我们实现了 <code v-pre>ts-axios</code> 的基础功能，但目前为止我们都是处理了正常接收请求的逻辑，并没有考虑到任何错误情况的处理，这对于一个程序的健壮性而言是远不够的，因此我们这一章需要对 AJAX 各种错误情况做处理。</p>
<p>并且我们希望程序也能捕获到这些错误，做进一步的处理。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios({
  method: 'get',
  url: '/error/get'
}).then((res) =&gt; {
  console.log(res)
}).catch((e) =&gt; {
  console.log(e)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在请求的过程中发生任何错误，我们都可以在 <code v-pre>reject</code> 回调函数中捕获到。</p>
<p>我们把错误分成了几类，接下来我们就来分别处理这些错误情况。</p>
<h2 id="处理网络异常错误" tabindex="-1"><a class="header-anchor" href="#处理网络异常错误" aria-hidden="true">#</a> 处理网络异常错误</h2>
<p>当网络出现异常（比如不通）的时候发送请求会触发 <code v-pre>XMLHttpRequest</code> 对象实例的 <code v-pre>error</code> 事件，于是我们可以在 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onerror" target="_blank" rel="noopener noreferrer"><code v-pre>onerror</code></a> 的事件回调函数中捕获此类错误。</p>
<p>我们在 <code v-pre>xhr</code> 函数中添加如下代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>request.onerror = function handleError() {
  reject(new Error('Network Error'))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="处理超时错误" tabindex="-1"><a class="header-anchor" href="#处理超时错误" aria-hidden="true">#</a> 处理超时错误</h2>
<p>我们可以设置某个请求的超时时间 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout" target="_blank" rel="noopener noreferrer"><code v-pre>timeout</code></a>，也就是当请求发送后超过某个时间后仍然没收到响应，则请求自动终止，并触发 <code v-pre>timeout</code> 事件。</p>
<p>请求默认的超时时间是 0，即永不超时。所以我们首先需要允许程序可以配置超时时间：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  timeout?: number
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着在 <code v-pre>xhr</code> 函数中添加如下代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const { /*...*/ timeout } = config

if (timeout) {
  request.timeout = timeout
}

request.ontimeout = function handleTimeout() {
  reject(new Error(`Timeout of ${timeout} ms exceeded`))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="处理非-200-状态码" tabindex="-1"><a class="header-anchor" href="#处理非-200-状态码" aria-hidden="true">#</a> 处理非 200 状态码</h2>
<p>对于一个正常的请求，往往会返回 200-300 之间的 HTTP 状态码，对于不在这个区间的状态码，我们也把它们认为是一种错误的情况做处理。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>request.onreadystatechange = function handleLoad() {
  if (request.readyState !== 4) {
    return
  }

  if (request.status === 0) {
    return
  }

  const responseHeaders = parseHeaders(request.getAllResponseHeaders())
  const responseData =
    responseType &amp;&amp; responseType !== 'text' ? request.response : request.responseText
  const response: AxiosResponse = {
    data: responseData,
    status: request.status,
    statusText: request.statusText,
    headers: responseHeaders,
    config,
    request
  }
  handleResponse(response)
}

function handleResponse(response: AxiosResponse) {
  if (response.status &gt;= 200 &amp;&amp; response.status &lt; 300) {
    resolve(response)
  } else {
    reject(new Error(`Request failed with status code ${response.status}`))
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在 <code v-pre>onreadystatechange</code> 的回调函数中，添加了对 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status" target="_blank" rel="noopener noreferrer"><code v-pre>request.status</code></a> 的判断，因为当出现网络错误或者超时错误的时候，该值都为 0。</p>
<p>接着我们在 <code v-pre>handleResponse</code> 函数中对 <code v-pre>request.status</code> 的值再次判断，如果是 <code v-pre>2xx</code> 的状态码，则认为是一个正常的请求，否则抛错。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>error</code> 目录，在 <code v-pre>error</code> 目录下创建 <code v-pre>index.html</code>:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Error example&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src=&quot;/__build__/error.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着创建 <code v-pre>app.ts</code> 作为入口文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) =&gt; {
  console.log(res)
}).catch((e) =&gt; {
  console.log(e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) =&gt; {
  console.log(res)
}).catch((e) =&gt; {
  console.log(e)
})

setTimeout(() =&gt; {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) =&gt; {
    console.log(res)
  }).catch((e) =&gt; {
    console.log(e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) =&gt; {
  console.log(res)
}).catch((e) =&gt; {
  console.log(e.message)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着在 <code v-pre>server.js</code> 添加新的接口路由：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>router.get('/error/get', function(req, res) {
  if (Math.random() &gt; 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() =&gt; {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在命令行运行 <code v-pre>npm run dev</code>，接着打开 chrome 浏览器，访问 <code v-pre>http://localhost:8080/</code> 即可访问我们的 demo 了，我们点到 <code v-pre>Error</code> 目录下，通过开发者工具的 network 部分我们可以看到不同的错误情况。</p>
<p>至此我们对各种错误都做了处理，并把它们抛给了程序应用方，让他们对错误可以做进一步的处理。但是这里我们的错误都仅仅是简单的 Error 实例，只有错误文本信息，并不包含是哪个请求、请求的配置、响应对象等其它信息。那么下一节课，我们会对错误信息做增强。</p>
</div></template>
