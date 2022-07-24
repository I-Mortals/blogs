<template><div><h1 id="错误信息增强" tabindex="-1"><a class="header-anchor" href="#错误信息增强" aria-hidden="true">#</a> 错误信息增强</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>上一节课我们已经捕获了几类 AJAX 的错误，但是对于错误信息提供的非常有限，我们希望对外提供的信息不仅仅包含错误文本信息，还包括了请求对象配置 <code v-pre>config</code>，错误代码 <code v-pre>code</code>，<code v-pre>XMLHttpRequest</code> 对象实例 <code v-pre>request</code>以及自定义响应对象 <code v-pre>response</code>。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) =&gt; {
  console.log(res)
}).catch((e: AxiosError) =&gt; {
  console.log(e.message)
  console.log(e.request)
  console.log(e.code)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样对于应用方来说，他们就可以捕获到这些错误的详细信息，做进一步的处理。</p>
<p>那么接下来，我们就来对错误信息做增强。</p>
<h2 id="创建-axioserror-类" tabindex="-1"><a class="header-anchor" href="#创建-axioserror-类" aria-hidden="true">#</a> 创建 AxiosError 类</h2>
<p>我们先来定义 <code v-pre>AxiosError</code> 类型接口，用于外部使用。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们创建 <code v-pre>error.ts</code> 文件，然后实现 <code v-pre>AxiosError</code> 类，它是继承于 <code v-pre>Error</code> 类。</p>
<p><code v-pre>helpers/error.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>AxiosError</code> 继承于 <code v-pre>Error</code> 类，添加了一些自己的属性：<code v-pre>config</code>、<code v-pre>code</code>、<code v-pre>request</code>、<code v-pre>response</code>、<code v-pre>isAxiosError</code> 等属性。这里要注意一点，我们使用了 <code v-pre>Object.setPrototypeOf(this, AxiosError.prototype)</code>，这段代码的目的是为了解决 TypeScript 继承一些内置对象的时候的坑，<a href="https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work" target="_blank" rel="noopener noreferrer">参考</a>。</p>
<p>另外，为了方便使用，我们对外暴露了一个 <code v-pre>createError</code> 的工厂方法。</p>
<h2 id="createerror-方法应用" tabindex="-1"><a class="header-anchor" href="#createerror-方法应用" aria-hidden="true">#</a> createError 方法应用</h2>
<p>修改关于错误对象创建部分的逻辑，如下：</p>
<p><code v-pre>xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { createError } from './helpers/error'

request.onerror = function handleError() {
  reject(createError(
    'Network Error',
    config,
    null,
    request
  ))
}

request.ontimeout = function handleTimeout() {
  reject(createError(
    `Timeout of ${config.timeout} ms exceeded`,
    config,
    'ECONNABORTED',
    request
  ))
}

function handleResponse(response: AxiosResponse) {
  if (response.status &gt;= 200 &amp;&amp; response.status &lt; 300) {
    resolve(response)
  } else {
    reject(createError(
      `Request failed with status code ${response.status}`,
      config,
      null,
      request,
      response
    ))
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="导出类型定义" tabindex="-1"><a class="header-anchor" href="#导出类型定义" aria-hidden="true">#</a> 导出类型定义</h2>
<p>在 demo 中，TypeScript 并不能把 <code v-pre>e</code> 参数推断为 <code v-pre>AxiosError</code> 类型，于是我们需要手动指明类型，为了让外部应用能引入 <code v-pre>AxiosError</code> 类型，我们也需要把它们导出。</p>
<p>我们创建 <code v-pre>axios.ts</code> 文件，把之前的 <code v-pre>index.ts</code> 的代码拷贝过去，然后修改 <code v-pre>index.ts</code> 的代码。</p>
<p><code v-pre>index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from './axios'

export * from './types'

export default axios
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们在 demo 中就可以引入 <code v-pre>AxiosError</code> 类型了。</p>
<p><code v-pre>examples/error/app.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) =&gt; {
  console.log(res)
}).catch((e: AxiosError) =&gt; {
  console.log(e.message)
  console.log(e.code)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，我们关于 <code v-pre>ts-axios</code> 的异常处理逻辑就告一段落。下面的章节，我们会对 <code v-pre>ts-axios</code> 的接口做扩展，让它提供更多好用和方便的 API。</p>
</div></template>
