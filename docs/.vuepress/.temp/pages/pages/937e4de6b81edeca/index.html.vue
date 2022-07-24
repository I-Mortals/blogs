<template><div><h1 id="合并配置的设计与实现" tabindex="-1"><a class="header-anchor" href="#合并配置的设计与实现" aria-hidden="true">#</a> 合并配置的设计与实现</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>在之前的章节我们了解到，在发送请求的时候可以传入一个配置，来决定请求的不同行为。我们也希望 <code v-pre>ts-axios</code> 可以有默认配置，定义一些默认的行为。这样在发送每个请求，用户传递的配置可以和默认配置做一层合并。</p>
<p>和官网 <code v-pre>axios</code> 库保持一致，我们给 <code v-pre>axios</code> 对象添加一个 <code v-pre>defaults</code> 属性，表示默认配置，你甚至可以直接修改这些默认配置：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.defaults.headers.common['test'] = 123
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 2000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中对于 <code v-pre>headers</code> 的默认配置支持 <code v-pre>common</code> 和一些请求 <code v-pre>method</code> 字段，<code v-pre>common</code> 表示对于任何类型的请求都要添加该属性，而 <code v-pre>method</code> 表示只有该类型请求方法才会添加对应的属性。</p>
<p>在上述例子中，我们会默认为所有请求的 <code v-pre>header</code> 添加 <code v-pre>test</code> 属性，会默认为 <code v-pre>post</code> 请求的 <code v-pre>header</code> 添加 <code v-pre>Content-Type</code> 属性。</p>
<h2 id="默认配置" tabindex="-1"><a class="header-anchor" href="#默认配置" aria-hidden="true">#</a> 默认配置</h2>
<h3 id="默认配置定义" tabindex="-1"><a class="header-anchor" href="#默认配置定义" aria-hidden="true">#</a> 默认配置定义</h3>
<p>接下来，我们先实现默认配置</p>
<p><code v-pre>defaults.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method =&gt; {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method =&gt; {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了 <code v-pre>defaults</code> 常量，它包含默认请求的方法、超时时间，以及 <code v-pre>headers</code> 配置。</p>
<p>未来我们会根据新的需求添加更多的默认配置。</p>
<h3 id="添加到-axios-对象中" tabindex="-1"><a class="header-anchor" href="#添加到-axios-对象中" aria-hidden="true">#</a> 添加到 axios 对象中</h3>
<p>根据需求，我们要给 <code v-pre>axios</code> 对象添加一个 <code v-pre>defaults</code> 属性，表示默认配置：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager&lt;AxiosRequestConfig&gt;(),
      response: new InterceptorManager&lt;AxiosResponse&gt;()
    }
  }
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们给 <code v-pre>Axios</code> 类添加一个 <code v-pre>defaults</code> 成员属性，并且让 <code v-pre>Axios</code> 的构造函数接受一个 <code v-pre>initConfig</code> 对象，把 <code v-pre>initConfig</code> 赋值给 <code v-pre>this.defaults</code>。</p>
<p>接着修改 <code v-pre>createInstance</code> 方法，支持传入 <code v-pre>config</code> 对象。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  // extend(instance, Axios.prototype, context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就可以在执行 <code v-pre>createInstance</code> 创建 <code v-pre>axios</code> 对象的时候，把默认配置传入了。</p>
<h2 id="配置合并及策略" tabindex="-1"><a class="header-anchor" href="#配置合并及策略" aria-hidden="true">#</a> 配置合并及策略</h2>
<p>定义了默认配置后，我们发送每个请求的时候需要把自定义配置和默认配置做合并，它并不是简单的 2 个普通对象的合并，对于不同的字段合并，会有不同的合并策略。举个例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>config1 = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

config2 = {
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  headers: {
    test: '321'
  }
}

merged = {
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
    test: '321'
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在 <code v-pre>core/mergeConfig.ts</code> 中实现合并方法。</p>
<h3 id="合并方法" tabindex="-1"><a class="header-anchor" href="#合并方法" aria-hidden="true">#</a> 合并方法</h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>合并方法的整体思路就是对 <code v-pre>config1</code> 和 <code v-pre>config2</code> 中的属性遍历，执行 <code v-pre>mergeField</code> 方法做合并，这里 <code v-pre>config1</code> 代表默认配置，<code v-pre>config2</code> 代表自定义配置。</p>
<p>遍历过程中，我们会通过 <code v-pre>config2[key]</code> 这种索引的方式访问，所以需要给 <code v-pre>AxiosRequestConfig</code> 的接口定义添加一个字符串索引签名：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...

  [propName: string]: any
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>mergeField</code> 方法中，我们会针对不同的属性使用不同的合并策略。</p>
<h3 id="默认合并策略" tabindex="-1"><a class="header-anchor" href="#默认合并策略" aria-hidden="true">#</a> 默认合并策略</h3>
<p>这是大部分属性的合并策略，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它很简单，如果有 <code v-pre>val2</code> 则返回 <code v-pre>val2</code>，否则返回 <code v-pre>val1</code>，也就是如果自定义配置中定义了某个属性，就采用自定义的，否则就用默认配置。</p>
<h3 id="只接受自定义配置合并策略" tabindex="-1"><a class="header-anchor" href="#只接受自定义配置合并策略" aria-hidden="true">#</a> 只接受自定义配置合并策略</h3>
<p>对于一些属性如 <code v-pre>url</code>、<code v-pre>params</code>、<code v-pre>data</code>，合并策略如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key =&gt; {
  strats[key] = fromVal2Strat
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为对于 <code v-pre>url</code>、<code v-pre>params</code>、<code v-pre>data</code> 这些属性，默认配置显然是没有意义的，它们是和每个请求强相关的，所以我们只从自定义配置中获取。</p>
<h3 id="复杂对象合并策略" tabindex="-1"><a class="header-anchor" href="#复杂对象合并策略" aria-hidden="true">#</a> 复杂对象合并策略</h3>
<p>对于一些属性如 <code v-pre>headers</code>，合并策略如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key =&gt; {
  strats[key] = deepMergeStrat
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>helpers/util.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj =&gt; {
    if (obj) {
      Object.keys(obj).forEach(key =&gt; {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code v-pre>headers</code> 这类的复杂对象属性，我们需要使用深拷贝的方式，同时也处理了其它一些情况，因为它们也可能是一个非对象的普通值。未来我们讲到认证授权的时候，<code v-pre>auth</code> 属性也是这个合并策略。</p>
<p>最后我们在 <code v-pre>request</code> 方法里添加合并配置的逻辑：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>config = mergeConfig(this.defaults, config)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="flatten-headers" tabindex="-1"><a class="header-anchor" href="#flatten-headers" aria-hidden="true">#</a> flatten headers</h2>
<p>经过合并后的配置中的 <code v-pre>headers</code> 是一个复杂对象，多了 <code v-pre>common</code>、<code v-pre>post</code>、<code v-pre>get</code> 等属性，而这些属性中的值才是我们要真正添加到请求 <code v-pre>header</code> 中的。</p>
<p>举个例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>headers: {
  common: {
    Accept: 'application/json, text/plain, */*'
  },
  post: {
    'Content-Type':'application/x-www-form-urlencoded'
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要把它压成一级的，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>headers: {
  Accept: 'application/json, text/plain, */*',
 'Content-Type':'application/x-www-form-urlencoded'
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里要注意的是，对于 <code v-pre>common</code> 中定义的 <code v-pre>header</code> 字段，我们都要提取，而对于 <code v-pre>post</code>、<code v-pre>get</code> 这类提取，需要和该次请求的方法对应。</p>
<p>接下来我们实现 <code v-pre>flattenHeaders</code> 方法。</p>
<p><code v-pre>helpers/header.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method =&gt; {
    delete headers[method]
  })

  return headers
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过 <code v-pre>deepMerge</code> 的方式把 <code v-pre>common</code>、<code v-pre>post</code> 的属性拷贝到 <code v-pre>headers</code> 这一级，然后再把 <code v-pre>common</code>、<code v-pre>post</code> 这些属性删掉。</p>
<p>然后我们在真正发送请求前执行这个逻辑。</p>
<p><code v-pre>core/dispatchRequest.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样确保我们了配置中的 <code v-pre>headers</code> 是可以正确添加到请求 <code v-pre>header</code> 中的</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<p>在 <code v-pre>examples</code> 目录下创建 <code v-pre>config</code> 目录，在 <code v-pre>config</code> 目录下创建 <code v-pre>index.html</code>:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
  &lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Config example&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src=&quot;/__build__/config.js&quot;&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着创建 <code v-pre>app.ts</code> 作为入口文件：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) =&gt; {
  console.log(res.data)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子中我们额外引入了 <code v-pre>qs</code> 库，它是一个查询字符串解析和字符串化的库。</p>
<p>比如我们的例子中对于 <code v-pre>{a:1}</code> 经过 <code v-pre>qs.stringify</code> 变成 <code v-pre>a=1</code>。</p>
<p>由于我们的例子给默认值添加了 <code v-pre>post</code> 和 <code v-pre>common</code> 的 <code v-pre>headers</code>，我们在请求前做配置合并，于是我们请求的 <code v-pre>header</code> 就添加了 <code v-pre>Content-Type</code> 字段，它的值是 <code v-pre>application/x-www-form-urlencoded</code>；另外我们也添加了 <code v-pre>test2</code> 字段，它的值是 <code v-pre>123</code>。</p>
<p>至此，我们合并配置的逻辑就实现完了。我们在前面的章节编写 <code v-pre>axios</code> 的基础功能的时候对请求数据和响应数据都做了处理，官方 <code v-pre>axios</code> 则把这俩部分逻辑也做到了默认配置中，意味这用户可以去修改这俩部分的逻辑，实现自己对请求和响应数据处理的逻辑。那么下一节我们就来实现这个 feature。</p>
</div></template>
