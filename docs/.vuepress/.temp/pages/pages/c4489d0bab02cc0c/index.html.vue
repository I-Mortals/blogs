<template><div><h1 id="响应数据支持泛型" tabindex="-1"><a class="header-anchor" href="#响应数据支持泛型" aria-hidden="true">#</a> 响应数据支持泛型</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>通常情况下，我们会把后端返回数据格式单独放入一个接口中：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>// 请求接口数据
export interface ResponseData&lt;T = any&gt; {
  /**
   * 状态码
   * @type { number }
   */
  code: number

  /**
   * 数据
   * @type { T }
   */
  result: T

  /**
   * 消息
   * @type { string }
   */
  message: string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以把 API 抽离成单独的模块：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { ResponseData } from './interface.ts';

export function getUser&lt;T&gt;() {
  return axios.get&lt;ResponseData&lt;T&gt;&gt;('/somepath')
    .then(res =&gt; res.data)
    .catch(err =&gt; console.error(err))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们写入返回的数据类型 <code v-pre>User</code>，这可以让 TypeScript 顺利推断出我们想要的类型：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>interface User {
  name: string
  age: number
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser&lt;User&gt;()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接口添加泛型参数" tabindex="-1"><a class="header-anchor" href="#接口添加泛型参数" aria-hidden="true">#</a> 接口添加泛型参数</h2>
<p>根据需求分析，我们需要给相关的接口定义添加泛型参数。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosResponse&lt;T = any&gt; {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise&lt;T = any&gt; extends Promise&lt;AxiosResponse&lt;T&gt;&gt; {
}

export interface Axios {
  request&lt;T = any&gt;(config: AxiosRequestConfig): AxiosPromise&lt;T&gt;

  get&lt;T = any&gt;(url: string, config?: AxiosRequestConfig): AxiosPromise&lt;T&gt;

  delete&lt;T = any&gt;(url: string, config?: AxiosRequestConfig): AxiosPromise&lt;T&gt;

  head&lt;T = any&gt;(url: string, config?: AxiosRequestConfig): AxiosPromise&lt;T&gt;

  options&lt;T = any&gt;(url: string, config?: AxiosRequestConfig): AxiosPromise&lt;T&gt;

  post&lt;T = any&gt;(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise&lt;T&gt;

  put&lt;T = any&gt;(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise&lt;T&gt;

  patch&lt;T = any&gt;(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise&lt;T&gt;
}

export interface AxiosInstance extends Axios {
  &lt;T = any&gt;(config: AxiosRequestConfig): AxiosPromise&lt;T&gt;

  &lt;T = any&gt;(url: string, config?: AxiosRequestConfig): AxiosPromise&lt;T&gt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们先给 <code v-pre>AxiosResponse</code> 接口添加了泛型参数 <code v-pre>T</code>，<code v-pre>T=any</code> 表示泛型的类型参数默认值为 <code v-pre>any</code>。</p>
<p>接着我们为 <code v-pre>AxiosPromise</code>、<code v-pre>Axios</code> 以及 <code v-pre>AxiosInstance</code> 接口都加上了泛型参数。我们可以看到这些请求的返回类型都变成了 <code v-pre>AxiosPromise&lt;T&gt;</code>，也就是 <code v-pre>Promise&lt;AxiosResponse&lt;T&gt;&gt;</code>，这样我们就可以从响应中拿到了类型 <code v-pre>T</code> 了。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p><code v-pre>examples/extend/app.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>interface ResponseData&lt;T = any&gt; {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser&lt;T&gt;() {
  return axios&lt;ResponseData&lt;T&gt;&gt;('/extend/user')
    .then(res =&gt; res.data)
    .catch(err =&gt; console.error(err))
}


async function test() {
  const user = await getUser&lt;User&gt;()
  if (user) {
    console.log(user.result.name)
  }
}

test()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们调用 <code v-pre>getUser&lt;User&gt;</code> 的时候，相当于调用了 <code v-pre>axios&lt;ResponseData&lt;User&gt;&gt;</code>，也就是我们传入给 <code v-pre>axios</code> 函数的类型 <code v-pre>T</code> 为 <code v-pre>ResponseData&lt;User&gt;</code>；相当于返回值 <code v-pre>AxiosPromise&lt;T&gt;</code> 的 <code v-pre>T</code>，实际上也是 <code v-pre>Promise&lt;AxiosResponse&lt;T&gt;&gt;</code> 中的 <code v-pre>T</code> 的类型是 <code v-pre>ResponseData&lt;User&gt;</code>，所以响应数据中的 <code v-pre>data</code> 类型就是 <code v-pre>ResponseData&lt;User&gt;</code>，也就是如下数据结构：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>{
  code: number
  result: User
  message: string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个也是 <code v-pre>const user = await getUser&lt;User&gt;()</code> 返回值 <code v-pre>user</code> 的数据类型，所以 TypeScript 能正确推断出 <code v-pre>user</code> 的类型。</p>
<p>至此，我们的 <code v-pre>ts-axios</code> 接口扩展章节就告一段落了，下一章我们来实现 <code v-pre>axios</code> 的一个非常好用的功能 —— 拦截器。</p>
</div></template>
