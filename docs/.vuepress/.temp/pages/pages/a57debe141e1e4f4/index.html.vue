<template><div><h1 id="获取响应数据" tabindex="-1"><a class="header-anchor" href="#获取响应数据" aria-hidden="true">#</a> 获取响应数据</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>在前面的章节中，我们发送的请求都可以从网络层面接收到服务端返回的数据，但是代码层面并没有做任何关于返回数据的处理。我们希望能处理服务端响应的数据，并支持 Promise 链式调用的方式，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以拿到 <code v-pre>res</code> 对象，并且我们希望该对象包括：服务端返回的数据 <code v-pre>data</code>，HTTP 状态码<code v-pre>status</code>，状态消息 <code v-pre>statusText</code>，响应头 <code v-pre>headers</code>、请求配置对象 <code v-pre>config</code> 以及请求的 <code v-pre>XMLHttpRequest</code> 对象实例 <code v-pre>request</code>。</p>
<h2 id="定义接口类型" tabindex="-1"><a class="header-anchor" href="#定义接口类型" aria-hidden="true">#</a> 定义接口类型</h2>
<p>根据需求，我们可以定义一个 <code v-pre>AxiosResponse</code> 接口类型，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，<code v-pre>axios</code> 函数返回的是一个 <code v-pre>Promise</code> 对象，我们可以定义一个 <code v-pre>AxiosPromise</code> 接口，它继承于 <code v-pre>Promise&lt;AxiosResponse&gt;</code> 这个泛型接口：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosPromise extends Promise&lt;AxiosResponse&gt; {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的话，当 <code v-pre>axios</code> 返回的是 <code v-pre>AxiosPromise</code> 类型，那么 <code v-pre>resolve</code> 函数中的参数就是一个 <code v-pre>AxiosResponse</code> 类型。</p>
<p>对于一个 AJAX 请求的 <code v-pre>response</code>，我们是可以指定它的响应的数据类型的，通过设置 <code v-pre>XMLHttpRequest</code> 对象的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType" target="_blank" rel="noopener noreferrer"><code v-pre>responseType</code></a> 属性，于是我们可以给 <code v-pre>AxiosRequestConfig</code> 类型添加一个可选属性：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  responseType?: XMLHttpRequestResponseType
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>responseType</code> 的类型是一个 <code v-pre>XMLHttpRequestResponseType</code> 类型，它的定义是 <code v-pre>&quot;&quot; | &quot;arraybuffer&quot; | &quot;blob&quot; | &quot;document&quot; | &quot;json&quot; | &quot;text&quot;</code> 字符串字面量类型。</p>
<h2 id="实现获取响应数据逻辑" tabindex="-1"><a class="header-anchor" href="#实现获取响应数据逻辑" aria-hidden="true">#</a> 实现获取响应数据逻辑</h2>
<p>首先我们要在 <code v-pre>xhr</code> 函数添加 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange" target="_blank" rel="noopener noreferrer"><code v-pre>onreadystatechange</code></a> 事件处理函数，并且让 <code v-pre>xhr</code> 函数返回的是 <code v-pre>AxiosPromise</code> 类型。</p>
<p><code v-pre>xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) =&gt; {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType &amp;&amp; responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach((name) =&gt; {
      if (data === null &amp;&amp; name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们这里还判断了如果 <code v-pre>config</code> 中配置了 <code v-pre>responseType</code>，我们把它设置到 <code v-pre>request.responseType</code> 中。在 <code v-pre>onreadystatechange</code> 事件函数中，我们构造了 <code v-pre>AxiosResponse</code> 类型的 <code v-pre>reponse</code> 对象，并把它 <code v-pre>resolve</code> 出去。</p>
<p>修改了 <code v-pre>xhr</code> 函数，我们同样也要对应修改 <code v-pre>axios</code> 函数：</p>
<p><code v-pre>index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就实现了 <code v-pre>axios</code> 函数的 Promise 化。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>我们在 <code v-pre>examples/base/app.ts</code> 文件中添加 2 段代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) =&gt; {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) =&gt; {
  console.log(res)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们打开浏览器运行 demo，看一下结果，发现我们可以正常 log 出这个 <code v-pre>res</code> 变量，它包含 <code v-pre>AxiosResponse</code> 类型中定义的那些属性，不过我们发现 2 个小问题：第一个是 <code v-pre>headers</code> 属性是一个字符串，我们需要把它解析成对象类型；第二个是在第一个请求中，得到的数据是一个 JSON 字符串，我们也需要把它转换成对象类型。</p>
<p>那么下一小节，我们将来解决第一个问题，对于响应的 <code v-pre>header</code> 做处理。</p>
</div></template>
