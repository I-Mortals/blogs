<template><div><h1 id="baseurl" tabindex="-1"><a class="header-anchor" href="#baseurl" aria-hidden="true">#</a> baseURL</h1>
<h2 id="需求分析" tabindex="-1"><a class="header-anchor" href="#需求分析" aria-hidden="true">#</a> 需求分析</h2>
<p>有些时候，我们会请求某个域名下的多个接口，我们不希望每次发送请求都填写完整的 url，希望可以配置一个 <code v-pre>baseURL</code>，之后都可以传相对路径。如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const instance = axios.create({
  baseURL: 'https://some-domain.com/api'
})

instance.get('/get')

instance.post('/post')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们一旦配置了 <code v-pre>baseURL</code>，之后请求传入的 <code v-pre>url</code> 都会和我们的 <code v-pre>baseURL</code> 拼接成完整的绝对地址，除非请求传入的 <code v-pre>url</code> 已经是绝对地址。</p>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<p>首先修改一下类型定义。</p>
<p><code v-pre>types/index.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export interface AxiosRequestConfig {
  // ...
  baseURL?: string
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来实现 2 个辅助函数。</p>
<p><code v-pre>helpers/url.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们来调用这俩个辅助函数。</p>
<p><code v-pre>core/dispatchRequest.ts</code>：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL &amp;&amp; !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="demo-编写" tabindex="-1"><a class="header-anchor" href="#demo-编写" aria-hidden="true">#</a> demo 编写</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>const instance = axios.create({
  baseURL: 'https://img.mukewang.com/'
})

instance.get('5cc01a7b0001a33718720632.jpg')

instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个 demo 非常简单，我们请求了慕课网的 2 张图片，注意当第二个请求 <code v-pre>url</code> 已经是绝对地址的时候，我们并不会再去拼接 <code v-pre>baseURL</code>。</p>
<p>至此，<code v-pre>ts-axios</code> 就实现了 <code v-pre>baseURL</code> 的配置功能，接下来我们来实现 <code v-pre>ts-axios</code> 的静态方法扩展。</p>
</div></template>
