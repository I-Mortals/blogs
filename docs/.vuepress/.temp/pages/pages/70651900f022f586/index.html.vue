<template><div><p>拦截器设计与实现</p>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>我们希望能对请求的发送和响应做拦截，也就是在发送请求之前和接收到响应之后做一些额外逻辑。</p>
<p>我们希望设计的拦截器的使用方式如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前可以做一些事情
  return config;
}, function (error) {
  // 处理请求错误
  return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  return response;
}, function (error) {
  // 处理响应错误
  return Promise.reject(error);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>axios</code> 对象上有一个 <code v-pre>interceptors</code> 对象属性，该属性又有 <code v-pre>request</code> 和 <code v-pre>response</code> 2 个属性，它们都有一个 <code v-pre>use</code> 方法，<code v-pre>use</code> 方法支持 2 个参数，第一个参数类似 Promise 的 <code v-pre>resolve</code> 函数，第二个参数类似 Promise 的 <code v-pre>reject</code> 函数。我们可以在 <code v-pre>resolve</code> 函数和 <code v-pre>reject</code> 函数中执行同步代码或者是异步代码逻辑。</p>
<p>并且我们是可以添加多个拦截器的，拦截器的执行顺序是链式依次执行的方式。对于 <code v-pre>request</code> 拦截器，后添加的拦截器会在请求前的过程中先执行；对于 <code v-pre>response</code> 拦截器，先添加的拦截器会在响应后先执行。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.interceptors.request.use(config =&gt; {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config =&gt; {
  config.headers.test += '2'
  return config
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们也可以支持删除某个拦截器，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const myInterceptor = axios.interceptors.request.use(function () {/*...*/})
axios.interceptors.request.eject(myInterceptor)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="整体设计" tabindex="-1"><a class="header-anchor" href="#整体设计" aria-hidden="true">#</a> 整体设计</h2>
<p>我们先用一张图来展示一下拦截器工作流程：</p>
<p><img src="https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200105110744.png" alt="interceptor" title="interceptor"></p>
<p>整个过程是一个链式调用的方式，并且每个拦截器都可以支持同步和异步处理，我们自然而然地就联想到使用 Promise 链的方式来实现整个调用过程。</p>
<p>在这个 Promise 链的执行过程中，请求拦截器 <code v-pre>resolve</code> 函数处理的是 <code v-pre>config</code> 对象，而相应拦截器 <code v-pre>resolve</code> 函数处理的是 <code v-pre>response</code> 对象。</p>
<p>在了解了拦截器工作流程后，我们先要创建一个拦截器管理类，允许我们去添加
删除和遍历拦截器。</p>
<h2 id="拦截器管理类实现" tabindex="-1"><a class="header-anchor" href="#拦截器管理类实现" aria-hidden="true">#</a> 拦截器管理类实现</h2>
<p>根据需求，<code v-pre>axios</code> 拥有一个 <code v-pre>interceptors</code> 对象属性，该属性又有 <code v-pre>request</code> 和 <code v-pre>response</code> 2 个属性，它们对外提供一个 <code v-pre>use</code> 方法来添加拦截器，我们可以把这俩属性看做是一个拦截器管理对象。<code v-pre>use</code> 方法支持 2 个参数，第一个是 <code v-pre>resolve</code> 函数，第二个是 <code v-pre>reject</code> 函数，对于 <code v-pre>resolve</code> 函数的参数，请求拦截器是 <code v-pre>AxiosRequestConfig</code> 类型的，而响应拦截器是 <code v-pre>AxiosResponse</code> 类型的；而对于 <code v-pre>reject</code> 函数的参数类型则是 <code v-pre>any</code> 类型的。</p>
<p>根据上述分析，我们先来定义一下拦截器管理对象对外的接口。</p>
<h3 id="接口定义" tabindex="-1"><a class="header-anchor" href="#接口定义" aria-hidden="true">#</a> 接口定义</h3>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosInterceptorManager&lt;T&gt; {
  use(resolved: ResolvedFn&lt;T&gt;, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn&lt;T=any&gt; {
  (val: T): T | Promise&lt;T&gt;
}

export interface RejectedFn {
  (error: any): any
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们定义了 <code v-pre>AxiosInterceptorManager</code> 泛型接口，因为对于 <code v-pre>resolve</code> 函数的参数，请求拦截器和响应拦截器是不同的。</p>
<h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { ResolvedFn, RejectedFn } from '../types'

interface Interceptor&lt;T&gt; {
  resolved: ResolvedFn&lt;T&gt;
  rejected?: RejectedFn
}

export default class InterceptorManager&lt;T&gt; {
  private interceptors: Array&lt;Interceptor&lt;T&gt; | null&gt;

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn&lt;T&gt;, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor&lt;T&gt;) =&gt; void): void {
    this.interceptors.forEach(interceptor =&gt; {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了一个 <code v-pre>InterceptorManager</code> 泛型类，内部维护了一个私有属性 <code v-pre>interceptors</code>，它是一个数组，用来存储拦截器。该类还对外提供了 3 个方法，其中 <code v-pre>use</code> 接口就是添加拦截器到 <code v-pre>interceptors</code> 中，并返回一个 <code v-pre>id</code> 用于删除；<code v-pre>forEach</code> 接口就是遍历 <code v-pre>interceptors</code> 用的，它支持传入一个函数，遍历过程中会调用该函数，并把每一个 <code v-pre>interceptor</code> 作为该函数的参数传入；<code v-pre>eject</code> 就是删除一个拦截器，通过传入拦截器的 <code v-pre>id</code> 删除。</p>
<h2 id="链式调用实现" tabindex="-1"><a class="header-anchor" href="#链式调用实现" aria-hidden="true">#</a> 链式调用实现</h2>
<blockquote>
<p>本小节需要你对 Promise 掌握和理解，可以前往 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer">mdn</a> 学习。</p>
</blockquote>
<p>当我们实现好拦截器管理类，接下来就是在 <code v-pre>Axios</code> 中定义一个 <code v-pre>interceptors</code> 属性，它的类型如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>interface Interceptors {
  request: InterceptorManager&lt;AxiosRequestConfig&gt;
  response: InterceptorManager&lt;AxiosResponse&gt;
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager&lt;AxiosRequestConfig&gt;(),
      response: new InterceptorManager&lt;AxiosResponse&gt;()
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Interceptors</code> 类型拥有 2 个属性，一个请求拦截器管理类实例，一个是响应拦截器管理类实例。我们在实例化 <code v-pre>Axios</code> 类的时候，在它的构造器去初始化这个 <code v-pre>interceptors</code> 实例属性。</p>
<p>接下来，我们修改 <code v-pre>request</code> 方法的逻辑，添加拦截器链式调用的逻辑：</p>
<p><code v-pre>core/Axios.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) =&gt; AxiosPromise)
  rejected?: RejectedFn
}

request(url: any, config?: any): AxiosPromise {
  if (typeof url === 'string') {
    if (!config) {
      config = {}
    }
    config.url = url
  } else {
    config = url
  }

  const chain: PromiseChain[] = [{
    resolved: dispatchRequest,
    rejected: undefined
  }]

  this.interceptors.request.forEach(interceptor =&gt; {
    chain.unshift(interceptor)
  })

  this.interceptors.response.forEach(interceptor =&gt; {
    chain.push(interceptor)
  })

  let promise = Promise.resolve(config)

  while (chain.length) {
    const { resolved, rejected } = chain.shift()!
    promise = promise.then(resolved, rejected)
  }

  return promise
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，构造一个 <code v-pre>PromiseChain</code> 类型的数组 <code v-pre>chain</code>，并把 <code v-pre>dispatchRequest</code> 函数赋值给 <code v-pre>resolved</code> 属性；接着先遍历请求拦截器插入到 <code v-pre>chain</code> 的前面；然后再遍历响应拦截器插入到 <code v-pre>chain</code> 后面。</p>
<p>接下来定义一个已经 resolve 的 <code v-pre>promise</code>，循环这个 <code v-pre>chain</code>，拿到每个拦截器对象，把它们的 <code v-pre>resolved</code> 函数和 <code v-pre>rejected</code> 函数添加到 <code v-pre>promise.then</code> 的参数中，这样就相当于通过 Promise 的链式调用方式，实现了拦截器一层层的链式调用的效果。</p>
<p>注意我们拦截器的执行顺序，对于请求拦截器，先执行后添加的，再执行先添加的；而对于响应拦截器，先执行先添加的，后执行后添加的。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>interceptor</code> 目录，在 <code v-pre>interceptor</code> 目录下创建 <code v-pre>index.html</code>:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Interceptor example&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src=&quot;/__build__/interceptor.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着创建 <code v-pre>app.ts</code> 作为入口文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../../src/index'

axios.interceptors.request.use(config =&gt; {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config =&gt; {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config =&gt; {
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res =&gt; {
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res =&gt; {
  res.data += '2'
  return res
})
axios.interceptors.response.use(res =&gt; {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) =&gt; {
  console.log(res.data)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该 demo 我们添加了 3 个请求拦截器，添加了 3 个响应拦截器并删除了第二个。运行该 demo 我们通过浏览器访问，我们发送的请求添加了一个 <code v-pre>test</code> 的请求 header，它的值是 <code v-pre>321</code>；我们的响应数据返回的是 <code v-pre>hello</code>，经过响应拦截器的处理，最终我们输出的数据是 <code v-pre>hello13</code>。</p>
<p>至此，我们给 <code v-pre>ts-axios</code> 实现了拦截器功能，它是一个非常实用的功能，在实际工作中我们可以利用它做一些需求如登录权限认证。</p>
<p>我们目前通过 <code v-pre>axios</code> 发送请求，往往会传入一堆配置，但是我们也希望 <code v-pre>ts-axios</code> 本身也会有一些默认配置，我们把用户传入的自定义配置和默认配置做一层合并。其实，大部分的 JS 库都是类似的玩法。下面一章我们就来实现这个 feature。</p>
</div></template>
