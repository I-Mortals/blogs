<template><div><h1 id="静态方法扩展" tabindex="-1"><a class="header-anchor" href="#静态方法扩展" aria-hidden="true">#</a> 静态方法扩展</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>官方 axios 库实现了 <code v-pre>axios.all</code>、<code v-pre>axios.spread</code> 等方法，它们的用法如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上，<code v-pre>axios.all</code> 就是 <code v-pre>Promise.all</code> 的封装，它返回的是一个 <code v-pre>Promise</code> 数组，<code v-pre>then</code> 函数的参数本应是一个参数为 <code v-pre>Promise resolves</code>（数组）的函数，在这里使用了 <code v-pre>axios.spread</code> 方法。所以 <code v-pre>axios.spread</code> 方法是接收一个函数，返回一个新的函数，新函数的结构满足 <code v-pre>then</code> 函数的参数结构。</p>
<p>个人认为 <code v-pre>axios</code> 这俩静态方法在目前看来很鸡肋，因为使用 <code v-pre>Promise</code> 一样可以完成这俩需求。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(([acct,perms]) {
    // Both requests are now complete
  }));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>Promise.all</code> 的 <code v-pre>resolve</code> 函数中，我们可以直接通过数组的解构拿到每个请求对应的响应对象。</p>
<p>但是为了保持与官网 axios API 一致，我们也在 <code v-pre>ts-axios</code> 库中实现这俩方法。</p>
<p>官方 axios 库也通过 <code v-pre>axios.Axios</code> 对外暴露了 <code v-pre>Axios</code> 类(感觉也没有啥使用场景，但为了保持一致，我们也会实现)。</p>
<p>另外对于 axios 实例，官网还提供了 <code v-pre>getUri</code> 方法在不发送请求的前提下根据传入的配置返回一个 url，如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
// https://www.baidu.com/user/12345?idClient=1&amp;idTest=2&amp;testString=thisIsATest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>首先修改类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}

export interface AxiosStatic extends AxiosInstance {
  // ...

  all&lt;T&gt;(promises: Array&lt;T | Promise&lt;T&gt;&gt;): Promise&lt;T[]&gt;

  spread&lt;T, R&gt;(callback: (...args: T[]) =&gt; R): (arr: T[]) =&gt; R

  Axios: AxiosClassStatic
}

export interface Axios {
  // ...

  getUri(config?: AxiosRequestConfig): string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们去实现这几个静态方法。</p>
<p><code v-pre>axios.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们去给 Axios 添加实例方法 <code v-pre>getUri</code>。</p>
<p><code v-pre>core/Axios.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>getUri(config?: AxiosRequestConfig): string {
  config = mergeConfig(this.defaults, config)
  return transformURL(config)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先和默认配置合并，然后再通过 <code v-pre>dispatchRequest</code> 中实现的 <code v-pre>transformURL</code> 返回一个新的 <code v-pre>url</code>。</p>
<h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

axios.all([getA(), getB()])
  .then(axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  }))


axios.all([getA(), getB()])
  .then(([resA, resB]) =&gt; {
    console.log(resA.data)
    console.log(resB.data)
  })

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们通过 <code v-pre>axios.all</code> 同时发出了 2 个请求，返回了 <code v-pre>Promise</code> 数组，，我们可以在 <code v-pre>axios.spread</code> 的参数函数中拿到结果，也可以直接在 then 函数的参数函数中拿到结果。另外，我们可以根据 <code v-pre>axios.getUri</code> 方法在不发送请求的情况下根据配置得到最终请求的 url 结果。</p>
<p>至此，<code v-pre>ts-axios</code> 就实现了官网 axios 库在浏览器端的所有需求。如果你学到了这里，先为自己鼓个掌吧，因为我们已经获得了阶段性的学习成果了。</p>
<p>目前为止，我们对于所写代码的验证都是通过 demo 的方式，但是 demo 毕竟难以覆盖所有场景和代码分支，为了保证代码的正确性，我们还需要更科学的方式。从下一章开始，我们会学习编写单元测试，通过单元测试的方式来保证我们的代码正确性。</p>
</div></template>
