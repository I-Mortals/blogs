<template><div><h1 id="扩展-axios-create-静态接口" tabindex="-1"><a class="header-anchor" href="#扩展-axios-create-静态接口" aria-hidden="true">#</a> 扩展 axios.create 静态接口</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。我们希望提供了一个 <code v-pre>axios.create</code> 的静态接口允许我们创建一个新的 <code v-pre>axios</code> 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。</p>
<p>举个例子：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="静态方法扩展" tabindex="-1"><a class="header-anchor" href="#静态方法扩展" aria-hidden="true">#</a> 静态方法扩展</h2>
<p>由于 <code v-pre>axios</code> 扩展了一个静态接口，因此我们先来修改接口类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosStatic extends AxiosInstance{
  create(config?: AxiosRequestConfig): AxiosInstance
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>create</code> 函数可以接受一个 <code v-pre>AxiosRequestConfig</code> 类型的配置，作为默认配置的扩展，也可以接受不传参数。</p>
<p>接着我们来实现 <code v-pre>axios.create</code> 静态方法。</p>
<p><code v-pre>axios.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内部调用了 <code v-pre>createInstance</code> 函数，并且把参数 <code v-pre>config</code> 与 <code v-pre>defaults</code> 合并，作为新的默认配置。注意这里我们需要 <code v-pre>createInstance</code> 函数的返回值类型为 <code v-pre>AxiosStatic</code>。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) =&gt; {
  console.log(res.data)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们对上节课的示例做了小小的修改，通过 <code v-pre>axios.create</code> 方法创建一个新的实例 <code v-pre>instance</code>，并传入了 <code v-pre>transformRequest</code> 和 <code v-pre>transformResponse</code> 的配置修改了默认配置，然后通过 <code v-pre>instance</code> 发送请求，效果和之前是一样的。</p>
<p>至此我们实现了 <code v-pre>axios.create</code> 静态接口的扩展，整个 <code v-pre>ts-axios</code> 的配置化也告一段落。官方 axios 库还支持了对请求取消的能力，在发送请求前以及请求发送出去未响应前都可以取消该请求。下一章我们就来实现这个 feature。</p>
</div></template>
