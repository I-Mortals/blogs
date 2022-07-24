<template><div><h1 id="取消功能的设计与实现" tabindex="-1"><a class="header-anchor" href="#取消功能的设计与实现" aria-hidden="true">#</a> 取消功能的设计与实现</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>有些场景下，我们希望能主动取消请求，比如常见的搜索框案例，在用户输入过程中，搜索框的内容也在不断变化，正常情况每次变化我们都应该向服务端发送一次请求。但是当用户输入过快的时候，我们不希望每次变化请求都发出去，通常一个解决方案是前端用 debounce 的方案，比如延时 200ms 发送请求。这样当用户连续输入的字符，只要输入间隔小于 200ms，前面输入的字符都不会发请求。</p>
<p>但是还有一种极端情况是后端接口很慢，比如超过 1s 才能响应，这个时候即使做了 200ms 的 debounce，但是在我慢慢输入（每个输入间隔超过 200ms）的情况下，在前面的请求没有响应前，也有可能发出去多个请求。因为接口的响应时长是不定的，如果先发出去的请求响应时长比后发出去的请求要久一些，后请求的响应先回来，先请求的响应后回来，就会出现前面请求响应结果覆盖后面请求响应结果的情况，那么就乱了。因此在这个场景下，我们除了做 debounce，还希望后面的请求发出去的时候，如果前面的请求还没有响应，我们可以把前面的请求取消。</p>
<p>从 axios 的取消接口设计层面，我们希望做如下的设计：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message);
  } else {
    // 处理错误
  }
});

// 取消请求 (请求原因是可选的)
source.cancel('Operation canceled by the user.');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们给 <code v-pre>axios</code> 添加一个 <code v-pre>CancelToken</code> 的对象，它有一个 <code v-pre>source</code> 方法可以返回一个 <code v-pre>source</code> 对象，<code v-pre>source.token</code> 是在每次请求的时候传给配置对象中的 <code v-pre>cancelToken</code> 属性，然后在请求发出去之后，我们可以通过 <code v-pre>source.cancel</code> 方法取消请求。</p>
<p>我们还支持另一种方式的调用：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

// 取消请求
cancel();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>axios.CancelToken</code> 是一个类，我们直接把它实例化的对象传给请求配置中的 <code v-pre>cancelToken</code> 属性，<code v-pre>CancelToken</code> 的构造函数参数支持传入一个 <code v-pre>executor</code> 方法，该方法的参数是一个取消函数 <code v-pre>c</code>，我们可以在 <code v-pre>executor</code> 方法执行的内部拿到这个取消函数 <code v-pre>c</code>，赋值给我们外部定义的 <code v-pre>cancel</code> 变量，之后我们可以通过调用这个 <code v-pre>cancel</code> 方法来取消请求。</p>
<h2 id="异步分离的设计方案" tabindex="-1"><a class="header-anchor" href="#异步分离的设计方案" aria-hidden="true">#</a> 异步分离的设计方案</h2>
<p>通过需求分析，我们知道想要实现取消某次请求，我们需要为该请求配置一个 <code v-pre>cancelToken</code>，然后在外部调用一个 <code v-pre>cancel</code> 方法。</p>
<p>请求的发送是一个异步过程，最终会执行 <code v-pre>xhr.send</code> 方法，<code v-pre>xhr</code> 对象提供了 <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort" target="_blank" rel="noopener noreferrer"><code v-pre>abort</code></a> 方法，可以把请求取消。因为我们在外部是碰不到 <code v-pre>xhr</code> 对象的，所以我们想在执行 <code v-pre>cancel</code> 的时候，去执行 <code v-pre>xhr.abort</code> 方法。</p>
<p>现在就相当于我们在 <code v-pre>xhr</code> 异步请求过程中，插入一段代码，当我们在外部执行 <code v-pre>cancel</code> 函数的时候，会驱动这段代码的执行，然后执行 <code v-pre>xhr.abort</code> 方法取消请求。</p>
<p>我们可以利用 Promise 实现异步分离，也就是在 <code v-pre>cancelToken</code> 中保存一个 <code v-pre>pending</code> 状态的 Promise 对象，然后当我们执行 <code v-pre>cancel</code> 方法的时候，能够访问到这个 Promise 对象，把它从 <code v-pre>pending</code> 状态变成 <code v-pre>resolved</code> 状态，这样我们就可以在 <code v-pre>then</code> 函数中去实现取消请求的逻辑，类似如下的代码：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>
if (cancelToken) {
  cancelToken.promise
    .then(reason =&gt; {
      request.abort()
      reject(reason)
    })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="canceltoken-类实现" tabindex="-1"><a class="header-anchor" href="#canceltoken-类实现" aria-hidden="true">#</a> CancelToken 类实现</h2>
<p>接下来，我们就来实现这个 <code v-pre>CancelToken</code> 类，先来看一下接口定义：</p>
<h3 id="接口定义" tabindex="-1"><a class="header-anchor" href="#接口定义" aria-hidden="true">#</a> 接口定义</h3>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  cancelToken?: CancelToken
}

export interface CancelToken {
  promise: Promise&lt;string&gt;
  reason?: string
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>CancelToken</code> 是实例类型的接口定义，<code v-pre>Canceler</code> 是取消方法的接口定义，<code v-pre>CancelExecutor</code> 是 <code v-pre>CancelToken</code> 类构造函数参数的接口定义。</p>
<h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3>
<p>我们单独创建 <code v-pre>cancel</code> 目录来管理取消相关的代码，在 <code v-pre>cancel</code> 目录下创建 <code v-pre>CancelToken.ts</code> 文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { CancelExecutor } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise&lt;string&gt;
  reason?: string

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise&lt;string&gt;(resolve =&gt; {
      resolvePromise = resolve
    })

    executor(message =&gt; {
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>CancelToken</code> 构造函数内部，实例化一个 <code v-pre>pending</code> 状态的 Promise 对象，然后用一个 <code v-pre>resolvePromise</code> 变量指向 <code v-pre>resolve</code> 函数。接着执行 <code v-pre>executor</code> 函数，传入一个 <code v-pre>cancel</code> 函数，在 <code v-pre>cancel</code> 函数内部，会调用 <code v-pre>resolvePromise</code> 把 Promise 对象从 <code v-pre>pending</code> 状态变为 <code v-pre>resolved</code> 状态。</p>
<p>接着我们在 <code v-pre>xhr.ts</code> 中插入一段取消请求的逻辑。</p>
<p><code v-pre>core/xhr.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const { /*....*/ cancelToken } = config

if (cancelToken) {
  cancelToken.promise.then(reason =&gt; {
    request.abort()
    reject(reason)
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就满足了第二种使用方式，接着我们要实现第一种使用方式，给 <code v-pre>CancelToken</code> 扩展静态接口。</p>
<h2 id="canceltoken-扩展静态接口" tabindex="-1"><a class="header-anchor" href="#canceltoken-扩展静态接口" aria-hidden="true">#</a> CancelToken 扩展静态接口</h2>
<h3 id="接口定义-1" tabindex="-1"><a class="header-anchor" href="#接口定义-1" aria-hidden="true">#</a> 接口定义</h3>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>CancelTokenSource</code> 作为 <code v-pre>CancelToken</code> 类静态方法 <code v-pre>source</code> 函数的返回值类型，<code v-pre>CancelTokenStatic</code> 则作为 <code v-pre>CancelToken</code> 类的类类型。</p>
<h3 id="代码实现-1" tabindex="-1"><a class="header-anchor" href="#代码实现-1" aria-hidden="true">#</a> 代码实现</h3>
<p><code v-pre>cancel/CancelToken.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default class CancelToken {
  // ...

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c =&gt; {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>source</code> 的静态方法很简单，定义一个 <code v-pre>cancel</code> 变量实例化一个 <code v-pre>CancelToken</code> 类型的对象，然后在 <code v-pre>executor</code> 函数中，把 <code v-pre>cancel</code> 指向参数 <code v-pre>c</code> 这个取消函数。</p>
<p>这样就满足了我们第一种使用方式，但是在第一种使用方式的例子中，我们在捕获请求的时候，通过 <code v-pre>axios.isCancel</code> 来判断这个错误参数 e 是不是一次取消请求导致的错误，接下来我们对取消错误的原因做一层包装，并且把给 <code v-pre>axios</code> 扩展静态方法</p>
<h2 id="cancel-类实现及-axios-的扩展" tabindex="-1"><a class="header-anchor" href="#cancel-类实现及-axios-的扩展" aria-hidden="true">#</a> Cancel 类实现及 axios 的扩展</h2>
<h3 id="接口定义-2" tabindex="-1"><a class="header-anchor" href="#接口定义-2" aria-hidden="true">#</a> 接口定义</h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) =&gt; boolean
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>Cancel</code> 是实例类型的接口定义，<code v-pre>CancelStatic</code> 是类类型的接口定义，并且我们给 <code v-pre>axios</code> 扩展了多个静态方法。</p>
<h3 id="代码实现-2" tabindex="-1"><a class="header-anchor" href="#代码实现-2" aria-hidden="true">#</a> 代码实现</h3>
<p>我在 <code v-pre>cancel</code> 目录下创建 <code v-pre>Cancel.ts</code> 文件。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Cancel</code> 类非常简单，拥有一个 <code v-pre>message</code> 的公共属性。<code v-pre>isCancel</code> 方法也非常简单，通过 <code v-pre>instanceof</code> 来判断传入的值是不是一个 <code v-pre>Cancel</code> 对象。</p>
<p>接着我们对 <code v-pre>CancelToken</code> 类中的 <code v-pre>reason</code> 类型做修改，把它变成一个 <code v-pre>Cancel</code> 类型的实例。</p>
<p>先修改定义部分。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface CancelToken {
  promise: Promise&lt;Cancel&gt;
  reason?: Cancel
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再修改实现部分：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise&lt;Cancel&gt;
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise&lt;Cancel&gt;(resolve =&gt; {
      resolvePromise = resolve
    })

    executor(message =&gt; {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们给 <code v-pre>axios</code> 扩展一些静态方法，供用户使用。</p>
<p><code v-pre>axios.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="额外逻辑实现" tabindex="-1"><a class="header-anchor" href="#额外逻辑实现" aria-hidden="true">#</a> 额外逻辑实现</h2>
<p>除此之外，我们还需要实现一些额外逻辑，比如当一个请求携带的 <code v-pre>cancelToken</code> 已经被使用过，那么我们甚至都可以不发送这个请求，只需要抛一个异常即可，并且抛异常的信息就是我们取消的原因，所以我们需要给 <code v-pre>CancelToken</code> 扩展一个方法。</p>
<p>先修改定义部分。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface CancelToken {
  promise: Promise&lt;Cancel&gt;
  reason?: Cancel

  throwIfRequested(): void
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加一个 <code v-pre>throwIfRequested</code> 方法，接下来实现它：</p>
<p><code v-pre>cancel/CancelToken.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default class CancelToken {
  // ...

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断如果存在 <code v-pre>this.reason</code>，说明这个 <code v-pre>token</code> 已经被使用过了，直接抛错。</p>
<p>接下来在发送请求前增加一段逻辑。</p>
<p><code v-pre>core/dispatchRequest.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)

  // ...
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发送请求前检查一下配置的 cancelToken 是否已经使用过了，如果已经被用过则不用法请求，直接抛异常。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>cancel</code> 目录，在 <code v-pre>cancel</code> 目录下创建 <code v-pre>index.html</code>:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Cancel example&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src=&quot;/__build__/cancel.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着创建 <code v-pre>app.ts</code> 作为入口文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() =&gt; {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c =&gt; {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() =&gt; {
  cancel()
}, 200)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的 demo 展示了 2 种使用方式，也演示了如果一个 token 已经被使用过，则再次携带该 token 的请求并不会发送。</p>
<p>至此，我们完成了 <code v-pre>ts-axios</code> 的请求取消功能，我们巧妙地利用了 Promise 实现了异步分离。目前官方 <code v-pre>axios</code> 库的一些大的 feature 我们都已经实现了，下面的章节我们就开始补充完善 <code v-pre>ts-axios</code> 的其它功能。</p>
</div></template>
